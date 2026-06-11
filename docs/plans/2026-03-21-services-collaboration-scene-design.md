# Services Collaboration Scene Design

## Goal

Rework the services page "Work With Me" chapter so it feels like a continuous premium scene instead of stacked generic cards.

## Approved Direction

Option `C`: stronger visual treatment within the existing dark editorial brand system.

## Design Decisions

- Turn the hero into a staged collaboration scene with a continuous atmospheric container.
- Keep the left side as the narrative anchor and make the right side a real lead card.
- Give the `Start Here` card a headline, centered body copy, stronger gradient lighting, and a structured footer row.
- Add a compact protocol strip under the hero actions so the left column has secondary rhythm.
- Restyle the formal engagement section as a chapter container with a split heading and an explanatory side note.
- Increase hierarchy in the pricing cards with stronger surface treatment, refined borders, and a more prominent featured plan.
- Keep the cinematic variant visually synchronized with the main site files.

## Implementation Notes

- Files updated:
  - `apps/site/src/pages/[locale]/services.astro`
  - `apps/site/src/styles/global.css`
  - `apps/site/variants/cinematic/pages/[locale]/services.astro`
  - `apps/site/variants/cinematic/styles/global.css`
- Verified with `npm run build:site` and local screenshot review on `/zh/services/`.
