# UI Audit Fixes Design (2026-03-11)

## Goals
- Unblock occluded achievement panels and coached project walls across cinematic pages.
- Extend dwell time for the coached-project section and enable scrolling brand display.
- Add footer contact info (WeChat) from Figma-sourced copy.
- Resolve outline logo contrast without changing the logo asset.

## Non-goals
- No legacy theme changes.
- No content rewrite beyond contact details.

## Approaches
1. CSS-only quick fix: adjust z-index/overflow and add spacing. Fast, but brittle.
2. Structural stage wrapper: move sticky stage into inner wrapper per chapter + adjust scroll script. Clear boundaries, maintainable.
3. JS auto-wrapper: create wrappers at runtime. No markup edits, but higher complexity.

Recommended: Approach 2 for predictable sticky boundaries and easier maintenance.

## Design
- Pages: wrap each `data-stage` section content inside a `div[data-stage]` that carries layout classes; keep `data-chapter` on the section.
- Scroll script: treat chapters with an inner stage as stage chapters, and avoid transforming those chapter containers.
- Add `stage-extended` for the coached-project sections to increase sticky height.
- Project wall: switch to a marquee layout with duplicated tracks; remove per-card reveal to avoid transform conflicts; pause animation on hover.
- Footer: extend `siteFrameByLocale.footer` with a `contact` string; render in `SiteFooter`.
- Header logo: add a subtle logo plate and glow in CSS to improve contrast for the outline logo.

## Risks
- Marquee animation can conflict with reveal transforms. Mitigate by removing `data-reveal` from moving cards.
- Stage wrapper changes require consistent layout classes on the wrapper. Verify all pages.

## Testing
- `npm run dev:site:cinematic` and scroll home/services/insights/links to confirm visibility and dwell.
