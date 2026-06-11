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

## Design Revision: Porcelain Fade
- The white wall should not read as a hard-edged card. Its center stays solid, but the outer perimeter fades softly into the dark proof scene through warm-white transparency, bloom, and reduced border definition.
- Each marquee rail becomes a shallow inset groove inside the wall rather than a separate pill. The rail edges fade back into the slab with soft left-right and top-bottom gradients.
- Group separators should also avoid hard rules. Use feathered divider lines that disappear at both ends.
- Hover polish should come from local illumination and gentle lift, not visible borders.

## Design Revision: Atmosphere Merge
- The proof wall should stop reading as a single placed object. Instead, the entire `project-section` becomes the stage that catches soft white illumination behind the wall.
- The `.project-wall` surface itself should lose explicit frame signals such as object-like shadows and inner-rectangle definitions.
- Edge integration should be created by broad environmental bloom, not by trying to soften a card border.

## Design Revision: Scene-Level Merge
- The white treatment must expand from the wall to the full proof chapter. `scene-proof`, heading area, spacing, and wall need to live inside the same cool gray-white luminance field.
- `project-wall` should become only the brighter center lane within that chapter, not a standalone bright object.
- Rail contrast should stay low so the chapter reads as one atmosphere first and a logo showcase second.

## Design Revision: Continuous White Field
- Individual marquee rails should stop reading as rows with their own surfaces. The wall becomes one continuous white field with only grouped labels and moving logos.
- `.project-exhibit.is-marquee` should be visually transparent and exist only as an overflow/motion container.
- Preserve only subtle edge fading for the infinite-scroll splice; remove rail background, border, and inset shading.

## Risks
- Some white-on-transparent logos may lose contrast against the white slab. Mitigation: add a subtle drop shadow and keep row tracks slightly warmer than pure white.
- A large bright panel can feel flat if shadows are too weak. Mitigation: use one strong container treatment and keep per-item styling minimal.
- Theme switching can overwrite the active file if the cinematic snapshot is not updated. Mitigation: sync the variant files with the active source files in the same change.

## Testing
- Run `npm run build:site`.
- Verify the home page project wall compiles with the unified white slab.
- Verify hover still slows marquee motion instead of pausing it.
- Verify mobile sizing still keeps logos legible without reintroducing boxed white cards.
