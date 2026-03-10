# Environment Conventions

## Environments
- `production`: live traffic
- `staging`: preview validation before prod release

## Domain Convention
- Production: `example.com`
- Staging: `staging.example.com`

## Environment Variables
- Shared keys keep same names across envs.
- Values differ by `.env.production` vs `.env.staging`.
- `APP_ENV` must be `production` or `staging`.

## Sanity Separation
- One project, two datasets:
  - `production`
  - `staging`
- Studio points to dataset by env:
  - `SANITY_STUDIO_DATASET`

## Supabase Separation
- Two projects recommended:
  - `supabase-prod`
  - `supabase-staging`
- Never mix prod/staging anon or service-role keys.

## Release Rule
1. Merge to `main` deploys staging first.
2. Staging verification passes.
3. Promote image tag to production.
