# Task Plan: Full Personal Website from Figma MCP

## Goal
Build the complete multi-page personal website from the Figma file into `/Users/hw/Documents/yipei` as a production-grade, locally editable site.

## Current Focus
Cinematic Rebuild v2 for the marketing site (`apps/site`): full UI overhaul for home + services + insights + links + insight detail with a premium cinematic visual system.

## Cinematic Rebuild v2 Plan (apps/site)
### Phase C1: Audit & Mapping
- [ ] Inventory current `apps/site` pages, shared components, and global styles.
- [ ] Map existing sections to new cinematic scene structure per design.
- [ ] Confirm asset availability and identify gaps.
- **Status:** pending

### Phase C2: Visual System + Shell
- [ ] Define new design tokens (color, typography, spacing, radii, shadows).
- [ ] Update `BaseLayout`, header, footer, and shell scaffolding.
- [ ] Add motion primitives with reduced-motion fallbacks.
- **Status:** pending

### Phase C3: Homepage Scenes
- [ ] Implement cinematic opening stage with hero portrait + CTA focus.
- [ ] Rebuild proof wall as exhibition-style layout.
- [ ] Convert stats/method into narrative chapter modules.
- [ ] Reframe services preview as invitation.
- [ ] Build editorial atlas and closing invitation.
- **Status:** pending

### Phase C4: Inner Pages (Services/Insights/Links/Detail)
- [ ] Services proposal-style flow.
- [ ] Insights + Links editorial directory system.
- [ ] Insight detail hero, reading rail, and related CTA.
- **Status:** pending

### Phase C5: QA + Verification
- [ ] Run `npm run build:site`.
- [ ] Visual QA for desktop + mobile.
- [ ] CTA emphasis and reading depth check.
- **Status:** pending

## Current Phase
Phase 3

## Phases
### Phase 1: Requirements & Discovery
- [x] Understand user intent for full-site delivery
- [x] Identify constraints and requirements
- [x] Document findings in findings.md
- **Status:** complete

### Phase 2: Planning & Structure
- [x] Define end-to-end site architecture from full Figma file map
- [x] Confirm page inventory and section ownership
- [x] Document implementation plan for all pages
- **Status:** complete

### Phase 3: Implementation
- [x] Implement M0-M1 monorepo foundation and route skeleton
- [x] Implement M2 content architecture (Sanity schemas + web content modules)
- [ ] Integrate full Figma assets/tokens into page implementations
- [x] Add interactions/responsiveness/polish
- [x] Execute approved full-site redesign across shared shell, home, and inner pages
- [x] Execute approved lightweight architecture split (`apps/site` public site + `apps/web` functional app)
- [ ] Implement Supabase fast-login production framework
- [x] Implement payment integration milestone (orders + PayJS adapter + secure result/orders views)
- **Status:** in_progress

### Phase 4: Testing & Verification
- [ ] Verify desktop + mobile parity against Figma
- [ ] Validate routing/performance/accessibility baseline
- [ ] Validate Supabase auth environment wiring and deployment handoff
- [ ] Fix any issues found
- **Status:** pending

### Phase 5: Delivery
- [ ] Review generated pages and assets
- [ ] Ensure full local run/deploy docs are complete
- [ ] Deliver final complete site summary
- **Status:** pending

## Key Questions
1. Which MCP mode is best for this user: remote Figma MCP or local desktop MCP?
2. How should generated design context map to a local runnable web app workflow?
3. How to proceed when Figma MCP tool-call quota blocks full-file extraction?

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Use official Figma MCP docs as source of truth | User asked to search online; MCP setup is fast-moving and requires current docs |
| Upgrade architecture to monorepo + Next.js App Router | Better long-term maintainability, i18n SEO, and service extension |
| Keep Sanity for content and Supabase for user/order/payment domain | Clean ownership boundary with lower coupling |
| Preserve order snapshot fields independent from CMS content | Prevents historical order mutation when CMS plan content changes |
| Separate `payment_status` and `fulfillment_status` | Avoids overloaded status semantics for paid services |
| Webhook routes must be signature-verified and session-independent | Security and idempotent payment callback handling |
| Add staging/production conventions in M0 | Reduces environment drift before CMS/Auth go live |
| Use Sanity singleton docs for `siteSettings/homePage/servicesPage` | Prevents content drift and keeps page-level config stable |
| Persist locale choice from URL segment into cookie in middleware | Implements locale priority with manual user preference |
| Webhook persistence is DB-first with in-memory idempotency fallback | Keeps callback handling safe before Supabase tables are fully migrated |
| Execute a full visual/system redesign instead of incremental page polish | User explicitly approved full rebuild direction with homepage immersion and upgraded inner pages |
| Ship auth by direct frontend Supabase integration first | Fastest production-ready path while phone auth remains feature-gated |
| Use a payment adapter layer with PayJS first | Fastest route to launch without hard-coding provider details into the app lifecycle |
| Split `paid` and `fulfilled` states in the orders domain | Payment confirmation and product delivery are different operational steps |
| Require authenticated order ownership for result/history pages | Prevents public leakage of purchase and payment records |
| Split the repo into `apps/site` (Astro public site) and `apps/web` (Next functional app) | Best balance of performance, maintainability, and migration risk for a 2 core / 2 GB server |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| Figma MCP quota exceeded while requesting file root metadata | 1 | Blocked; request user action (quota upgrade/reset or alternate access) |
| Figma MCP still limited after re-login (account seat `View`, tier `starter`) | 2 | Requires higher seat/tier account or alternate authorized path |
| Root metadata request with node `0:0` failed | 3 | Use node `0:1` entrypoint for file structure extraction |
| Sanity dev server EPERM under sandbox | 4 | Run with escalated permissions for local port binding test |
| Next.js build failed with invalid placeholder `SANITY_PROJECT_ID=replace_me` | 5 | Changed placeholder to valid format `replace-me` and guarded Sanity fetching with `isSanityConfigured` |
| `typecheck` and `next build` raced on `.next/types` when run in parallel | 6 | Re-ran `typecheck` serially after build completed |
| `next dev` and `next build` shared a corrupted `.next` state, causing false page-not-found/missing-module build failures | 7 | Stopped the dev server, moved the dirty `.next` aside, and rebuilt from a clean output directory |
| `mkdir -p` failed for `src/pages/[locale]` because zsh treated brackets as a glob | 8 | Re-ran with quoted literal directory paths |
| Astro preview failed with `listen EPERM` in sandbox | 9 | Re-ran preview with escalated port binding permissions |
| Functional app standalone server path was not at `.next/standalone/server.js` | 10 | Inspected the build output and switched to `.next/standalone/apps/web/server.js` |
| `apps/web` build failed once after route cleanup because `next/link` import became unused | 11 | Removed the dead import and re-ran build |
| Functional app standalone server returned login HTML but `_next/static` assets 404ed | 12 | Synced `.next/static` into `.next/standalone/apps/web/.next/static` and replaced `start` with a bootstrap script that performs the copy automatically before launch |

## Notes
- Keep setup reproducible with explicit shell commands.
- Confirm final commands run successfully before handoff.
- Approved redesign is documented in `docs/plans/2026-03-10-fullsite-redesign-design.md`.
- Cinematic rebuild plan is documented in `docs/plans/2026-03-10-cinematic-rebuild-design.md`.
- Current maintainability refactor established a `content module -> section components -> page orchestration` pattern for home/services; next step is CSS layer separation.
- Homepage parity is now being corrected toward the original Figma long-page structure by removing non-Figma sections and restoring the original coached-project grouping.
- Structural de-bloat is now underway: dead cinematic routes, old showcase helpers, and shell indirection are being removed before any further visual redesign.
- Approved lightweight migration is documented in `docs/plans/2026-03-10-light-architecture-migration-design.md`.
- Lightweight migration phase 1 is now in code via `apps/site` + `packages/site-content`; public route cutover is intentionally deferred until the new site is approved.
- Approved payment design is documented in `docs/plans/2026-03-10-payment-integration-design.md`.
- Payment runtime now depends on Supabase `orders` / `payment_results` tables plus PayJS env values.
- SQL bootstrap for payment tables lives in `docs/ops/supabase-payment-schema.sql`.
- Public marketing and functional payment surfaces now share the same four formal plans:
  - `session-30`
  - `session-60`
  - `growth-pack`
  - `retainer`
- The lightweight bridge between `apps/site` and `apps/web` now uses a shared session marker cookie (`iris_app_session`) to keep public CTA state and feature-app entry points aligned without turning the Astro site into a heavy authenticated app.
- Approved auth/member redesign is documented in `docs/plans/2026-03-10-auth-identity-redesign-design.md`.
- Approved project asset restoration is documented in `docs/plans/2026-03-10-project-asset-restoration-design.md`.
- Auth UI direction is now `Apple Executive Identity`:
  - identity-led sign-in
  - premium callback state
  - private-client dashboard after sign-in
- Latest polish pass keeps all functionality intact while reducing UI noise:
  - hide unavailable auth methods unless enabled
  - shorten account/checkout language
  - keep public-site bridge labels terse and product-like
  - reduce dashboard density in favor of calmer, more premium spacing
- The auth page has now been simplified further into a single-screen login surface to better match the approved Apple-like minimal direction.
- Public project imagery is now split explicitly by origin:
  - `reconstructed` screenshot-backed project tiles from original Figma node `209:75`
  - `raw` pulled project exports from node `7:556`
  - raw Iris portrait for the hero image
