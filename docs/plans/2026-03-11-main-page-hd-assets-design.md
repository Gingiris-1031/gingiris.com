# Main Page HD Assets (Astro)

## Goal
Upgrade the main page project-wall tiles on the Astro site to high-definition while preserving original element positions and layout.

## Scope
- In scope: `apps/site` homepage `/{locale}` project-wall tiles and their source assets under `apps/site/public/figma-assets`.
- Out of scope: Next.js app (`apps/web`), Vite showcase (`/src/App.tsx`), and unrelated images.

## Approach
1. Download a high-resolution render of the Figma node `209:75` (project wall) at scale 2x using a session cookie.
2. Re-crop tiles from the 2x render using the existing grid coordinates multiplied by the scale factor.
3. Overwrite the existing tile PNGs in `apps/site/public/figma-assets/tiles` with their 2x versions while keeping filenames unchanged.

## Scripts
- Add a downloader that:
  - accepts `file_key`, `node_id`, `scale`
  - uses `FIGMA_COOKIE` or `FIGMA_SESSION`
  - saves to `apps/site/public/figma-assets/node-209-75@2x.png`
- Extend the existing tile extractor to:
  - accept `--scale`, `--base-dir`, and `--source`
  - compute crop coordinates as `base * scale`
  - validate expected render size (`576*scale x 768*scale`)

## Validation
- Check one tile size with `sips` (expected `240x122` at 2x).
- Run `npm run dev:site` and visually confirm clarity in the project-wall carousel.

## Risks
- Figma render endpoints may reject or return an unexpected size. The script should fail fast if size mismatches.
