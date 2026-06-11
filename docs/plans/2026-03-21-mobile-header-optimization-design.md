# Mobile Header Optimization Design (2026-03-21)

## Goal
- Reduce the visual height of the floating header on phones so it stops blocking the page opening.
- Preserve the current cinematic desktop header treatment.
- Keep the public site as one clean deployable `apps/site` experience.

## Problem
- The current mobile behavior is driven by the existing responsive stack rules in `global.css`.
- At `max-width: 1120px`, the header switches to a vertical layout.
- At `max-width: 560px`, header actions are stretched to full width.
- In phone mode, that combination turns the floating header into a tall block that covers too much of the hero area.

## Options Considered

### Option 1: Compact floating bar + expandable mobile panel
- Keep the header as a floating bar.
- On mobile, show only the logo, locale switch, and menu toggle in the bar.
- Move the navigation links and contact CTA into a collapsible panel below the bar.
- Add a small scroll-based condensed state.

Trade-off:
- Best balance of visual calm, implementation scope, and launch safety.

### Option 2: Horizontal chip nav inside the header
- Keep the nav visible as scrollable chips in the bar.

Trade-off:
- Less implementation work, but still visually noisy and too tall for the hero opening.

### Option 3: Replace the header with a full-screen drawer pattern
- Reduce the bar to logo + trigger only and open a larger mobile sheet.

Trade-off:
- Cleanest mobile focus, but too large a behavior change for the current launch pass.

## Chosen Approach
Option 1.

## Design
- Desktop stays visually close to the current version.
- Mobile breakpoint is `<= 860px`.
- The mobile bar keeps only:
  - logo
  - locale switch
  - menu button
- The following move into the expandable mobile panel:
  - Home
  - Services
  - Insights
  - Links
  - contact CTA
- The mobile header gets a `data-condensed` state after a small scroll threshold so top offset, padding, and logo height tighten further.
- If the mobile menu is open, the header should prioritize usability over extra shrinking.
- Use lightweight inline client JS only:
  - `data-open`
  - `data-condensed`
  - close the panel on nav click
  - close the panel on locale switch click
  - reset open state when leaving mobile width

## Implementation Plan
1. Update `SiteHeader.astro` to add a mobile menu toggle, duplicated mobile nav links, and a lightweight inline script.
2. Update `global.css` to:
   - override the existing stacked mobile header behavior
   - style the compact bar
   - style the expandable mobile panel
   - add condensed-state transitions
3. Verify with `npm run check` and `npm run build`.

## Success Criteria
- The closed mobile header is visibly shorter and no longer dominates the hero area.
- Mobile navigation is reachable through the expandable panel.
- Locale switching remains available directly in the bar.
- Desktop header behavior remains intact.
- Site checks and production build both pass.
