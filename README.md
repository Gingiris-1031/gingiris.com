# Yipei Website Monorepo

This repository currently ships the public marketing site from `apps/site` to Vercel. The authenticated app (`apps/web`) and CMS workspace (`apps/studio`) remain in the repo for future use, but they are not part of the current production deployment path.

## Stack
- Current production target: `Astro` (`apps/site`) on `Vercel`
- Shared content source: `packages/site-content`
- Retained but not currently deployed:
  - `Next.js App Router` (`apps/web`)
  - `Sanity Studio` (`apps/studio`)

## Workspace Commands
- Default local work on the shipped site:
  - `npm run dev`
  - `npm run build`
  - `npm run check`
  - `npm run preview`
- Explicit site commands:
  - `npm run dev:site`
  - `npm run build:site`
  - `npm run check:site`
- Optional internal commands for retained workspaces:
  - `npm run dev:full`
  - `npm run dev:web`
  - `npm run dev:studio`
  - `npm run build:web`
  - `npm run build:studio`
  - `npm run check:web`
  - `npm run check:studio`

## Current Production Surface
- The Vercel deployment only serves `apps/site`.
- Current live route set:
  - `/{locale}`
  - `/{locale}/services`
  - `/{locale}/insights`
  - `/{locale}/insights/[slug]`
  - `/{locale}/links`
- `apps/web` auth/payment/member flows are retained in-repo but are not part of the current Vercel launch.

## Current Content Source Of Truth
- Public marketing copy, navigation labels, project groups, and localized page content currently live in `packages/site-content`.
- `apps/studio` contains Sanity schemas for future CMS work, but Studio is not yet the runtime content source for `apps/site`.
- Treat `packages/site-content` as the current production source of truth.

## Vercel Deployment
- Deploy guide: [vercel-site-deploy.md](/Users/hw/Documents/yipei/docs/ops/vercel-site-deploy.md)
- Vercel project deploy path: repository root
- Build Command: `npm run build:site`
- Output Directory: `apps/site/dist`
- No required runtime environment variables are currently needed for the shipped marketing site.

## Local Figma Asset Utilities
- Crop the current local showcase screenshot into logo tiles:
  - `python3 scripts/extract-figma-assets.py`
- Attempt to download raw assets from `apps/site/public/figma-assets/asset-manifest.json`:
  - `FIGMA_COOKIE='figma.session=...' python3 scripts/download-figma-manifest-assets.py`
- Notes:
  - direct MCP asset URLs can return `404` without a valid authenticated Figma session cookie
  - downloaded raw assets are written to `apps/site/public/figma-assets/raw`

## Locale Priority
`URL locale > persisted preference > Accept-Language > zh`

## Environment Baseline
- staging/prod conventions: `docs/ops/environments.md`
- current site deployment: `docs/ops/vercel-site-deploy.md`

## Archived / Future Use
- Retained app deploy notes: `docs/ops/supabase-auth-deploy.md`
- Retained infrastructure: `infrastructure/docker`, `infrastructure/nginx`, `infrastructure/scripts`
- `apps/web` and `apps/studio` are intentionally not part of the current Vercel release path
