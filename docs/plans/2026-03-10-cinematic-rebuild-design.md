# 2026-03-10 Cinematic Rebuild Design

## Goal
- Replace the current premium-card aesthetic with a full cinematic rebuild.
- Direction: Apple release-page order + luxury campaign atmosphere + female advisory brand trust.
- Preserve rollback by keeping current implementation in legacy files/components.

## Architectural Direction
- Keep current routes and data fetchers.
- Introduce a new cinematic component layer for homepage, services, and shared shell.
- Retain existing implementation in `legacy-*` files where route-level logic would otherwise be overwritten.

## Experience Principles
- Fewer blocks, larger scenes.
- Motion should feel slow, restrained, and expensive.
- Proof should be staged like an exhibition wall rather than rendered as a dense grid.
- Service presentation should read like a boutique advisory invitation, not a pricing table.

## Phase 1
- New shell with fixed cinematic navigation and progress rail feel.
- New homepage with opener, chapter rail, proof wall, method architecture, atlas, and closing invitation.
- New services page with boutique-advisory framing and proposal-style sections.

## Notes
- Current version remains rollback-safe through preserved legacy files and git history.
