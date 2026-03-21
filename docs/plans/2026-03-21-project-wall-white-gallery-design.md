# Project Wall White Gallery Design (2026-03-21)

## Goals
- Replace the per-logo white backing cards with one unified white gallery slab for the full scrolling wall.
- Keep the cinematic page contrast by letting the white wall sit inside the dark proof scene, not by turning the whole section white.
- Preserve the existing marquee motion and hover slowdown behavior while making the wall feel calmer and more premium.

## Non-goals
- No content rewrite for project groups or logo assets.
- No manual per-logo art direction or asset editing.
- No redesign of the surrounding proof-section heading or other homepage sections.

## Approaches
1. One unified white gallery slab with subtle internal rails and nearly transparent logo cells. Highest cohesion and the closest match to the approved direction.
2. One white rail per row inside the dark section. Cleaner than per-logo cards, but less sculptural and less premium.
3. A full white section including heading and outer spacing. Strong contrast, but it breaks the current cinematic chapter rhythm too aggressively.

Recommended: Approach 1.

## Design
- The `.project-wall` container becomes a single bright exhibit surface with generous padding, a soft warm-white gradient, restrained dark edge definition, and a subtle metallic highlight so it reads as one deliberate object.
- Each project group remains inside that slab. Groups are separated by light divider rules and spacing rather than separate cards.
- Each marquee row keeps infinite scrolling, but the row itself becomes a quiet off-white track. Logos sit on that track without their own white tiles.
- Individual logo items become mostly transparent alignment cells. Default state should feel weightless; hover adds only a faint lift, a soft ivory wash, and light border definition.
- The existing hover slowdown script remains in place so interaction reduces speed instead of stopping motion.
- Logo legibility is preserved with restrained drop shadows rather than hard backing plates.

## Risks
- Some white-on-transparent logos may lose contrast against the white slab. Mitigation: add a subtle drop shadow and keep row tracks slightly warmer than pure white.
- A large bright panel can feel flat if shadows are too weak. Mitigation: use one strong container treatment and keep per-item styling minimal.
- Theme switching can overwrite the active file if the cinematic snapshot is not updated. Mitigation: sync the variant files with the active source files in the same change.

## Testing
- Run `npm run build:site`.
- Verify the home page project wall compiles with the unified white slab.
- Verify hover still slows marquee motion instead of pausing it.
- Verify mobile sizing still keeps logos legible without reintroducing boxed white cards.
