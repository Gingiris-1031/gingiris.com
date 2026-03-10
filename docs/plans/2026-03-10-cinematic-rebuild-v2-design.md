# Cinematic Rebuild v2 (Site UI Upgrade) Design

Date: 2026-03-10

## Goal
Rebuild the marketing site (`apps/site`) into a premium cinematic experience that elevates brand prestige, increases service conversion intent, and deepens content reading engagement, while preserving the current routes, locale handling, and content integrations.

## User-Approved Direction
- Use the existing “Cinematic Rebuild” direction as the core aesthetic.
- Palette: deep charcoal/ink base with warm metallic accents.
- Scope: upgrade home + services + insights + links + insight detail as one unified system.
- Primary outcomes: brand perception, conversion (consult/service), reading depth.

## Success Criteria
- The first screen communicates “luxury advisory brand” within 3–5 seconds.
- Service CTAs feel more intentional and are visibly prioritized without feeling salesy.
- Editorial lists invite longer reading time via stronger hierarchy and richer previews.

## Scope
- `apps/site` only (Astro marketing site).
- Pages: `/{locale}`, `/{locale}/services`, `/{locale}/insights`, `/{locale}/insights/[slug]`, `/{locale}/links`.
- Shared shell: header, footer, page layout, and global design tokens.

## Non-Goals
- No changes to `apps/web` (account/checkout) or `apps/studio`.
- No changes to data models or content sources under `@yipei/site-content`.
- No new CMS fields or route changes.

## Visual System
### Color + Materials
- Base: deep ink/charcoal background with layered gradients.
- Accents: warm metallic gold/copper for highlights and CTA focus.
- Surfaces: frosted dark panels with thin, elegant stroke lines.
- Lighting: subtle glow and aura blooms to create cinematic depth.

### Typography
- Headings (Latn): high-contrast editorial serif (e.g., Fraunces).
- Body (Latn): refined sans (e.g., Manrope).
- ZH headings: Noto Serif SC or Source Han Serif SC.
- ZH body: Noto Sans SC or Source Han Sans SC.

### Layout + Rhythm
- 4–6 “scenes” per page, each with full-bleed mood, clear chapter title, and strong negative space.
- Wide desktop composition with controlled max-width for text to preserve readability.
- Mobile stacks scenes in single-column order with reduced ornamentation.

### Motion
- Slow, restrained reveals and hover lifts; avoid busy micro-animations.
- Respect `prefers-reduced-motion` with static fallbacks.

## Information Architecture (by Page)
### Home
1. **Opening Stage**: brand promise + role + primary CTA + hero portrait.
2. **Proof Wall**: exhibition-style showcase with larger tiles and fewer items.
3. **Method / Operating Range**: narrative chapters replacing dense grids.
4. **Service Invitation**: advisory-style service entry, not pricing table.
5. **Editorial Atlas**: content collections with visual hierarchy for depth.
6. **Closing Invitation**: final CTA with trust reinforcement.

### Services
- Proposal-style flow: positioning → delivery model → proof → plans → FAQ → CTA.

### Insights / Links
- Editorial directory with strong title hierarchy, metadata, and topic tags.
- Visual preview cards tuned for reading depth over density.

### Insight Detail
- Page hero with cinematic header, reading rail, and clear next/related paths.

## Component/System Plan
- Upgrade shared shell (`BaseLayout`, `SiteHeader`, `SiteFooter`) to cinematic styling.
- Introduce scene wrappers and shared “chapter” utilities.
- Home-specific cinematic components: `HeroStage`, `ProofExhibit`, `MethodChapters`, `ServiceInvitation`, `EditorialAtlas`, `ClosingInvitation`.
- Shared editorial list system for Insights/Links with consistent card anatomy.

## Data Flow
- Continue using `@yipei/site-content` for all text and metadata.
- No new API calls or schema changes.

## Asset Strategy
- Reuse local assets in `apps/site/public/figma-assets` first.
- Compose tiled logos into curated “exhibition” panels.
- Maintain stable aspect ratios so future assets can be swapped without layout changes.

## Accessibility + Performance
- Maintain contrast for key text and CTAs on dark backgrounds.
- Ensure focus states are visible on all interactive elements.
- Defer non-critical imagery with `loading="lazy"` and defined `sizes`.

## Verification
- `npm run build:site`
- Visual QA: desktop cinematic layout + mobile readability + CTA prominence.

## Risks / Open Questions
- Confirm final font choices and loading method (self-host vs Google Fonts).
- Identify any missing hero imagery that needs replacement or refinement.
