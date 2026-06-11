# Environment Conventions

## Environments
- `production`: live traffic for the shipped site
- `preview`: Vercel preview deployments used before promoting changes
- `staging`: optional future environment, not part of the current default deploy path

## Domain Convention
- Production: `example.com`
- Preview: Vercel preview URL or connected preview domain
- Staging: `staging.example.com` if reintroduced later

## Environment Variables
- The current `apps/site` Vercel deployment does not require runtime environment variables.
- If future work reactivates `apps/web` or `apps/studio`, keep their env keys isolated from the shipped site workflow.

## Current Deploy Surface
- Current production deploy target: `apps/site`
- Current production host class: `Vercel`
- `apps/web` and `apps/studio` are retained but not part of the default production workflow

## Release Rule
1. Merge to `main`.
2. Vercel builds a preview deployment.
3. Verify the preview deployment.
4. Promote the successful deployment to production.
