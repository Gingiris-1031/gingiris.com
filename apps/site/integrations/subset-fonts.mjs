import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

// The CJK font ships as a subset holding only the characters the built site uses.
// BaseLayout.astro declares the font at `wenKaiFontUrl`; the build swaps that URL for the
// hashed subset file. The declaration stays in the HTML because the hash changes with the
// site's text, and the stylesheet is cached under a name that would not change with it.
const wenKaiFontUrl = "/fonts/LXGWWenKai-Regular.woff2";

const sourceFont = fileURLToPath(new URL("../fonts/LXGWWenKai-Regular.ttf", import.meta.url));
const scannedExtensions = new Set([".html", ".js"]);
const alwaysIncluded = Array.from({ length: 0x7f - 0x20 }, (_, index) => String.fromCodePoint(0x20 + index)).join("");

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(entryPath) : [entryPath];
    }),
  );
  return files.flat();
};

export default function subsetFonts() {
  return {
    name: "subset-fonts",
    hooks: {
      "astro:server:setup": ({ server }) => {
        // Dev serves the full font so every character renders without a build.
        server.middlewares.use(wenKaiFontUrl, async (_request, response) => {
          const { size } = await stat(sourceFont);
          response.writeHead(200, { "Content-Type": "font/ttf", "Content-Length": size });
          createReadStream(sourceFont).pipe(response);
        });
      },
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const files = await walk(outDir);

        const characters = new Set(alwaysIncluded);
        for (const file of files) {
          if (!scannedExtensions.has(path.extname(file))) continue;
          for (const character of await readFile(file, "utf8")) characters.add(character);
        }

        const subset = await subsetFont(await readFile(sourceFont), [...characters].join(""), {
          targetFormat: "woff2",
        });
        const hash = createHash("sha256").update(subset).digest("hex").slice(0, 8);
        const subsetUrl = `/_astro/LXGWWenKai-Regular.${hash}.woff2`;
        await mkdir(path.join(outDir, "_astro"), { recursive: true });
        await writeFile(path.join(outDir, subsetUrl), subset);

        let rewritten = 0;
        for (const file of files) {
          if (path.extname(file) !== ".html") continue;
          const source = await readFile(file, "utf8");
          if (!source.includes(wenKaiFontUrl)) continue;
          await writeFile(file, source.replaceAll(wenKaiFontUrl, subsetUrl));
          rewritten += 1;
        }
        if (rewritten === 0) {
          throw new Error(`No built page references ${wenKaiFontUrl}; the CJK font would not load.`);
        }

        logger.info(
          `${subsetUrl}: ${characters.size} characters, ${(subset.length / 1024).toFixed(0)} kB, referenced by ${rewritten} pages`,
        );
      },
    },
  };
}
