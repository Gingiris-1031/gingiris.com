#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import os
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_FILE_KEY = "44iQk98v09qZnTHZcyjFtb"
DEFAULT_NODE_ID = "209:75"


def parse_figma_url(url: str) -> tuple[str | None, str | None]:
    try:
        parsed = urllib.parse.urlparse(url)
    except ValueError:
        return None, None

    segments = [segment for segment in parsed.path.split("/") if segment]
    file_key = None
    if "design" in segments:
        idx = segments.index("design")
        if idx + 1 < len(segments):
            file_key = segments[idx + 1]

    query = urllib.parse.parse_qs(parsed.query)
    node_id_raw = (query.get("node-id") or [None])[0]
    node_id = node_id_raw.replace("-", ":") if node_id_raw else None
    return file_key, node_id


def build_cookie() -> str:
    cookie = os.environ.get("FIGMA_COOKIE", "").strip()
    if cookie:
        return cookie
    session = os.environ.get("FIGMA_SESSION", "").strip()
    if session:
        return f"figma.session={session}"
    return ""


def build_request(url: str, cookie: str) -> urllib.request.Request:
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*",
    }
    if cookie:
        headers["Cookie"] = cookie
    return urllib.request.Request(url, headers=headers)


def build_ssl_context() -> ssl.SSLContext | None:
    insecure = os.environ.get("FIGMA_INSECURE", "").strip().lower()
    if insecure not in {"1", "true", "yes"}:
        return None
    return ssl._create_unverified_context()


def read_png_size(data: bytes) -> tuple[int, int] | None:
    if len(data) < 24 or not data.startswith(b"\x89PNG\r\n\x1a\n"):
        return None
    width = int.from_bytes(data[16:20], "big")
    height = int.from_bytes(data[20:24], "big")
    return width, height


def build_urls(file_key: str, node_id: str, scale: int, fmt: str) -> list[str]:
    node_colon = node_id
    node_hyphen = node_id.replace(":", "-")
    node_values = [node_colon, node_hyphen]
    node_params = ["node-id", "node_id", "ids", "id"]

    urls: list[str] = []
    for node_value in node_values:
        node_param = urllib.parse.quote(node_value, safe="")
        for key in node_params:
            urls.append(
                f"https://www.figma.com/api/render/file/{file_key}?{key}={node_param}&scale={scale}&format={fmt}"
            )
            urls.append(
                f"https://www.figma.com/api/render?file_key={file_key}&{key}={node_param}&scale={scale}&format={fmt}"
            )

    # Deduplicate while preserving order.
    deduped: list[str] = []
    for url in urls:
        if url not in deduped:
            deduped.append(url)
    return deduped


def main() -> int:
    parser = argparse.ArgumentParser(description="Download a high-res render of a Figma node.")
    parser.add_argument("--file-key", default=DEFAULT_FILE_KEY, help="Figma file key.")
    parser.add_argument("--node-id", default=DEFAULT_NODE_ID, help="Figma node id (e.g. 209:75).")
    parser.add_argument("--scale", type=int, default=2, help="Scale factor (default: 2).")
    parser.add_argument("--format", default="png", help="Render format (default: png).")
    parser.add_argument("--out", default="", help="Output path.")
    parser.add_argument("--figma-url", default="", help="Optional Figma URL to parse file key and node id.")
    parser.add_argument("--timeout", type=int, default=30, help="Request timeout seconds.")
    parser.add_argument("--expected-width", type=int, default=0, help="Expected image width in px.")
    parser.add_argument("--expected-height", type=int, default=0, help="Expected image height in px.")
    args = parser.parse_args()

    file_key = args.file_key
    node_id = args.node_id

    if args.figma_url:
        parsed_file_key, parsed_node_id = parse_figma_url(args.figma_url)
        file_key = parsed_file_key or file_key
        node_id = parsed_node_id or node_id

    if not file_key or not node_id:
        print("Missing file key or node id.", file=sys.stderr)
        return 2

    if args.scale < 1:
        print("scale must be >= 1", file=sys.stderr)
        return 2

    if args.out:
        out_path = Path(args.out).expanduser().resolve()
    else:
        suffix = f"@{args.scale}x" if args.scale > 1 else ""
        out_path = ROOT / "apps" / "site" / "public" / "figma-assets" / f"node-209-75{suffix}.png"

    expected_width = args.expected_width
    expected_height = args.expected_height
    if not expected_width and not expected_height and node_id == DEFAULT_NODE_ID:
        expected_width = 576 * args.scale
        expected_height = 768 * args.scale

    cookie = build_cookie()
    if not cookie:
        print("Missing FIGMA_COOKIE or FIGMA_SESSION.", file=sys.stderr)
        return 2

    out_path.parent.mkdir(parents=True, exist_ok=True)
    ssl_context = build_ssl_context()

    last_error = None

    # Try the official images API first (may require additional auth in some setups).
    node_candidates = [node_id, node_id.replace(":", "-")]
    for node_value in node_candidates:
        api_url = (
            "https://api.figma.com/v1/images/"
            f"{file_key}?ids={urllib.parse.quote(node_value, safe='')}&scale={args.scale}&format={args.format}"
        )
        try:
            with urllib.request.urlopen(
                build_request(api_url, cookie),
                timeout=args.timeout,
                context=ssl_context,
            ) as response:
                content_type = response.headers.get("Content-Type", "")
                if "application/json" not in content_type:
                    continue
                payload = json.loads(response.read().decode("utf-8"))
                images = payload.get("images", {})
                image_url = images.get(node_value) or images.get(node_id) or images.get(node_id.replace(":", "-"))
                if not image_url:
                    continue

                with urllib.request.urlopen(
                    build_request(image_url, cookie),
                    timeout=args.timeout,
                    context=ssl_context,
                ) as img_response:
                    content_type = img_response.headers.get("Content-Type", "")
                    body = img_response.read()
                    if not content_type.startswith("image/"):
                        continue

                    if args.format.lower() == "png":
                        size = read_png_size(body)
                        if size and expected_width and expected_height:
                            if size != (expected_width, expected_height):
                                print(
                                    f"Unexpected render size: {size[0]}x{size[1]} (expected {expected_width}x{expected_height})",
                                    file=sys.stderr,
                                )
                                return 3

                    out_path.write_bytes(body)
                    print(f"downloaded {out_path.name}")
                    return 0
        except urllib.error.HTTPError as exc:
            last_error = f"http {exc.code}"
        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)

    for url in build_urls(file_key, node_id, args.scale, args.format):
        try:
            with urllib.request.urlopen(
                build_request(url, cookie),
                timeout=args.timeout,
                context=ssl_context,
            ) as response:
                content_type = response.headers.get("Content-Type", "")
                body = response.read()
                if not content_type.startswith("image/"):
                    last_error = f"non-image response ({content_type})"
                    continue

                if args.format.lower() == "png":
                    size = read_png_size(body)
                    if size and expected_width and expected_height:
                        if size != (expected_width, expected_height):
                            print(
                                f"Unexpected render size: {size[0]}x{size[1]} (expected {expected_width}x{expected_height})",
                                file=sys.stderr,
                            )
                            return 3

                out_path.write_bytes(body)
                print(f"downloaded {out_path.name}")
                return 0
        except urllib.error.HTTPError as exc:
            last_error = f"http {exc.code}"
        except Exception as exc:  # noqa: BLE001
            last_error = str(exc)

    print(f"Failed to download render: {last_error}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
