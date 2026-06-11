# Archived: Supabase Auth + ECS Deployment

This document describes the retained `apps/web` + ECS deployment path. It is not part of the current production release target, which now ships only `apps/site` to Vercel.

## Required External Inputs
- Supabase project URL
- Supabase anon key
- Supabase service-role key
- Public site domain
- ECS host access for deployment

## Supabase Dashboard Checklist
1. Enable Email auth.
2. Enable both email login modes used by the site:
   - Magic Link
   - Email OTP
3. Add redirect URLs:
   - local: `http://localhost:4321/zh/auth/callback`
   - production: `https://<your-domain>/zh/auth/callback`
   - if English is live too: `https://<your-domain>/en/auth/callback`
4. Keep Phone auth disabled until SMS provider setup is complete.

## Environment Variables
Create `.env.production` from `.env.production.example` and fill:

```bash
NODE_ENV=production
APP_ENV=production
SITE_URL=https://<your-domain>
SITE_LOCALE_DEFAULT=zh
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
NEXT_PUBLIC_PHONE_AUTH_ENABLED=false
NEXT_PUBLIC_EMAIL_AUTH_MODE=magic-link
SANITY_PROJECT_ID=<sanity-project-id>
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_STUDIO_PROJECT_ID=<sanity-project-id>
SANITY_STUDIO_DATASET=production
PAYMENT_WEBHOOK_SECRET=<payment-webhook-secret>
LOG_LEVEL=info
```

## Preflight
Run before deployment:

```bash
npm run build --workspace @yipei/web
npm run typecheck --workspace @yipei/web
npm run lint --workspace @yipei/web
```

## ECS Deployment
The repo is configured for `Docker Compose + Nginx` on ECS.

On the ECS host:

```bash
cd /path/to/yipei
cp .env.production.example .env.production
# fill real values
./infrastructure/scripts/validate-production-env.sh .env.production
docker compose -f infrastructure/docker/docker-compose.ecs.yml --env-file .env.production config >/dev/null
docker compose -f infrastructure/docker/docker-compose.ecs.yml --env-file .env.production build
docker compose -f infrastructure/docker/docker-compose.ecs.yml --env-file .env.production up -d --remove-orphans
```

Or use the helper:

```bash
./infrastructure/scripts/deploy-ecs.sh
```

## Post-Deploy Checks
1. Open `https://<your-domain>/zh/auth`
2. Send a Magic Link email
3. Verify callback returns to `/zh/me`
4. Verify Email OTP flow succeeds
5. Verify `/studio/` remains protected by basic auth
6. Verify `https://<your-domain>/api/health` returns `status: ok`

## Current Launch Behavior
- Phone login UI is visible but disabled.
- Email login is live.
- `SITE_URL` should always point at the public single entrypoint, not the internal `apps/web` container port.
- To enable phone login later:
  - configure Supabase Phone Auth and SMS provider
  - set `NEXT_PUBLIC_PHONE_AUTH_ENABLED=true`
