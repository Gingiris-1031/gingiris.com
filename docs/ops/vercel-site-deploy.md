# Vercel Deployment: `apps/site`

## Current Production Target
- Deploy only `apps/site`
- Framework: `Astro`
- Output: static site

## Vercel Project Settings
- Root Directory: repository root
- Build Command: `npm run build:site`
- Output Directory: `apps/site/dist`
- Install Command: leave default

## Environment Variables
- No runtime environment variables are currently required for the shipped marketing site.

## Local Validation
Run from the repository root before deploying:

```bash
npm run check
npm run build
```

## Deploy Steps
1. Create a new Vercel project from this repository.
2. Keep the project's Root Directory at the repository root so workspace packages remain available during install.
3. Keep the build settings aligned with [vercel.json](/Users/hw/Documents/yipei/vercel.json):
   - Build Command: `npm run build:site`
   - Output Directory: `apps/site/dist`
4. Trigger a deployment from `main`.
5. Attach the production domain after the first successful build.

## Post-Deploy Checks
1. Open `/<locale>` on the production domain.
2. Verify `/zh`, `/zh/services`, `/zh/insights`, `/zh/links` render correctly.
3. Verify static assets load correctly, including brand assets and raw Figma images used by the active theme.
4. Verify locale switching works between `zh` and `en`.

## Out Of Scope For This Deployment
- `apps/web`
- `apps/studio`
- ECS / Docker / Nginx infrastructure
- Auth, payment, webhook, or member-center routes
