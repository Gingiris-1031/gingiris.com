# Header Logo Presence Design (2026-03-20)

## Goal
- Make the top-left logo read as a clear brand anchor in the active cinematic theme.
- Increase brand presence without breaking the current dark, premium header rhythm.

## Non-goals
- No logo asset redraw or recolor pass.
- No structural navigation rewrite.
- No changes to the legacy theme.

## Approaches
1. Recolor the logo to white and keep the current badge. Fast, but it risks looking generic and still leaves the mark undersized.
2. Strengthen the existing brand badge by enlarging the logo and giving it a lighter premium stage. Slightly more work, but it solves both scale and contrast while preserving the current brand colors.
3. Redesign the whole left header area into a larger lockup with extra text. Strongest change, but it adds layout risk and exceeds the current problem.

Recommended: Approach 2.

## Design
- Keep the current `SiteHeader` markup and the existing `/brand/logo-primary.png` asset.
- Increase the rendered logo size from `30px` tall to roughly `42px` on desktop, with a slightly smaller mobile fallback.
- Turn `.site-brand` into a brighter "brand badge" instead of a dim dark pill:
  - larger padding
  - warmer light background
  - clearer border and inner highlight
  - stronger but still soft shadow separation from the header shell
- Preserve the existing logo colors. Contrast should come from the badge treatment, not a forced white conversion.
- Add a restrained hover/focus treatment so the badge feels intentional but does not compete with navigation.
- Sync the cinematic snapshot after the active theme styles are updated so future theme switches preserve the adjustment.

## Risks
- A brighter badge can look pasted on if the fill is too white. Keep it warm and slightly translucent.
- Increasing brand size can crowd the header at tablet widths. Mitigate with a smaller mobile size and keep the existing stacked layout breakpoint.
- The active theme lives in `apps/site/src`, but theme switching restores from `apps/site/variants/cinematic`; both must stay aligned.

## Testing
- Run the local marketing site and inspect `/zh/` in desktop and narrow mobile widths.
- Confirm the badge is more legible and prominent without forcing the header to overflow or wrap awkwardly.
