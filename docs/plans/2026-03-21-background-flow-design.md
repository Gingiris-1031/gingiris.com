# Background Flow Design (2026-03-21)

## Goals
- Add clearly perceptible motion to the cinematic site background without distracting from the content.
- Keep the current dark, premium atmosphere and existing color palette.
- Limit the change to low-risk CSS so layout, scroll narrative, and page structure stay untouched.

## Non-goals
- No new JavaScript or scroll-linked background behavior.
- No new background markup layers.
- No stronger visual treatment that competes with hero imagery or project cards.

## Approaches
1. Subtle CSS aura drift on the existing background layers. Lowest risk, keeps the current look, and adds the requested breathing motion with minimal moving parts.
2. Animate the full `html` gradient background. Simpler in code, but it makes the whole page feel like a moving backdrop rather than a premium atmospheric space.
3. Add scroll-linked parallax. Most expressive, but heavier than the requested scope and more likely to interfere with the current cinematic pacing.

Recommended: Approach 1.

## Design
- Reuse the existing fixed background layers:
  - `.page-shell::before`
  - `.page-aura-left`
  - `.page-aura-right`
- Give the shell glow a visible "breathing" animation using `translate3d`, `scale`, and `opacity` shifts that read even at a glance.
- Give the left and right aura blobs separate drift keyframes so they do not move in lockstep.
- After the first pass proved too subtle, intentionally bias the second pass toward legibility:
  - shorten durations into the `18s` to `24s` range
  - increase translation into roughly the `4vw` to `7vw` range
  - pull both aura blobs further into the viewport so their travel is easier to notice
  - widen the opacity swing enough to register without becoming a hard pulse
- Add `will-change` only to these few fixed layers for smoother rendering.
- Preserve the existing reduced-motion fallback so all of these animations stop automatically for users who prefer reduced motion.

## Risks
- Too much travel or opacity swing could make the shell feel restless. Mitigate by increasing visibility through larger forms and longer easing rather than by using sharp pulses.
- Fixed blurred layers can become expensive if overused. Mitigate by animating only the existing two aura nodes and one pseudo-element.
- Theme snapshot drift can reappear if only the active stylesheet is updated. Mitigate by mirroring the change to the cinematic variant snapshot.

## Testing
- Run `npm run check:site`.
- Visually confirm the background motion is now obvious within a second or two of viewing the page, while the content still reads as the primary focus.
- Verify the content layers remain readable and the header/footer still feel stable.
