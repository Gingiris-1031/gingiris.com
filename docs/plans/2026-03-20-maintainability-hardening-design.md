# Maintainability Hardening Design

## Goal
Reduce immediate maintenance risk without colliding with the current in-progress UI work in `apps/site`.

## Context
- Public marketing pages currently live in `apps/site`.
- Functional authenticated/payment flows live in `apps/web`.
- `apps/studio` defines Sanity schemas, but this pass does not attempt to wire Studio into the live marketing site.
- The current worktree already contains large uncommitted UI edits, so this pass should avoid page/layout/style rewrites.

## Options Considered

### Option A: Full structural cleanup now
- Wire `apps/site` to Sanity immediately.
- Replace snapshot theme switching with a tokenized theme system.
- Split large CSS/layout concerns at the same time.

Trade-off:
- Best long-term result, but too risky against the current dirty worktree and too likely to conflict with in-progress page changes.

### Option B: Conservative hardening first
- Add validation coverage across all active workspaces.
- Guard theme switching so it stops on dirty state instead of silently copying trees.
- Align repo docs with the actual runtime/content setup.

Trade-off:
- Does not solve the deeper content-source split, but it immediately lowers accidental maintenance failures with minimal merge risk.

### Option C: Documentation-only pass
- Update READMEs and leave scripts/tooling untouched.

Trade-off:
- Lowest risk, but too weak to address the most likely maintenance failure mode: accidental overwrite and missing validation.

## Chosen Approach
Option B.

## Implementation Plan
1. Add check scripts for `apps/site`, `apps/web`, and `apps/studio`, then expose them from the root workspace.
2. Update `scripts/switch-site-theme.mjs` so theme switching:
   - no-ops when already on the requested theme
   - refuses to run when `apps/site/src` or `apps/site/variants` contain uncommitted changes, unless forced
   - documents that switching is a guarded local workflow rather than the default path
3. Update `README.md` and `apps/site/README.md` to reflect:
   - actual routing/runtime ownership
   - current static content source of truth
   - current limitations of Studio integration

## Success Criteria
- Root checks cover all active workspaces.
- Theme switching becomes harder to misuse accidentally.
- Project docs stop claiming runtime content plumbing that is no longer present.
