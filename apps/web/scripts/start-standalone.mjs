import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const buildRoot = path.join(appRoot, ".next");
const standaloneAppRoot = path.join(buildRoot, "standalone", "apps", "web");
const standaloneServer = path.join(standaloneAppRoot, "server.js");
const sourceStatic = path.join(buildRoot, "static");
const targetStatic = path.join(standaloneAppRoot, ".next", "static");
const sourcePublic = path.join(appRoot, "public");
const targetPublic = path.join(standaloneAppRoot, "public");

if (!existsSync(standaloneServer)) {
  throw new Error(`Standalone server entry not found at ${standaloneServer}. Run a production build first.`);
}

if (existsSync(sourceStatic)) {
  mkdirSync(targetStatic, { recursive: true });
  cpSync(sourceStatic, targetStatic, { recursive: true, force: true });
}

if (existsSync(sourcePublic)) {
  mkdirSync(targetPublic, { recursive: true });
  cpSync(sourcePublic, targetPublic, { recursive: true, force: true });
}

const child = spawn(process.execPath, [standaloneServer], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
