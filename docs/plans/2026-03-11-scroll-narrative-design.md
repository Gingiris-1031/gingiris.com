# Cinematic Scroll Narrative Upgrade Design

Date: 2026-03-11

## Goal
Upgrade the cinematic theme with chapter-based scroll storytelling across all marketing pages, emphasizing strong sticky stages, guided reveals, and premium pacing without introducing heavy dependencies.

## Scope
- Applies to `apps/site` cinematic theme only.
- Pages: `/{locale}`, `/{locale}/services`, `/{locale}/insights`, `/{locale}/links`, `/{locale}/insights/[slug]`.
- Legacy snapshot remains unchanged and switchable.

## Approach
- Mark chapters with `data-chapter`, sticky stages with `data-stage`, and reveal items with `data-reveal`.
- Lightweight client script (IntersectionObserver + requestAnimationFrame) drives transforms/opacity and sticky stage styling.
- Inline script only runs when `body.cinematic` and `prefers-reduced-motion` is not enabled.
- Stage sizes controlled via `stage-tall`, `stage-medium`, `stage-compact` classes.

## Page Mapping
- Home: 6 chapters (hero, range, proof, services preview, editorial atlas, closing).
- Services: 8 chapters (hero, account entry, pricing, flow, proof, notes, FAQ, closing).
- Insights list: hero stage + editorial grid chapter.
- Links: hero stage + resource atlas chapter.
- Insight detail: hero stage + article layout chapter.

## Verification
- Run `npm run build:site:cinematic`.
- Scroll QA on desktop + mobile to confirm sticky stage behavior and reveal pacing.
