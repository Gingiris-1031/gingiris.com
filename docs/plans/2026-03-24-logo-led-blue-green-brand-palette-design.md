# Logo-Led Blue-Green Brand Palette Design (2026-03-24)

## Goal
- Shift the marketing site toward a blue-green brand system that follows the existing logo colors.
- Keep the current premium dark-site feel while removing the warm gold direction from the active cinematic theme.
- Improve brand coherence so the logo and site UI read as one system instead of two adjacent styles.

## Non-goals
- No redraw of the logo.
- No recolor of the logo asset itself.
- No layout restructuring of the header, hero, or page sections in this phase.
- No conversion to a bright generic SaaS visual style.

## Constraints
- The logo asset stays unchanged.
- Site colors must be derived from the current logo, not from a generic blue-green palette.
- Blue and green should stay soft and misted rather than high-saturation or neon.
- Remove warm gold accents from the cinematic theme shell, header, and controls.

## Source Brand Colors
The active logo already establishes the brand language:

- Leaf green: `#C0D696`
- Wave blue: `#A8D2DE`
- Ink navy: `#11252E`
- Mist white: `#EAF4F2`

These values should anchor the site palette. Dark surfaces can extend from `#11252E` into deeper blue-black tones, but the brand hue family must remain visually tied to the logo.

## Approaches
1. Keep the dark premium site structure and replace the warm gold system with a logo-led blue-green system. Lowest risk and best brand fit.
2. Move the whole site to a bright clean blue-green corporate aesthetic. Clearer color match, but it breaks the current premium cinematic character.
3. Add a stronger tech-style cyan-green treatment with louder gradients and glow. More noticeable, but too far from the existing logo softness and too easy to cheapen.

Recommended: Approach 1.

## Design
### Palette Strategy
- Use leaf green as the brand warmth layer.
- Use wave blue as the interface order layer.
- Use ink navy for dark backgrounds, deep text, and structural contrast.
- Use mist white for the lightest header/logo support surfaces and restrained highlights.

Recommended working tokens:

- `--text`: `#EDF6F5`
- `--muted`: `#9FB5B8`
- `--muted-strong`: `#B7CBCD`
- `--accent`: `#C0D696`
- `--accent-strong`: `#A8D2DE`
- `--surface`: `rgba(16, 32, 41, 0.8)`
- `--surface-strong`: `rgba(8, 19, 26, 0.92)`
- deep page base: `#08131A`
- secondary deep surface: `#102029`

### Component Mapping
- Header shell:
  - replace the current warm dark-brown bias with ink-navy and deep-surface tones
  - borders should lean toward low-opacity wave blue
- Logo badge:
  - keep the logo untouched
  - replace the warm cream/gold pill with a cool misted glass treatment
  - use mist white and wave blue for the badge support layer so the current logo colors read naturally
- Primary button:
  - use a restrained wave-blue to leaf-green gradient
  - keep dark ink text for contrast
- Secondary controls:
  - keep deep surfaces
  - use wave-blue borders and subtle hover shifts
- Navigation underline, inline links, focus rings:
  - use wave blue as the default signal color
- Active states, selected chips, current locale, positive highlights:
  - use low-opacity leaf green
- Card borders and scene chrome:
  - default to blue-grey structure
  - allow a very light green glow only on emphasis or hover

### Background Direction
- Replace the current warm gold atmospheric glows with deep blue-black gradients.
- Left-side ambient glow can lean leaf green.
- Right-side ambient glow can lean wave blue.
- Keep all glows soft and low-opacity so the background supports the logo rather than competing with it.

## Guardrails
- Do not recolor the logo.
- Do not introduce gold, amber, orange, or purple accents into the cinematic theme.
- Do not make blue or green more saturated than the logo itself.
- Do not apply obvious gradients, strokes, or glow effects directly to the logo graphic.
- Keep the strongest blue-green expression in UI support layers, not in decorative effects.

## Risks
- If wave blue becomes too bright, the site will drift toward a generic tech product look.
- If leaf green is overused, the interface can feel less premium and more lifestyle-oriented.
- If the badge background becomes too white, the logo can look pasted on instead of integrated.
- The active theme lives in `apps/site/src`, but the cinematic snapshot in `apps/site/variants/cinematic` must stay aligned once implementation begins.

## Testing
- Run the site locally and inspect `/zh/` and `/en/` in desktop and mobile widths.
- Confirm the logo remains untouched while the surrounding site colors clearly echo the logo palette.
- Verify that header, controls, and hover states no longer carry warm gold tones.
- Check that the dark premium feel remains intact after the palette shift.

## Implementation Notes
- Prioritize token replacement first in `apps/site/src/styles/global.css`.
- Then update header badge, interactive controls, and atmospheric backgrounds.
- Mirror the same palette updates into `apps/site/variants/cinematic/styles/global.css` so theme switching does not reintroduce the old warm palette.
