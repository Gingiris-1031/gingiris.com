# Yipei Website Monorepo (M0 -> M2)

This repository now uses a workspace monorepo architecture for a maintainable, production-oriented personal website.

## Stack
- Web: `Next.js App Router` (`apps/web`)
- CMS: `Sanity Studio` (`apps/studio`)
- Auth/Data: `Supabase` (`apps/web/src/lib/supabase`)
- Deployment target: `Alibaba Cloud ECS` with `Docker Compose + Nginx`

## Workspace Commands
- Run web: `npm run dev:web`
- Run studio: `npm run dev:studio`
- Run both: `npm run dev`
- Build web: `npm run build:web`
- Project checks: `npm run check`

## Local Figma Asset Utilities
- Crop current local showcase screenshot into logo tiles:
  - `python3 scripts/extract-figma-assets.py`
- Attempt to download raw assets from `apps/web/public/figma-assets/asset-manifest.json`:
  - `FIGMA_COOKIE='figma.session=...' python3 scripts/download-figma-manifest-assets.py`
- Notes:
  - direct MCP asset URLs can return `404` without a valid authenticated Figma session cookie
  - downloaded raw assets are written to `apps/web/public/figma-assets/raw`

## Route Skeleton (implemented in M1)
- `/{locale}`
- `/{locale}/services`
- `/{locale}/insights`
- `/{locale}/insights/[slug]`
- `/{locale}/links`
- `/{locale}/auth`
- `/{locale}/auth/callback`
- `/{locale}/me`
- `/{locale}/me/profile`
- `/{locale}/me/orders`
- `/{locale}/payment/result`

## M2 Content Foundation
- Sanity schema expanded with singleton + collection models:
  - `siteSettings`, `homePage`, `servicesPage`
  - `servicePlan`, `insightPost`, `linkItem`
- Web content layer added under `apps/web/src/modules/content`:
  - typed content models
  - GROQ queries
  - server-only fetchers with safe fallback when Sanity is not configured
- Pages connected to content reads:
  - `/{locale}`
  - `/{locale}/services`
  - `/{locale}/insights`
  - `/{locale}/insights/[slug]`
  - `/{locale}/links`

## Webhook Baseline
- `POST /api/webhooks/payment` now enforces:
  - signature verification
  - session-independent processing
  - idempotency key handling
  - raw payload logging/persistence entrypoint

## Locale Priority
`URL locale > persisted preference > Accept-Language > zh`

## Environment Baseline
- staging/prod conventions: `docs/ops/environments.md`
- security baseline: `docs/ops/security-baseline.md`

## Deployment Baseline
- Compose file: `infrastructure/docker/docker-compose.ecs.yml`
- Nginx config: `infrastructure/nginx/default.conf`
- Deploy script: `infrastructure/scripts/deploy-ecs.sh`
- Env validation script: `infrastructure/scripts/validate-production-env.sh`
- Supabase auth + deploy checklist: `docs/ops/supabase-auth-deploy.md`
