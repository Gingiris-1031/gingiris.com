# Vercel Site-Only Cleanup Design

## Goal
Prepare the repository for a clean Vercel deployment where only `apps/site` is shipped to production.

## Context
- The repository currently contains three workspaces:
  - `apps/site` (`Astro`) for the public marketing site
  - `apps/web` (`Next.js`) for auth, checkout, payments, and member routes
  - `apps/studio` (`Sanity Studio`) for future CMS work
- Recent local work also added ECS/Nginx/Docker deployment plumbing for a multi-service topology.
- The current launch goal has changed:
  - deploy only the public marketing site
  - use Vercel
  - keep `apps/web` and `apps/studio` in the repository, but remove them from the default deployment path

## Options Considered

### Option A: Site-only Vercel deployment, retain other workspaces
- Make `apps/site` the only production deployment target.
- Keep `apps/web` and `apps/studio` in the repo for future use.
- Remove ECS-first defaults from docs and scripts.

Trade-off:
- Best match for the current launch goal with minimal regression risk.

### Option B: Hard-delete unused workspaces and infra
- Remove `apps/web`, `apps/studio`, and ECS infrastructure now.

Trade-off:
- Cleanest repository, but too destructive for future product work.

### Option C: Add Vercel docs only, keep current defaults
- Keep default scripts and docs multi-service.

Trade-off:
- Fastest change, but leaves the repo operationally misleading and harder to hand off.

## Chosen Approach
Option A.

## Implementation Plan
1. Change root defaults so `npm run dev`, `npm run build`, and `npm run check` target `apps/site`.
2. Add a dedicated Vercel deployment guide and project config for `apps/site`.
3. Rewrite primary repository docs so production clearly means `apps/site` on Vercel.
4. Downgrade ECS/Nginx/Docker/Supabase auth deployment docs to archived or future-use status.
5. Remove `apps/site`'s default “single-entry dual-runtime” deployment posture from active docs/config, since current production only ships the static marketing site.

## Success Criteria
- The default local workflow is site-only.
- The repository clearly documents `apps/site` as the current production target.
- Vercel deployment settings for `apps/site` are explicit and ready to follow.
- `apps/web` and `apps/studio` remain available in the repository without being part of the default production path.
