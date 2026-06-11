# Single-Entry Site Integration Design

## Goal
Make local development and production feel like a single site entrypoint while preserving the existing split between:
- `apps/site` for public marketing pages
- `apps/web` for auth, checkout, member, payment, and API flows

## Context
- The current architecture intentionally split public and functional surfaces for performance and maintainability.
- The active `apps/site/src` theme already behaves mostly like a standalone marketing site, but preserved theme snapshots still generate functional links against `http://localhost:3000`.
- Local development currently exposes two visible entrypoints:
  - marketing site: `http://localhost:4321`
  - functional app: `http://localhost:3000`
- Production `nginx` still proxies all traffic to `apps/web`, so the intended public-site cutover is incomplete.

## Options Considered

### Option A: Single entrypoint with split runtimes
- Keep `Astro` as the public entry surface.
- Keep `Next.js` for functional routes.
- Route functional paths through the same origin in local dev and production.

Trade-off:
- Requires proxy plumbing in both local dev and production, but preserves the current architecture and solves the visible two-site problem with low migration risk.

### Option B: Make `Next.js` the only visible entrypoint
- Put `Next.js` in front and proxy public routes to `Astro`.

Trade-off:
- Solves the single-entry problem, but weakens the “light public site first” architecture and makes the functional app the primary boundary again.

### Option C: Merge everything into one `Next.js` app
- Remove the app split entirely.

Trade-off:
- Clean end state on paper, but this is a larger migration with much higher regression risk and unnecessary scope for the current problem.

## Chosen Approach
Option A.

## Implementation Plan
1. Update `apps/site` functional link helpers so same-origin paths are the default, while still allowing an explicit origin override if needed.
2. Add an `Astro` dev/preview proxy so local users only need to open `http://localhost:4321`, with functional paths forwarded to `apps/web`.
3. Update preserved `legacy` and `cinematic` theme snapshots so future theme switches do not reintroduce `localhost:3000` links.
4. Add a production `site` container and split `nginx` routing:
   - public routes -> `apps/site`
   - `/{locale}/auth`, `/{locale}/checkout`, `/{locale}/payment`, `/{locale}/me`, `/api`, `/_next` -> `apps/web`
5. Align local docs and defaults so externally visible base URLs refer to the single entrypoint instead of the internal `apps/web` port.

## Success Criteria
- After `npm run dev`, a user can complete normal public-to-functional navigation from `http://localhost:4321` without manually opening port `3000`.
- `apps/site` no longer falls back to `http://localhost:3000` when `PUBLIC_APP_ORIGIN` is unset.
- Switching between `legacy` and `cinematic` themes preserves single-entry behavior.
- Production `nginx` serves the public site from `apps/site` while preserving all existing functional routes through `apps/web`.
