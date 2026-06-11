# Task Plan: Full Personal Website from Figma MCP

## Goal
Build the complete multi-page personal website from the Figma file into `/Users/hw/Documents/yipei` as a production-grade, locally editable site.

## Current Focus
Cinematic Rebuild v2 for the marketing site (`apps/site`): full UI overhaul for home + services + insights + links + insight detail with a premium cinematic visual system.

## Single-Entry Integration Plan (2026-03-21)
### Phase U1: Design & Scope
- [x] Confirm whether “one site” means single entrypoint or full app merge.
- [x] Choose single entrypoint with split runtimes (`Astro` public entry + proxied `Next` functional routes).
- [x] Record the design in `docs/plans/2026-03-21-single-entry-site-design.md`.
- **Status:** complete

### Phase U2: Same-Origin Links + Local Entry
- [x] Remove `localhost:3000` fallback behavior from `apps/site` link generation.
- [x] Add `Astro` local proxy coverage for functional app routes and `/_next`.
- [x] Align local-visible URL defaults with `http://localhost:4321`.
- **Status:** complete

### Phase U3: Production Routing
- [x] Add a production `site` container for `apps/site`.
- [x] Split `nginx` routing between static public pages and functional `apps/web` routes.
- [x] Update deployment-facing docs/config to reflect the single entrypoint.
- **Status:** complete

### Phase U4: Verification
- [x] Verify public routes from `http://localhost:4321`.
- [x] Verify functional routes through the same entrypoint.
- [x] Run relevant workspace checks/builds after routing changes.
- **Status:** complete

## Vercel Site-Only Cleanup Plan (2026-03-21)
### Phase V1: Design & Scope
- [x] Confirm that only `apps/site` should deploy to Vercel.
- [x] Keep `apps/web` and `apps/studio` in the repo but outside the default production path.
- [x] Record the design in `docs/plans/2026-03-21-vercel-site-only-cleanup-design.md`.
- **Status:** complete

### Phase V2: Default Workflow Cleanup
- [x] Change root scripts so default dev/build/check target `apps/site`.
- [x] Remove active site docs/config that assume multi-runtime deployment by default.
- [x] Keep explicit internal commands for `apps/web` and `apps/studio`.
- **Status:** complete

### Phase V3: Vercel Deployment Prep
- [x] Add/clarify Vercel project configuration for `apps/site`.
- [x] Add a Vercel deployment guide.
- [x] Minimize active production env examples to what `apps/site` actually needs.
- **Status:** complete

### Phase V4: Archive Old Deployment Path
- [x] Mark ECS/Nginx/Docker/Supabase deploy docs as archived or future-use.
- [x] Update root docs to stop presenting ECS as the active production target.
- **Status:** complete

### Phase V5: Verification
- [x] Verify default root scripts work for `apps/site`.
- [x] Run site-only checks/build for launch readiness.
- **Status:** complete

## Mobile Header Optimization Plan (2026-03-21)
### Phase MH1: Design & Scope
- [x] Confirm the mobile issue is the oversized floating header in phone mode.
- [x] Confirm the approved direction is the compact bar + expandable panel pattern.
- [x] Record the design in `docs/plans/2026-03-21-mobile-header-optimization-design.md`.
- **Status:** complete

### Phase MH2: Implementation + Verification
- [x] Update `SiteHeader.astro` for mobile toggle/panel behavior.
- [x] Update `global.css` so mobile keeps a compressed top bar instead of a stacked block.
- [x] Run `npm run check`.
- [x] Run `npm run build`.
- **Status:** complete

## Chinese Copy Localization Cleanup Plan (2026-03-21)
### Phase ZH1: Design & Scope
- [x] Confirm the issue is Chinese pages still exposing English fallback labels and small titles.
- [x] Choose the comprehensive fix: page templates + Chinese content source cleanup.
- [x] Record the design in `docs/plans/2026-03-21-zh-copy-localization-design.md`.
- **Status:** complete

### Phase ZH2: Implementation + Verification
- [x] Update active `apps/site` page templates to localize hard-coded eyebrow labels.
- [x] Update Chinese `site-content` records that still expose English small labels.
- [x] Add locale-aware project wall group titles.
- [x] Run `npm run check`.
- [x] Run `npm run build`.
- **Status:** complete

## Theme Switch Plan (Legacy vs Cinematic)
### Phase T1: Snapshot & Source
- [x] Capture current cinematic UI into `apps/site/variants/cinematic`.
- [x] Restore legacy UI into `apps/site/variants/legacy` from local source.
- [x] Identify and copy the primary logo into `apps/site/public/brand`.
- **Status:** complete

### Phase T2: Switch Script & NPM Hooks
- [x] Implement `scripts/switch-site-theme.mjs` with validation and backups.
- [x] Add `npm run theme:legacy` / `npm run theme:cinematic`.
- [x] Optional dev/build wrappers to auto-switch before running.
- **Status:** complete

### Phase T3: Docs & Verification
- [x] Document theme switching in `apps/site/README.md`.
- [x] Verify both themes build with `npm run build:site`.
- **Status:** complete

## Scroll Narrative Upgrade (Cinematic)
### Phase S1: Markup + Script
- [x] Add `data-chapter` / `data-stage` / `data-reveal` across cinematic pages and components.
- [x] Add lightweight scroll narrative script for sticky stages and reveal pacing.
- [x] Sync cinematic snapshot after changes.
- **Status:** complete

### Phase S2: QA + Verification
- [x] Run `npm run build:site:cinematic`.
- [ ] Scroll QA for desktop + mobile.
- **Status:** in_progress

## Project Wall White Gallery Redesign (2026-03-21)
### Phase PW1: Design + Surface Treatment
- [x] Confirm the approved direction is one unified white gallery slab.
- [x] Save the approved design doc for the project wall redesign.
- [x] Move the white treatment from per-logo tiles to the wall-level surface.
- [x] Keep the current hover slowdown behavior intact.
- **Status:** complete

### Phase PW2: Sync + Verification
- [x] Sync the cinematic variant snapshot after implementation.
- [x] Run `npm run build:site`.
- [ ] Visually verify that the wall reads as one white exhibit surface on desktop and mobile.
- **Status:** in_progress

## Cinematic Rebuild v2 Plan (apps/site)
### Phase C1: Audit & Mapping
- [x] Inventory current `apps/site` pages, shared components, and global styles.
- [x] Map existing sections to new cinematic scene structure per design.
- [x] Confirm asset availability and identify gaps.
- **Status:** complete

### Phase C2: Visual System + Shell
- [x] Define new design tokens (color, typography, spacing, radii, shadows).
- [x] Update `BaseLayout`, header, footer, and shell scaffolding.
- [x] Add motion primitives with reduced-motion fallbacks.
- **Status:** complete

### Phase C3: Homepage Scenes
- [x] Implement cinematic opening stage with hero portrait + CTA focus.
- [x] Rebuild proof wall as exhibition-style layout.
- [x] Convert stats/method into narrative chapter modules.
- [x] Reframe services preview as invitation.
- [x] Build editorial atlas and closing invitation.
- **Status:** complete

### Phase C4: Inner Pages (Services/Insights/Links/Detail)
- [x] Services proposal-style flow.
- [x] Insights + Links editorial directory system.
- [x] Insight detail hero, reading rail, and related CTA.
- **Status:** complete

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
| Keep split runtimes but expose a single visible entrypoint | Solves the current two-site navigation problem without a high-risk framework migration |
| Current production launch should ship only `apps/site` to Vercel | Fastest path to a clean launch while keeping future app/studio code available |

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
- Single-entry integration is now the next routing phase:
  - local users should only open `http://localhost:4321`
  - public and functional paths should share one visible origin
  - production `nginx` must stop proxying the entire site to `apps/web`
- Single-entry integration is now implemented for local/proxy/deploy config:
  - `apps/site` defaults to same-origin app links
  - local `Astro` proxying to `apps/web` was added during the dual-runtime integration pass
  - production compose now includes a `site` container and split `nginx` routing
- The current release target has changed again:
  - production deployment should now be `apps/site` only
  - Vercel is the active target
  - `apps/web`, `apps/studio`, and ECS infrastructure become retained but non-default paths
- Approved auth/member redesign is documented in `docs/plans/2026-03-10-auth-identity-redesign-design.md`.
- Approved project asset restoration is documented in `docs/plans/2026-03-10-project-asset-restoration-design.md`.
- Approved white gallery redesign for the project wall is documented in `docs/plans/2026-03-21-project-wall-white-gallery-design.md`.
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

## Architecture Review Plan (2026-03-20)
### Phase R1: Topology & Workspace Boundaries
- [x] Inspect root workspace scripts and package layout.
- [x] Inventory application/package folders and deploy/config surfaces.
- **Status:** complete

### Phase R2: Coupling & Extensibility Audit
- [x] Review `apps/site`, `apps/web`, and shared packages for ownership boundaries and duplication.
- [x] Identify hotspots that make new pages/features costly.
- **Status:** complete

### Phase R3: Maintainability Audit
- [x] Review config, scripts, docs, and test coverage posture.
- [x] Identify operational and developer-experience risks.
- **Status:** complete

### Phase R4: Reporting
- [x] Summarize findings ordered by severity.
- [x] Propose prioritized refactors with expected payoff.
- **Status:** complete

## Maintainability Hardening Plan (2026-03-20)
### Phase H1: Scope & Design
- [x] Choose a conservative maintenance-first scope that avoids in-progress UI files.
- [x] Record the chosen approach in a design doc.
- **Status:** complete

### Phase H2: Validation & Script Hardening
- [x] Add workspace-level checks for `apps/site`, `apps/web`, and `apps/studio`.
- [x] Make theme switching safer so it does not silently overwrite dirty work.
- **Status:** complete

## Header Brand Presence Plan (2026-03-20)
### Phase B1: Audit & Design
- [x] Inspect the active header implementation and live rendering.
- [x] Confirm the user wants a stronger brand-presence treatment rather than a minimal visibility fix.
- [x] Save the approved design in `docs/plans/2026-03-20-header-logo-presence-design.md`.
- **Status:** complete

### Phase B2: Implementation & QA
- [x] Strengthen the cinematic header badge and enlarge the logo in the active theme.
- [x] Sync the cinematic theme snapshot with the active theme styles.
- [x] Verify the built output and live `/zh` response include the updated header styles.
- [ ] Capture reliable screenshot-based desktop/mobile visual QA in this environment.
- **Status:** in_progress

## Additional Decisions (2026-03-20)
| Decision | Rationale |
|----------|-----------|
| Preserve the existing logo asset colors and solve visibility with a brighter badge treatment | Keeps the mark distinctive and avoids a flat generic white logo |
| Increase rendered logo size before considering markup changes | The current problem is primarily scale plus contrast, not missing content |

### Phase H3: Documentation Alignment
- [x] Update repo docs to reflect the real runtime architecture and current content source-of-truth.
- [x] Document theme switching as a guarded local workflow rather than the default edit path.
- **Status:** complete

### Phase H4: Verification
- [x] Run targeted checks for the updated scripts and package manifests.
- [x] Summarize residual risks and next recommended refactors.
- **Status:** complete

## Architecture Review Conclusions (2026-03-20)
- Extensibility: medium.
  - The app/site split is directionally correct and gives room to scale public marketing separately from authenticated flows.
  - That benefit is currently reduced by duplicated content sources and snapshot-based theme management.
- Maintainability: medium-low.
  - The repo has useful docs and infrastructure scaffolding, but code/document drift and missing cross-workspace validation raise the cost of safe change.
- Highest-priority structural risks:
  - Sanity Studio exists, but production-facing marketing content is still hard-coded in `packages/site-content`.
  - Theme switching copies whole source trees between `apps/site/src` and `apps/site/variants/*`, creating drift risk.
  - `apps/site` concentrates visual behavior into a single large stylesheet and inline layout script, increasing blast radius for UI changes.

## Console Error Remediation Plan (2026-03-21)
### Phase E1: Root Cause Isolation
- [x] Identify whether the extractor stack belongs to repo code or an injected extension script.
- [x] Confirm the source of the separate `css2` timeout.
- **Status:** complete

### Phase E2: Approved Fix Selection
- [x] Confirm whether to patch the local Chrome extension, the site font loading, or both.
- [x] Record the chosen low-risk remediation scope.
- **Status:** complete

### Phase E3: Implementation
- [x] Apply the approved defensive message parsing fix.
- [x] Apply the approved font-loading mitigation if requested.
- [x] Verify the errors no longer reproduce in the intended target.
- **Status:** complete

## Background Flow Plan (2026-03-21)
### Phase G1: Design
- [x] Inspect the current cinematic background layers and motion posture.
- [x] Confirm the user wants the lightest "breathing drift" option instead of a stronger fluid or parallax effect.
- [x] Save the approved design in `docs/plans/2026-03-21-background-flow-design.md`.
- **Status:** complete

### Phase G2: Implementation & Verification
- [x] Add subtle transform/opacity drift to the existing shell glow and aura layers.
- [x] Mirror the change to the cinematic theme snapshot stylesheet.
- [x] Verify the site still passes `npm run check:site`.
- **Status:** complete

### Phase G3: Visibility Tuning
- [x] Reassess motion after user feedback that the first pass was too subtle.
- [x] Increase aura prominence and drift amplitude while keeping the same cinematic direction.
- [x] Re-run `npm run check:site` after the stronger pass.
- **Status:** complete

## Logo-Led Blue-Green Palette Plan (2026-03-24)
### Phase BP1: Design & Brand Rules
- [x] Confirm that the logo asset itself must remain unchanged.
- [x] Confirm that the site palette must be derived from the current logo colors rather than a generic blue-green system.
- [x] Define approved color roles and component mapping for header, controls, links, and background atmosphere.
- [x] Save the approved design in `docs/plans/2026-03-24-logo-led-blue-green-brand-palette-design.md`.
- **Status:** complete

### Phase BP2: Implementation & Verification
- [x] Replace warm gold cinematic tokens with the approved logo-led blue-green palette.
- [x] Update header badge/support surfaces so the unchanged logo sits inside a cool misted brand frame.
- [x] Update interactive accents, hover/focus states, and atmospheric glows to follow the approved palette rules.
- [x] Mirror the same palette changes to `apps/site/variants/cinematic`.
- [x] Run site checks/build and perform desktop/mobile visual QA.
- **Status:** complete

## Light Logo Editorial Redesign Plan (2026-03-24)
### Phase LR1: Design & Scope
- [x] Confirm that the dark theme must be removed rather than merely recolored.
- [x] Confirm that `#C0D696` and `#B0D5DF` should act as the site's true primary brand colors.
- [x] Approve the `misted editorial light-theme` direction and document it in `docs/plans/2026-03-24-light-logo-editorial-redesign-design.md`.
- **Status:** complete

### Phase LR2: Implementation & Verification
- [x] Rework shared site tokens and shells from dark surfaces to light editorial surfaces.
- [x] Update header, hero, cards, service sections, and CTA treatment to follow the new light palette rules.
- [x] Sync the same stylesheet to `apps/site/variants/cinematic/styles/global.css`.
- [x] Run site checks/build and verify the redesign with desktop/mobile screenshots.
- **Status:** complete

## Maintainability Hardening Results (2026-03-20)
- Added root-level validation orchestration:
  - `check:site`
  - `check:web`
  - `check:studio`
  - `check`
- Added package-local `typecheck` / `check` scripts for `apps/site` and `apps/studio`.
- Installed `@astrojs/check` and local `typescript` into `@yipei/site` so Astro validation runs without prompting.
- Excluded `apps/site/variants` from Astro type-checking because the snapshot trees are archival and intentionally depend on `src/lib`.
- Hardened `scripts/switch-site-theme.mjs`:
  - no-op if the requested theme is already active
  - aborts on dirty `apps/site` theme files unless `--force` is supplied
- Updated repo docs to reflect:
  - route/runtime ownership
  - current public content source-of-truth
  - theme switching safety rules
- Repointed local Figma asset helper scripts to `apps/site/public/figma-assets`.

## Residual Risks
- Public content is still runtime-hardcoded in `packages/site-content`; this pass only documented that truth.
- Theme snapshots still duplicate entire source trees; the new guard reduces accidental overwrite but not long-term drift.
- `apps/site` check currently passes with hints only:
  - `AppBridge.astro` inline script hint
  - `BaseLayout.astro` inline script hint
  - unused `locale` prop in `SiteFooter.astro`

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| `sed` failed on paths containing `[locale]` because zsh treated brackets as globs during review | 13 | Re-ran commands with quoted literal paths |
| Monolithic patching of `README.md` failed because the live file contents no longer matched the expected patch context | 14 | Re-ran as smaller patches and explicitly rewrote the affected README files |
| `apps/site` validation initially stalled because `astro check` prompted for missing dependencies | 15 | Installed `@astrojs/check` and `typescript` into `@yipei/site` |
| `apps/site` validation then failed because `apps/site/variants` snapshots are not standalone compilable trees | 16 | Excluded `variants` from Astro type-checking so `check:site` targets runtime source files only |
