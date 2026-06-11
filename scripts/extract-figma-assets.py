#!/usr/bin/env python3

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SITE_DIR = ROOT / "apps" / "site"


def expected_size(scale: int) -> tuple[int, int]:
    return (576 * scale, 768 * scale)


def resolve_paths(
    base_dir: Path,
    scale: int,
    source: Path | None,
    out_dir: Path | None,
) -> tuple[Path, Path]:
    base_public = base_dir / "public" / "figma-assets"
    if source is None:
        suffix = f"@{scale}x" if scale > 1 else ""
        source = base_public / f"node-209-75{suffix}.png"
    if out_dir is None:
        out_dir = base_public / "tiles"
    return source, out_dir


def crop_tile(image: Image.Image, x: int, y: int, w: int, h: int, name: str) -> None:
    tile = image.crop((x, y, x + w, y + h))
    tile.save(OUT_DIR / f"{name}.png")


def main() -> None:
    parser = argparse.ArgumentParser(description="Crop Figma project-wall tiles from a node render.")
    parser.add_argument(
        "--base-dir",
        default=str(DEFAULT_SITE_DIR),
        help="Base directory that contains public/figma-assets (default: apps/site).",
    )
    parser.add_argument("--source", default="", help="Source PNG path (default: node-209-75.png).")
    parser.add_argument("--out-dir", default="", help="Output tiles directory.")
    parser.add_argument("--scale", type=int, default=1, help="Render scale factor (default: 1).")
    args = parser.parse_args()

    scale = args.scale
    if scale < 1:
        raise SystemExit("scale must be >= 1")

    base_dir = Path(args.base_dir).expanduser().resolve()
    source_arg = Path(args.source).expanduser().resolve() if args.source else None
    out_arg = Path(args.out_dir).expanduser().resolve() if args.out_dir else None
    source, out_dir = resolve_paths(base_dir, scale, source_arg, out_arg)

    if not source.exists():
        raise SystemExit(f"Source screenshot not found: {source}")

    out_dir.mkdir(parents=True, exist_ok=True)

    img = Image.open(source)
    expected_w, expected_h = expected_size(scale)
    if img.width != expected_w or img.height != expected_h:
        raise SystemExit(f"Unexpected render size: {img.width}x{img.height} (expected {expected_w}x{expected_h})")

    tile_w = 120 * scale
    tile_h = 61 * scale
    col_pitch = 132 * scale
    row_pitch = 73 * scale

    # Card 1 grid start
    c1_x = 28 * scale
    c1_y = 256 * scale
    card1_names = [
        "second-me",
        "memu",
        "third-mark",
        "datastrato",
        "ten-frameworl",
        "buddle-camel",
        "acemusic",
        "acontext",
    ]

    # Card 2 grid start
    c2_x = 28 * scale
    c2_y = 483 * scale
    card2_names = [
        "bonjor",
        "sparklab",
        "wanwushi",
        "datastrato-2",
        "kusa",
        "eezycollb",
        "nomofly",
        "papergen",
    ]

    for idx, name in enumerate(card1_names):
        row = idx // 4
        col = idx % 4
        crop_tile(
            img,
            c1_x + col * col_pitch,
            c1_y + row * row_pitch,
            tile_w,
            tile_h,
            f"card1-{name}",
        )

    for idx, name in enumerate(card2_names):
        row = idx // 4
        col = idx % 4
        crop_tile(
            img,
            c2_x + col * col_pitch,
            c2_y + row * row_pitch,
            tile_w,
            tile_h,
            f"card2-{name}",
        )

    print(f"Exported tiles to: {out_dir}")


if __name__ == "__main__":
    main()
