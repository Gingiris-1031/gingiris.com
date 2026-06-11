# Marketing Site (`apps/site`)

## Current Role
- `apps/site` owns the public marketing routes.
- The current production content source of truth is `packages/site-content`.
- Sanity Studio is not yet wired into this Astro runtime.
- This is the only workspace currently prepared for production deployment.

## Default Workflow
- Start local development from the repo root with `npm run dev`.
- Build the shipped site from the repo root with `npm run build`.
- Validate the shipped site from the repo root with `npm run check`.

## Vercel Deployment
- Current deployment target: `Vercel`
- Vercel Project Root Directory: repository root
- Build Command: `npm run build:site`
- Output Directory: `apps/site/dist`
- Install Command: leave default
- Required environment variables: none for the current shipped site
- Deployment guide: [vercel-site-deploy.md](/Users/hw/Documents/yipei/docs/ops/vercel-site-deploy.md)

## Checks
- Run `npm run check:site` before builds when touching Astro pages, route params, or content wiring.

## Theme Switching (Legacy vs Cinematic)
This app keeps two preserved UI snapshots under:

```text
apps/site/variants/
  legacy/
  cinematic/
```

### Commands
- `npm run theme:legacy`
- `npm run theme:cinematic`
- `npm run dev:site:legacy`
- `npm run dev:site:cinematic`
- `npm run build:site:legacy`
- `npm run build:site:cinematic`

### How It Works
`scripts/switch-site-theme.mjs`:
- refreshes the snapshot for the currently active theme
- replaces `src/pages`, `src/components`, `src/layouts`, and `src/styles` from the target snapshot
- updates `apps/site/.active-theme`

### Safety Rules
- Edit the active release theme in `apps/site/src`.
- Treat switching as a guarded snapshot workflow, not the default day-to-day edit path.
- The switch script now refuses to run when `apps/site/src`, `apps/site/variants`, or `.active-theme` are dirty.
- Use `--force` only if you intentionally want to overwrite snapshot state.

### Notes
- Shared logic/data remains in `src/lib` and `packages/site-content`.
- Ensure `apps/site/variants/legacy` is populated from your legacy source before switching.
- Primary logo asset lives at `apps/site/public/brand/logo-primary.png`.
- Theme variants are preserved local design snapshots; they are not separate production deployments.
