#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "apps" / "site" / "public" / "figma-assets" / "asset-manifest.json"
OUT_DIR = ROOT / "apps" / "site" / "public" / "figma-assets" / "raw"


def build_request(url: str) -> urllib.request.Request:
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
    }
    cookie = os.environ.get("FIGMA_COOKIE", "").strip()
    if cookie:
        headers["Cookie"] = cookie
    return urllib.request.Request(url, headers=headers)


def build_ssl_context() -> ssl.SSLContext | None:
    insecure = os.environ.get("FIGMA_INSECURE", "").strip().lower()
    if insecure not in {"1", "true", "yes"}:
        return None
    return ssl._create_unverified_context()


def infer_extension(content_type: str | None) -> str:
    if not content_type:
        return ".bin"
    if "image/png" in content_type:
        return ".png"
    if "image/jpeg" in content_type:
        return ".jpg"
    if "image/webp" in content_type:
        return ".webp"
    if "image/svg+xml" in content_type:
        return ".svg"
    return ".bin"


def sanitize_name(name: str) -> str:
    return "".join(ch if ch.isalnum() or ch in {"-", "_"} else "-" for ch in name).strip("-") or "asset"


def main() -> int:
    if not MANIFEST.exists():
        print(f"Manifest not found: {MANIFEST}", file=sys.stderr)
        return 1

    data = json.loads(MANIFEST.read_text())
    assets = data.get("assets", [])
    if not assets:
        print("No assets found in manifest.")
        return 0

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ssl_context = build_ssl_context()

    downloaded = 0
    failed = 0

    for item in assets:
        name = sanitize_name(item["name"])
        asset_id = item["asset_id"]
        url = item["url"]
        target_base = OUT_DIR / f"{name}-{asset_id}"

        try:
            with urllib.request.urlopen(build_request(url), timeout=30, context=ssl_context) as response:
                content_type = response.headers.get("Content-Type", "")
                body = response.read()
                extension = infer_extension(content_type)
                target = target_base.with_suffix(extension)
                target.write_bytes(body)
                print(f"downloaded {target.name}")
                downloaded += 1
        except urllib.error.HTTPError as exc:
            failed += 1
            print(f"failed {asset_id} {exc.code} {url}", file=sys.stderr)
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"failed {asset_id} {exc}", file=sys.stderr)

        time.sleep(0.15)

    print(f"done downloaded={downloaded} failed={failed}")
    return 0 if failed == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
