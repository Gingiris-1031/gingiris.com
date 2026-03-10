# Project Asset Restoration Design

## Goal
Restore the public-site imagery so the coached-project wall and Iris portrait use correct, complete visuals from the original Figma assets instead of partial crops, mixed screenshot scraps, or missing entries.

## Approved Approach
- Keep true standalone Figma exports where they already exist.
- Reconstruct missing coached-project visuals from the original Figma project-wall screenshots when no standalone export exists.
- Keep the data model explicit about asset origin so future edits can distinguish `raw` assets from `reconstructed` screenshot-backed assets.

## Canonical Project Sets
- `OpenSource Launch`: use the original node `209:75` project-wall cards for all eight visible projects.
- `Startup Coach`: use the original node `209:75` project-wall cards for all eight visible projects.
- `Product Hunt Coach`: keep the confirmed standalone raw assets already pulled from node `7:556` for named projects with proper exports (`Wegic`, `AI Editor`, `Teable`).

## Rendering Rules
- `raw` assets continue to render as normal brand visuals.
- `reconstructed` assets render from the exact Figma screenshot tiles and should stay near their native size so they do not blur from over-scaling.
- The homepage and services page must both read from the same shared project catalog.
- Iris portrait stays on the pulled raw profile photo and is not replaced by any fallback screenshot.

## Data Model Change
- Extend the public project asset type with `sourceKind`.
- Populate the catalog with the complete, corrected project list and accurate names from the Figma wall.

## Verification
- Rebuild the Astro public site.
- Confirm homepage and services HTML reference the restored project set.
- Confirm representative tile and raw assets return `200`.
