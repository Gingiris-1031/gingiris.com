# Full-Site Redesign Design

Date: 2026-03-10

## Goal
Rebuild the current site into a premium full-screen editorial experience based on the existing local Figma-derived assets, while keeping current routes, locale support, and content integrations intact.

## User-Approved Direction
- Choose a full redesign instead of incremental enhancement.
- Make the homepage immersive and brand-led.
- Make inner pages deeply upgraded as part of the same system.
- Reuse existing local image/logo assets first, then continue filling missing images later.

## Design Principles
- Full-screen composition over narrow utility layouts.
- Editorial rhythm instead of generic SaaS blocks.
- Strong interaction cues without noisy animation.
- Desktop-first spectacle with mobile-safe adaptation.
- Stable asset slots so missing images can be swapped later without layout changes.

## Information Architecture
### Home
- Hero stage with brand statement, profile image, core positioning, metrics, and primary actions.
- Social proof and project wall using existing Figma assets.
- Structured content atlas for articles, podcasts, tools, and videos.
- Paid offer preview and final conversion section.

### Services
- Proposal-style page with positioning, delivery model, proof, plan cards, FAQ, and sticky CTA.

### Insights / Links
- Shared editorial listing system with larger cards, better hierarchy, and richer presentation.

### Shared Shell
- Transparent/frosted navigation shell with stronger branding.
- Unified section spacing, typography, buttons, cards, and surface treatments.

## Visual System
- Palette: muted natural base with darker ink, warm highlights, cool accent glows, and frosted surfaces.
- Layout: edge-to-edge sections on desktop, layered cards, asymmetry, and controlled overflow.
- Typography: expressive serif headlines paired with cleaner sans body copy.
- Materials: gradients, soft glows, subtle borders, elevated panels, and image masking.

## Interaction System
- Scroll progress indicator and sticky section navigation on the homepage.
- Section reveal motion, hover elevation, image depth, and CTA transitions.
- Inner-page cards and list items should feel tactile and directional.
- Motion should degrade cleanly on mobile and preserve readability.

## Asset Strategy
- Prioritize existing local assets under `apps/web/public/figma-assets`.
- Recompose logo tiles into stronger visual modules instead of leaving them as plain grids.
- Keep placeholder-capable image slots for future Figma pulls.
- Optimize image display with stable aspect ratios and stronger framing.

## Implementation Notes
- Preserve current route structure and locale behavior.
- Reuse the current content/data modules.
- Focus implementation on:
  - `PageShell`
  - `FigmaHome`
  - shared showcase components
  - `services`, `insights`, `links` pages
  - `globals.css`

## Verification
- Lint, typecheck, and production build for `@yipei/web`.
- Visual spot check for full-screen desktop layout and responsive mobile stacking.
