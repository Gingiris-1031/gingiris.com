# Chinese Copy Localization Cleanup Design (2026-03-21)

## Goal
- Fix the Chinese site so visible section labels, group titles, and metadata no longer fall back to English by default.
- Keep the English site unchanged.
- Limit the work to the active production path for `apps/site` and the shared `site-content` package that feeds it.

## Problem
- Some Chinese UI labels are still hard-coded in English inside page templates.
- Some Chinese content records in `packages/site-content` still use English labels for small headings, categories, and group titles.
- The project wall currently shares one set of group titles, so Chinese pages still render English group names there.

## Options Considered

### Option 1: Fix only the page templates
- Replace the hard-coded English eyebrow labels in the page `.astro` files.

Trade-off:
- Fast, but incomplete because Chinese content data would still surface English labels in cards, categories, and project groups.

### Option 2: Fix templates and Chinese content sources
- Replace hard-coded English UI labels in page templates.
- Localize Chinese records inside `packages/site-content`.
- Add locale-aware project wall group labels.

Trade-off:
- Slightly broader change, but it fixes the actual source of the regressions and is the best match for the user's request.

### Option 3: Introduce a full shared translation dictionary for every page label
- Refactor the whole site to route all page-level copy through a larger translation layer.

Trade-off:
- Cleaner long term, but too much structural churn for a targeted cleanup pass.

## Chosen Approach
Option 2.

## Design
- Update active page templates in `apps/site/src/pages/[locale]` so Chinese eyebrow labels and small section labels render proper Chinese copy.
- Update Chinese content in:
  - `packages/site-content/src/home.ts`
  - `packages/site-content/src/services.ts`
  - `packages/site-content/src/editorial.ts`
- Update project wall data so group titles can render by locale instead of using one English label for both languages.
- Keep proper nouns such as `AFFiNE`, `GitHub`, and `Product Hunt` where they are intentional product names, but remove obvious English fallback labels from Chinese UI copy.

## Non-goals
- No rewrite of long-form article bodies.
- No redesign of layouts or components beyond the copy needed for localization.
- No change to English wording unless required by a data-structure-safe fallback.

## Implementation Plan
1. Add the approved cleanup plan to `task_plan.md`, `findings.md`, and `progress.md`.
2. Update active page templates to stop rendering English section labels on the Chinese site.
3. Update Chinese content source records to replace leftover English small labels and group titles.
4. Make project wall group titles locale-aware.
5. Run `npm run check` and `npm run build`.

## Success Criteria
- Chinese home, services, insights, links, and insight detail pages no longer show obvious default English small section labels.
- Chinese content cards and metadata no longer expose leftover English categories or group titles by default.
- English pages remain unchanged.
- Site checks and build both pass.
