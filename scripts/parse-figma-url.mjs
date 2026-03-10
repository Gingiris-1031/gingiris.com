#!/usr/bin/env node

const DEFAULT_URL =
  "https://www.figma.com/design/44iQk98v09qZnTHZcyjFtb/GinGirls--Copy-?node-id=209-75&t=w7T5IDtN0soUOhkQ-1";

const inputUrl = process.argv[2] ?? DEFAULT_URL;

let parsed;
try {
  parsed = new URL(inputUrl);
} catch (error) {
  console.error("Invalid URL:", inputUrl);
  process.exit(1);
}

const segments = parsed.pathname.split("/").filter(Boolean);
const designIndex = segments.findIndex((segment) => segment === "design");
const fileKey = designIndex >= 0 ? segments[designIndex + 1] : "";
const nodeIdRaw = parsed.searchParams.get("node-id") ?? "";
const nodeIdColon = nodeIdRaw.replace(/-/g, ":");

console.log("Figma URL:", inputUrl);
console.log("fileKey:", fileKey || "(not found)");
console.log("node-id (raw):", nodeIdRaw || "(not found)");
console.log("node-id (colon):", nodeIdColon || "(not found)");

if (!fileKey || !nodeIdRaw) {
  process.exitCode = 2;
}
