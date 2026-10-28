# Vercel Deployment: `apps/site`

## Current Production Target
- Deploy only `apps/site`
- Framework: `Astro`
- Output: static site

## Vercel Project Settings
- Team / Project: `gingiris-projects` / `gingiris-com`
- Root Directory: `apps/site`
- Build settings come from `apps/site/vercel.json`:
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Install Command: leave default
- The root `vercel.json` is not read while the Root Directory is `apps/site`.

## Environment Variables
- No runtime environment variables are currently required for the shipped marketing site.

## Local Validation
Run from the repository root before deploying:

```bash
npm run check
npm run build
```

## How Deploys Run
- The Vercel project is connected to this repository through the Vercel GitHub integration.
- Every push to `main` creates a production deployment for `gingiris.com`.
- Every pull request gets a preview deployment; the Vercel bot comments the preview URL on the PR.
- There is no GitHub Actions deploy workflow and no `VERCEL_TOKEN` secret to maintain.

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
