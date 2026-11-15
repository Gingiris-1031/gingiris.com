// Keeps the logo wall cheap and stable: every file in src/assets/clients must be a small,
// self-contained asset on the card's canvas. Run by `npm run check`.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../src/assets/clients/", import.meta.url));
const maxBytes = 32 * 1024;
const cardRatio = 408.23 / 150.25;
const forbidden = [
  [/<image[\s>]/, "embeds a bitmap; export it as a .webp file instead"],
  [/<text[\s>]|font-family/, "uses live text; convert it to outlines"],
  [/<style[\s>]|\sclass=/, "uses a stylesheet; inline the styles so logos cannot affect each other"],
  [/<script[\s>]|\son[a-z]+=/, "contains script"],
];

const problems = [];
for (const name of (await readdir(dir)).sort()) {
  const report = (message) => problems.push(`${name}: ${message}`);
  const extension = path.extname(name);
  if (extension !== ".svg" && extension !== ".webp") {
    report("only .svg and .webp are supported");
    continue;
  }

  const file = await readFile(path.join(dir, name));
  if (file.length > maxBytes) {
    report(`${(file.length / 1024).toFixed(1)} kB is over the ${maxBytes / 1024} kB limit`);
  }
  if (extension !== ".svg") continue;

  const svg = file.toString("utf8");
  for (const [pattern, message] of forbidden) {
    if (pattern.test(svg)) report(message);
  }
  const [, , width, height] = (svg.match(/viewBox="([^"]+)"/)?.[1] ?? "").split(/[\s,]+/).map(Number);
  if (!width || !height || Math.abs(width / height / cardRatio - 1) > 0.01) {
    report("viewBox must have the card's 408.23 : 150.25 aspect ratio");
  }
  const prefix = `c${name.match(/\d+/)?.[0]}-`;
  for (const [, id] of svg.matchAll(/\sid="([^"]+)"/g)) {
    if (!id.startsWith(prefix)) report(`id "${id}" must start with "${prefix}" because logos are inlined on one page`);
  }
}

if (problems.length > 0) {
  console.error(`Client logo check failed:\n${problems.map((problem) => `  ${problem}`).join("\n")}`);
  process.exit(1);
}
console.log("Client logos OK");
