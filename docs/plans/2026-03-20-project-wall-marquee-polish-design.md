# Project Wall Marquee Polish Design (2026-03-20)

## Goals
- Make white-background and transparent-background logos sit naturally inside the dark project wall.
- Keep the marquee interaction continuous while making hover slow the wall down noticeably.
- Preserve the existing cinematic scrolling treatment and grouped project wall structure.

## Non-goals
- No content rewrite for project groups or labels.
- No changes to the legacy theme or other page sections.
- No per-logo manual tagging or asset editing.

## Approaches
1. Hard white card backgrounds for every logo. Simple, but it breaks the dark rhythm and makes the wall look like pasted stickers.
2. Unified soft logo stage inside each dark card plus JS-driven marquee speed easing. More work, but it keeps the current look and solves both contrast and motion quality.
3. Per-logo metadata and conditional treatments. Highest control, but adds content maintenance overhead and does not satisfy the requirement for automatic handling.

Recommended: Approach 2.

## Design
- Project cards keep the dark outer shell, but gain an inner "logo stage" that uses a bright center with feathered edges. White-background logos blend into the stage, and transparent logos are normalized onto the same white base.
- The marquee keeps duplicated tracks for infinite scrolling, but motion is driven by `requestAnimationFrame` instead of pure CSS keyframes.
- Each marquee computes its track width, derives pixels-per-second speed from the existing duration token, and smoothly eases between base speed and a much slower hover speed.
- Hover and pointer exit only change the target speed. A damping step moves current speed toward that target so the motion decelerates and recovers without a hard stop.
- Reduced-motion users get a static single-track wall instead of duplicated moving content.

## Risks
- Image load timing can affect marquee width measurement. Mitigate with `ResizeObserver` and resize recalculation.
- A universal white stage can wash out white-on-transparent marks. Current assets appear mostly dark or full-color, so this is acceptable for now.
- Inline client logic in the Astro component must guard against double initialization.

## Testing
- Build the site with `npm run build:site`.
- Inspect the project wall visually in the built home page.
- Verify hover transitions show a clear slowdown with no abrupt pause.
