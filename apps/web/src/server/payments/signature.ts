import "server-only";

import crypto from "node:crypto";

export function createPayjsSignature(
  source: Record<string, string | number | null | undefined>,
  key: string,
) {
  const pairs = Object.entries(source)
    .filter(([entryKey, value]) => entryKey !== "sign" && value !== null && value !== undefined && String(value) !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([entryKey, value]) => `${entryKey}=${String(value)}`);

  return crypto.createHash("md5").update(`${pairs.join("&")}&key=${key}`, "utf8").digest("hex").toUpperCase();
}

export function verifyPayjsSignature(
  source: Record<string, string | number | null | undefined>,
  key: string,
  actualSignature: string | null | undefined,
) {
  if (!actualSignature) {
    return false;
  }

  return createPayjsSignature(source, key) === actualSignature.toUpperCase();
}
