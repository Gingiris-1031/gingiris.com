# Light Logo Editorial Redesign (2026-03-24)

## Goal
- Redesign the marketing site away from the current dark theme.
- Build a premium light-theme system led by the logo's real primary colors:
  - leaf green `#C0D696`
  - mist blue `#B0D5DF`
- Keep the logo asset unchanged while making the whole site feel like it grows out of the logo.

## Non-goals
- No logo redraw or recolor.
- No page structure rewrite in this phase.
- No generic tech-brand cyan/green treatment.
- No return to the previous warm-gold direction.

## Context
- The current site still carries a dark cinematic shell.
- The logo itself is not dark-led; it is defined by soft leaf green and soft mist blue, with black used mainly as text/outline structure.
- The user explicitly wants a non-dark website and wants the site to use the green and blue from the logo as the actual primary brand colors.

## Approved Direction
### Visual Direction
- Use a light, misted, editorial visual system.
- The page should feel premium through spacing, typography, translucency, and restrained color proportion rather than through dark backgrounds.
- The visual character should read as:
  - personal brand
  - professional service site
  - clear and premium

### Core Colors
- Brand green: `#C0D696`
- Brand blue: `#B0D5DF`
- Main page background: `#F7FAF8`
- Elevated card white: `#FCFEFD`
- Main text / structure ink: `#1E2A2D`
- Secondary text: `#6F7F84`
- Fine border: `#D9E8EA`

### Color Roles
- Green is the brand-emphasis color:
  - primary CTA
  - key highlights
  - activation chips
  - small emphasis blocks
- Blue is the structural atmosphere color:
  - section surfaces
  - navigation feedback
  - secondary buttons
  - card borders and grouping rhythm
- Neutrals must dominate overall composition to keep the site premium rather than colorful.

Recommended visual ratio:
- 70% mist white / soft neutral
- 20% blue family
- 10% green family

## Component Mapping
### Header
- Replace the dark floating shell with a mist-white translucent bar.
- Keep the logo on a very light support surface, not a heavy pill.
- Use blue-led borders and hover states in nav.
- Use green for the primary contact CTA.

### Hero
- Use a light page field rather than a dark stage.
- Preserve the portrait, but present it inside a pale blue-white frame instead of a near-black card.
- Rebuild the signal strip as light stat cards rather than a dark horizontal block.

### Buttons
- Primary button: solid or near-solid green `#C0D696`.
- Secondary button: white / mist-white fill with blue border and dark text.
- Inline links: blue-led text, not black and not green.

### Cards / Sections
- Standard content cards: `#FCFEFD` or very pale blue-white.
- Structural section surfaces: pale blue washes.
- Highlighted service cards: light blue base with selective green emphasis.
- Avoid making every card colorful.

## Guardrails
- Do not keep any dark-theme section as a default visual posture.
- Do not use black as a background color.
- Do not spread the green across large page surfaces.
- Do not increase saturation beyond the softness already present in the logo.
- Do not let blue and green compete equally in every component; blue should carry more layout area than green.

## Testing
- Verify desktop `/zh/` and narrow mobile widths.
- Confirm the logo remains untouched.
- Confirm the overall page reads as a light premium site, not a recolored dark site.
- Confirm the new palette is visibly led by `#C0D696` and `#B0D5DF`.

## Implementation Notes
- Update shared tokens first in `apps/site/src/styles/global.css`.
- Rework base scene shells, header, hero, cards, and service-page section backgrounds toward light surfaces.
- Sync the same stylesheet into `apps/site/variants/cinematic/styles/global.css` so the approved redesign survives theme switching.
