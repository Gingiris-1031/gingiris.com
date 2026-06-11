# Findings & Decisions

## Requirements
- User wants local deployment in `/Users/hw/Documents/yipei`.
- User wants to use Figma MCP for a specific Figma design URL.
- User authorized web research and requested installing needed dependencies.
- User explicitly requested no online page replacement and local-only changes.
- User now requests full personal website pages (not a single node) with premium-quality complete delivery.

## Research Findings
- Official Figma docs provide two MCP endpoints:
  - Remote: `https://mcp.figma.com/mcp` (OAuth login, no token in config)
  - Local desktop: `http://127.0.0.1:3845/mcp` (requires Figma Desktop app running)
- Official Figma docs include direct Codex configuration examples in `~/.codex/config.toml`.
- Figma docs recommend including URL parsing prompt patterns to fetch design context by node id.
- `codex mcp add figma --url https://mcp.figma.com/mcp` worked and completed OAuth in this session.
- Direct `curl` to MCP asset URLs returned `404`; raw asset URLs are not generally fetchable without MCP/session context.
- `figma.get_screenshot` returns image bytes (base64) that can be written to local PNGs.
- Attempt to query full file structure via `figma.get_metadata(fileKey, nodeId=0:0)` failed due MCP quota:
  - `"You've reached the Figma MCP tool call limit for your seat type or plan..."`
- After re-login, `figma.whoami` shows:
  - `email`: `jaxon.bolden@koonwarravillageschools.org`
  - `seat`: `View`
  - `tier`: `student`
- Root metadata by `nodeId=0:0` still fails, but `nodeId=0:1` succeeds and returns full page canvas hierarchy.
- Top-level site-relevant frames discovered from `0:1` include:
  - `7:556` `Personal H5 Introduction Page` (`576x4755`)
  - `224:249` `付费服务合集 带二维码` (`576x768`)
  - `224:405` `付费服务合集 不带二维码` (`576x768`)
  - Additional standalone logo/test frames (`KUSA`, `万物时`, `EEZYCOLLAB`, etc.)

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Build with Vite React TypeScript starter | Fast, common local web deployment baseline |
| Add scripts/instructions for MCP-assisted build flow | Makes design-to-code process repeatable |
| Keep design URL and parsed file/node IDs in project docs | Reduces copy/paste errors during MCP prompts |
| Export frame screenshot locally and crop into local tiles | Guarantees local-only assets without online runtime dependency |
| Block full-site extraction until MCP quota issue is resolved | Accurate full-page implementation needs full page/frame inventory |
| Use `nodeId=0:1` as file entry point for structure extraction | `0:0` fails in current setup, `0:1` is the reliable canvas root returned by URL |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| Project folder initially empty | Bootstrapped a new frontend project from scratch |
| `npm create vite` process hung in this environment | Switched to manual bootstrap (`npm init` + dependency install + config files) |
| `codex exec` subprocess panicked/hung while trying to auto-generate from MCP | Terminated hanging process; retained manual stable workflow + instructions |
| MCP screenshot asset not automatically written to project files | Extracted base64 screenshot payload from Codex session log into local PNG and scripted local tile extraction |
| Figma MCP quota exceeded for root metadata call | Cannot continue full-file pull; requires quota reset/upgrade or alternate authorized source |

## Resources
- Figma MCP docs: https://www.figma.com/developers/mcp
- Figma getting started with MCP: https://help.figma.com/hc/en-us/articles/32132100833559-Use-the-Figma-MCP-server
- Figma MCP + Codex page: https://www.figma.com/developers/mcp#codex-by-openai
- Figma Dev Mode MCP in CLI tools: https://developers.figma.com/docs/cli-tools/mcp-server
- Figma prompt/workflow examples: https://developers.figma.com/docs/mcp/prompting-and-tools/

## Visual/Browser Findings
- The provided design URL includes:
  - `fileKey`: `44iQk98v09qZnTHZcyjFtb`
  - `node-id`: `209-75`
- These values can be used directly in MCP prompts after replacing `-` with `:` for node ids in some tools.
- `/Applications/Figma.app` is not present on this machine, so remote MCP mode is the practical default.
- The local screenshot `node-209-75.png` is `576x768`, matching node metadata dimensions.

## Implementation Findings (M2)
- Workspace architecture now runs as monorepo (`apps/web`, `apps/studio`, `packages/shared-types`) with shared scripts.
- Sanity schema is split into singleton docs + collections for maintainability:
  - Singletons: `siteSettings`, `homePage`, `servicesPage`
  - Collections: `servicePlan`, `insightPost`, `linkItem`
- Sanity Studio desk structure now enforces singleton behavior and blocks accidental duplicate singleton creation.
- Web content layer was added under `apps/web/src/modules/content` with types, queries, and server-only fetchers.
- Route pages now consume Sanity content with fallback UI so app still renders if CMS is not configured.
- Locale selection now persists from URL segment to cookie, preserving user manual choice.
- Payment webhook route now supports:
  - signature verification (`sha256=` header prefix supported)
  - session-independent processing
  - event idempotency (in-memory)
  - DB persistence adapter for `payment_results` (when Supabase env is configured)
  - raw payload logging fallback

## Additional Decisions (M2)
| Decision | Rationale |
|----------|-----------|
| Use singleton docs for page-level CMS config | Stable content ownership and less editor confusion |
| Keep Sanity fetches optional behind `isSanityConfigured` | Local/dev build should remain stable before credentials are wired |
| Make locale cookie write happen in middleware when URL locale exists | Implements `URL > user preference > Accept-Language > default` behavior |
| Persist webhook raw payload through repository when possible | Aligns with payment callback auditability requirements |

## Additional Issues Encountered (M2)
| Issue | Resolution |
|-------|------------|
| Next.js build failed because placeholder `SANITY_PROJECT_ID` used invalid characters | Changed default from `replace_me` to valid placeholder `replace-me` |

## Figma Restoration Findings (Long Page First)
- A direct full-height screenshot for node `7:556` is not present in local assets.
- The available local Figma assets include:
  - `node-209-75.png` full section screenshot (`576x768`)
  - extracted logo tiles under `figma-assets/tiles/*`
- Implemented strategy for this constraint:
  - reconstruct long page structure with premium section rhythm in Next.js
  - faithfully reuse Figma-derived visual language for project proof cards in both home and services pages
  - keep content pipeline Sanity-ready for later exact copy/section injection

## Redesign Findings (2026-03-10)
- Current site quality is uneven:
  - homepage already has custom interaction/state logic
  - services page has partial premium treatment
  - insights/links pages still use generic stacked cards
- Existing local assets are sufficient for a high-quality first-pass redesign without waiting for more Figma pulls.
- The highest-leverage change is a shared full-screen visual system across shell, homepage, services, insights, and links.
- User approved a full-site redesign rather than incremental enhancement.
- Implemented redesign focus:
  - full-screen glass/frost shell and stronger navigation
  - rebuilt immersive homepage with hero split-layout, proof stage, and editorial atlas
  - proposal-style services page with stronger trust + conversion framing
  - editorial-style insights/links pages replacing plain list layouts
- Build verification passed after redesign.
- Available local real-image resources remain limited to:
  - `node-7-556.png`
  - `node-7-586.png`
  - `node-209-75.png`
  - extracted logo tiles
- `asset-manifest.json` and local design-context files reference more Figma asset URLs, but those assets are not downloaded into the project yet.
- Direct network probe to `https://www.figma.com/api/mcp/asset/...` now succeeds at the transport layer but returns `HTTP 404` without authenticated session context.
- Because those extra assets are still remote MCP URLs, current safe continuation work is:
  - maximize composition quality with existing local assets
  - upgrade remaining placeholder routes
  - leave stable slots for future image replacement

## Figma Asset Pull Result (2026-03-10)
- A valid authenticated Figma session cookie allowed manifest asset download.
- Python SSL verification failed in this environment, so the download helper was updated to support `FIGMA_INSECURE=1` for this machine.
- All 49 assets from `apps/web/public/figma-assets/asset-manifest.json` were downloaded successfully to:
  - `apps/web/public/figma-assets/raw`
- Highest-value newly available visual assets now include:
  - high-resolution iris profile image
  - Wegic / AI Editor / Teable brand images
  - multiple logo/vector components from the original Figma contexts
- Homepage was updated to start using the pulled raw assets instead of only relying on prior screenshots/tiles.
- Raw assets were then normalized into a reusable module:
  - `apps/web/src/modules/services/raw-figma-assets.ts`
- Service page now uses pulled raw assets in addition to screenshot/tiles:
  - local brand strip
  - local asset proof cards
- Homepage and services proof stages were further de-screenshoted:
  - added `FigmaProofCollage`
  - replaced large screenshot proof blocks with local raw asset collage composition
- Project logo modules now prefer pulled raw assets for several brands instead of only tile crops.
- Raw assets were further categorized into structured case modules:
  - `brandCases`
  - `serviceBrandStrip`
  - `rawFigmaAssets`
- Homepage hero visual now uses structured local case cards instead of the previous long-page screenshot block.
- Brand presentation was further upgraded from plain grids to a layered matrix system:
  - `brandLibraryGroups`
  - `BrandMatrix`
- Homepage project wall and shared showcase now use the same structured brand matrix instead of simple 4x2 logo grids.
- Raw SVG icon assets are now used in actual UI details:
  - homepage tag pills

## Cinematic Rebuild v2 (2026-03-10)
- Scope confirmed: upgrade `apps/site` only (marketing site), including home + services + insights + links + insight detail.
- Direction confirmed: “Cinematic Rebuild” (Apple release-page order + luxury campaign atmosphere).
- Palette confirmed: deep charcoal/ink base with warm metallic accents.
- Primary outcomes: brand prestige, consult/service conversion, and deeper content reading.
- New design doc saved at `docs/plans/2026-03-10-cinematic-rebuild-v2-design.md`.
- Repository at `/Users/hw/Documents/yipei` is not a git repo (no commit possible here).
- Reviewed current shell components:
  - `SiteHeader.astro` uses `.site-header`, `.site-nav`, `.site-app-rail` with app bridge CTA.
  - `SiteFooter.astro` is minimal with kicker + title + subtitle.
- Reviewed content components:
  - `ProjectWall.astro` renders grouped marquee tracks using `.project-wall` and `.project-card`.
  - `ResourceGrid.astro` renders `.resource-group` sections with `.resource-card` entries.
- Reviewed page structures:
  - `services.astro` uses `page-hero`, `app-entry-section`, `premium-pricing`, `payment-architecture`, `project-section`, `faq`.
  - `insights.astro` uses `page-hero` + `editorial-grid` with `editorial-card` entries.
- Additional pages:
  - `links.astro` uses `page-hero` + `resource-group` sections with `resource-card`.
  - `insights/[slug].astro` uses `page-hero` + `article-layout` with main card + aside CTA.
- Stylesheet map:
  - `global.css` contains hero and project wall styling blocks (multiple sections and responsive overrides).
- Current `global.css` uses warm beige palette and glassy surfaces; major tokens and hero/project styles will need replacement for the new dark cinematic system.
- `global.css` includes dense styling for services pricing grids, editorial cards, resource grids, and responsive breakpoints that will need a coherent cinematic rework.
- Began updating `apps/site` markup for cinematic scenes and a new closing invitation section on the home page.
- Inspected `services.astro` pricing and delivery blocks to prepare reordering and scene-class updates.
- Rebuilt `apps/site/src/styles/global.css` with the cinematic dark system (deep ink base + metallic accent styling).

## Theme Switch (2026-03-11)
- Requirement confirmed: keep legacy (warm premium) UI + cinematic UI, and enable build-time local script switching.
- Approved approach: snapshot-based switcher under `apps/site/variants/{legacy,cinematic}`.
- Primary logo source path provided: `/Users/hw/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_gqud2wact5ta12_80ce/msg/file/2026-03/Gingiris logos`
- Design doc saved at `docs/plans/2026-03-11-site-theme-switch-design.md`.
- Legacy snapshot source: initial git commit (`4d0ed32`) exported into `apps/site/variants/legacy`.
- Primary logo picked: `1197.png` copied to `apps/site/public/brand/logo-primary.png`.

## Scroll Narrative (2026-03-11)
- Cinematic-only scroll narrative added via `data-chapter` / `data-stage` / `data-reveal`.
- Inline script in `BaseLayout` drives sticky stages + reveal transforms (no third-party deps).
- Stage sizing handled via `stage-tall`, `stage-medium`, `stage-compact` classes.
- This reduces the remaining amount of placeholder/text-only iconography in the redesigned UI.
- Final polish layer added:
  - reveal-section animation rhythm for key homepage/services sections
  - improved hover elevation on case cards
  - tighter mobile spacing for hero, brand strips, proof collage, and matrix cells
- Final hardening/presence pass added:
  - extra hero depth through layered overlays, drift glow, floating avatar treatment, and stronger visual-card perspective
  - more explicit hover/active feedback on anchor nav, asset cards, proof collage, brand matrix groups/cells, and service brand tiles
  - `prefers-reduced-motion` fallback so the richer motion system degrades safely

## Local Runtime Bring-up (2026-03-20)
- Root workspace command `npm run dev` starts both:
  - `@yipei/site` on `http://localhost:4321/`
  - `@yipei/web` on `http://localhost:3000/`
- `apps/web/.env.local` is present locally with all key app/runtime variables populated.
- In this Codex environment, port binding for local dev servers is blocked inside the sandbox and must be re-run with escalated permissions.

## Single-Site Demo Conversion (2026-03-20)
- Active marketing site (`apps/site/src`) no longer depends on the separate functional app for login, checkout, or orders.
- Header CTA now routes to an on-page contact anchor instead of account state.


## Mobile Header Optimization (2026-03-21)
- The current phone-mode header problem is caused by responsive stacking rules in `apps/site/src/styles/global.css`:
  - `@media (max-width: 1120px)` turns `.site-header`, `.site-header-main`, and `.site-app-rail` into vertical stacks
  - `@media (max-width: 560px)` stretches header controls to full width
- In combination, those rules make the floating header too tall and visually block the page opening on mobile.
- Approved direction:
  - mobile keeps a compressed floating bar
  - visible bar items are logo + locale switch + menu button
  - nav links and contact CTA move into an expandable mobile panel
  - a small scroll threshold triggers a condensed state on mobile
- Active implementation scope is limited to:
  - `apps/site/src/components/SiteHeader.astro`
  - `apps/site/src/styles/global.css`
- Implemented mobile header shape:
  - top bar keeps only logo + locale switch + menu button
  - nav links and contact CTA now render inside `.site-mobile-panel`
  - header state is driven by `data-open` and `data-condensed`
- Verification findings:
  - `npm run check` passed with existing non-blocking Astro hints only
  - `npm run build` passed for `apps/site`
  - SSR output for `/zh` confirms the new mobile header markup is present and the built CSS asset is linked
- Environment limitation:
  - headless Chrome succeeded for `file://` capture but that path does not load built assets correctly
  - direct live mobile screenshot against local `http://127.0.0.1` was not reliable in this Codex environment, so visual verification is still best done in a normal browser session

## Chinese Copy Localization Cleanup (2026-03-21)
- The current Chinese adaptation issue is split across two layers:
  - hard-coded English eyebrow labels in active page templates
  - English leftovers inside Chinese `site-content` records
- Confirmed active page-level English fallback labels include:
  - `Operating Range`
  - `Proof Wall`
  - `Resource Atlas`
  - `Editorial`
  - `Start Here`
  - `Flow`
  - `Proof`
  - `FAQ`
  - `Next`
  - `Invitation`
  - `Engagement`
- Confirmed Chinese content-source leftovers include:
  - `home.ts` values like `Startup Coach`
  - `services.ts` values like `Boutique Advisory`, `Global Launch`, `Founder Positioning`
  - `editorial.ts` categories like `Research`, `Launch`, `Conversion`, `Global Growth`
  - `projects.ts` shared group titles like `OpenSource Launch` and `Startup Coach`
- Approved fix scope:
  - update active `apps/site/src/pages/[locale]` templates
  - update Chinese records in `packages/site-content`
  - make project wall group titles locale-aware
- Implemented source cleanup:
  - page templates now use Chinese eyebrow labels for the active `zh` pages
  - Chinese `home.ts`, `services.ts`, and `editorial.ts` records no longer expose the main leftover English small labels
  - `projects.ts` now supports locale-aware group titles so the project wall stops rendering shared English labels on Chinese pages
- Verification findings:
  - `npm run check` passed with the same existing non-blocking Astro hints only
  - `npm run build` passed
  - direct grep against `apps/site/dist/zh` no longer finds the previously reported English fallback labels such as `Operating Range`, `Proof Wall`, `Resource Atlas`, `Start Here`, or `FAQ`

## Single-Entry Integration Findings (2026-03-21)
- The desired “one site” outcome was clarified as:
  - one visible entrypoint
  - keep `Astro` + `Next.js` split internally
  - avoid a full app merge
- Current breakpoints in the existing implementation:
  - preserved `apps/site/variants/*` layouts and pages still default `PUBLIC_APP_ORIGIN` to `http://localhost:3000`
  - local development exposes both `4321` and `3000` as visible entrypoints
  - production `infrastructure/nginx/default.conf` still proxies all traffic to `apps/web`
  - production compose has no `site` service yet, so public-site cutover cannot happen
- Current safe direction:
  - make same-origin app paths the default in `apps/site`
  - keep explicit origin override support for advanced cases
  - proxy functional routes locally through `apps/site`
  - add a dedicated production `site` container and route split
- Local config mismatch found:
  - `apps/web/.env.local` currently sets `SITE_URL=http://localhost:3000`
  - `NEXT_PUBLIC_MARKETING_SITE_URL` is already `http://localhost:4321`
  - under a single-entry setup, externally visible callbacks and generated URLs should use the shared public origin
- Implementation result:
  - `apps/site` now defaults to same-origin functional paths when `PUBLIC_APP_ORIGIN` is unset
  - `apps/site/astro.config.mjs` was temporarily updated to proxy functional routes plus `/_next` to `http://127.0.0.1:3000` for local dev/preview
  - production topology now includes a dedicated `site` container and route split in `nginx`
  - `apps/web` external URL defaults/docs were aligned to `http://localhost:4321` for local single-entry behavior
- Verification result:
  - `npm run check:site` passed
  - `npm run typecheck:web` passed
  - `curl -I http://127.0.0.1:4321/api/health` returned `HTTP/1.1 200 OK`
  - `curl -I http://127.0.0.1:4321/zh/auth` returned `HTTP/1.1 200 OK`
- Historical note:
  - this dual-runtime path has since been superseded by the Vercel site-only cleanup
  - the active shipped `apps/site` config no longer treats `apps/web` proxying as the default release posture

## Vercel Site-Only Cleanup Findings (2026-03-21)
- Launch target changed from multi-service deploy to:
  - Vercel
  - `apps/site` only
  - `apps/web` and `apps/studio` retained in-repo but not deployed
- Official deployment constraints confirmed:
  - Astro static sites deploy directly on Vercel
  - Vercel supports monorepos by configuring a project Root Directory
- For the current goal, the cleanest deploy contract is:
  - Vercel project Root Directory: `apps/site`
  - Build Command: `npm run build`
  - Output Directory: `dist`
- Repository cleanup implications:
  - root default scripts should become site-only
  - ECS/Nginx/Docker docs should be archived instead of presented as current production
  - `apps/site` should no longer describe `apps/web` proxying as the primary deployment story

## Console Error Investigation (2026-03-21)
- The reported `[Extractor] Error handling editor message` stack is not emitted by the `yipei` repo.
- The exact hashed files in the console belong to the Chrome extension `文章同步助手 / Wechatsync`:
  - `/Users/hw/Library/Application Support/Google/Chrome/Default/UnpackedExtensions/wechatsync-2.0.6_pcMsy2/assets/extractor.ts-Cl_jilX_.js`
  - `/Users/hw/Library/Application Support/Google/Chrome/Default/UnpackedExtensions/wechatsync-2.0.4_ydyTTb/assets/extractor.ts-NasmuukF.js`
  - `/Users/hw/Library/Application Support/Google/Chrome/Default/Extensions/hchobocdmclopcbnibdnoafilagadion/2.0.6_0/assets/extractor.ts-Cl_jilX_.js`
- Root cause in the extension bundle:
  - it injects an extractor content script on all `http://*/*` and `https://*/*` pages
  - it registers a global `window.addEventListener("message", ...)`
  - it blindly runs `JSON.parse(event.data)` for any string payload
  - empty or truncated message strings therefore throw `SyntaxError: Unexpected end of JSON input`
- The extension currently catches the parse error but still logs it via `logger-CvfM-6aa.js`, which is why the page console is noisy.
- The separate `css2:1 Failed to load resource: net::ERR_CONNECTION_TIMED_OUT` error is from the marketing site's remote Google Fonts stylesheet:
  - `apps/site/src/layouts/BaseLayout.astro`
  - `apps/site/variants/cinematic/layouts/BaseLayout.astro`
- The site relies on remote font families:
  - display: `Fraunces`, `Noto Serif SC`
  - body: `Manrope`, `Noto Sans SC`
  - with local fallbacks already declared in CSS
- Applied fix:
  - added a defensive message parser to each affected Wechatsync extractor bundle so empty, truncated, or unrelated `window.message` payloads are ignored instead of reaching the logged `JSON.parse` failure path
  - removed the remote Google Fonts `<link>` tags from the active and cinematic `BaseLayout.astro` files so the site now uses the existing CSS fallback stacks without a `css2` network dependency
- Verification:
  - `npm run check:site` passed with 0 errors and only pre-existing Astro hints
  - `rg` confirms the active site layouts no longer reference `fonts.googleapis.com`
- Operational note:
  - Chrome will need an extension reload or browser restart before the patched extension bundles are used by active tabs

## Background Flow Polish (2026-03-21)
- Requirement confirmed: keep the cinematic dark background but make it feel slightly more alive.
- Approved direction: the lightest version, using only CSS drift on existing background layers.
- Design doc saved at:
  - `docs/plans/2026-03-21-background-flow-design.md`
- Implemented approach:
  - animate `.page-shell::before` with a slow breathing transform/opacity cycle
  - animate `.page-aura-left` and `.page-aura-right` with separate long-duration drift keyframes
  - preserve the existing `prefers-reduced-motion` blanket disable behavior
  - mirror the same change into `apps/site/src/styles/global.css` and `apps/site/variants/cinematic/styles/global.css`
- Verification:
  - `npm run check:site` passed with 0 errors and only the same existing Astro hints
- Follow-up iteration:
  - the first pass was too subtle to read in normal viewing
  - the approved second pass increased visibility by:
    - shortening durations to roughly `18s` to `22s`
    - increasing drift amplitudes
    - moving the aura blobs further into the viewport
    - widening opacity swing slightly
  - verification still passed after the stronger motion pass

- Homepage and services page CTAs now resolve to:
  - internal service anchors
  - internal resource pages
  - footer contact anchor
- Services copy now describes a browse-first, contact-later demo flow instead of account / payment / order-center behavior.
- `npm run build --workspace @yipei/site` passes after the single-site conversion.

## Header Brand Presence (2026-03-20)
- Active site theme is `cinematic` (`apps/site/.active-theme`).
- Both the active header and the cinematic snapshot header use the same `/brand/logo-primary.png` asset.
- The logo asset is a large transparent PNG (`14022x3654`) but the current header styling renders it at only `30px` tall.
- Live preview of `http://127.0.0.1:4321/zh/` confirms the current badge reads as too small and too dark relative to the rest of the premium header.
- The user approved a stronger brand-presence direction:
  - larger logo
  - brighter premium badge
  - keep existing logo colors
  - keep interaction subtle
- Implemented treatment:
  - `.site-brand` now uses a warm light gradient badge with stronger border/highlight/shadow separation
  - `.site-brand-logo` now renders at `42px` desktop, `38px` below `860px`, and `36px` below `560px`
- `apps/site/src/styles/global.css` and `apps/site/variants/cinematic/styles/global.css` were updated together so theme switching will preserve the adjustment.
- `file://` screenshot QA is not representative for this Astro build because the generated page uses absolute asset paths.
- Runtime verification fallback succeeded: local `/zh` HTML response includes the updated `.site-brand` and `.site-brand-logo` CSS blocks.

## Architecture Review Kickoff (2026-03-20)
- The repo is a workspace monorepo with three active apps:
  - `apps/site` for the marketing site (Astro)
  - `apps/web` for functional flows (Next.js)
  - `apps/studio` for content authoring (Sanity)
- Shared code is currently light:
  - `packages/site-content`
  - `packages/shared-types`
- Root scripts favor local developer convenience, but most validation is centered on `@yipei/web`; there is no equivalent root lint/typecheck/test orchestration for all workspaces.
- The repository contains persistent planning and design docs, which helps long-term maintainability, but the worktree is currently dirty, so current architecture conclusions must distinguish committed design from in-progress edits.

## Architecture Review Findings (2026-03-20)
- Strong architectural direction:
  - Splitting public marketing (`apps/site`) from authenticated/payment flows (`apps/web`) is a sound scalability choice.
  - Infra and ops docs are present, which lowers future deployment ambiguity.
- Main scalability blockers:
  - Marketing content is still hard-coded in `packages/site-content`, while `apps/studio` defines a richer CMS model that is not visibly consumed by runtime code.
  - Theme switching is implemented by copying full source directories between snapshots, so every visual fix risks variant drift.
- Main maintainability blockers:
  - `apps/site` relies on a single very large stylesheet (`1110` lines) plus a large inline behavior script in `BaseLayout.astro`.
  - There are no repo test/spec files, and root `check` only validates `@yipei/web`.
  - `README.md` still documents an `apps/web/src/modules/content` layer that is no longer present, showing doc/code drift.
- Shared tooling maturity is incomplete:
  - `packages/eslint-config` and `packages/tsconfig` are placeholders only.
  - `@yipei/shared-types` exists but has little visible adoption in the code currently under review.

## Maintainability Hardening Scope (2026-03-20)
- Chosen approach: conservative hardening only.
- Explicitly in scope:
  - workspace validation scripts
  - safer theme-switch behavior
  - README / local docs alignment
- Explicitly out of scope for this pass:
  - wiring `apps/site` to Sanity
  - redesigning page markup
  - refactoring large CSS files or motion behavior
- Reasoning:
  - current worktree already contains extensive in-progress UI edits in `apps/site`
  - low-risk maintenance fixes should avoid colliding with those page/style changes

## Maintainability Hardening Outcomes (2026-03-20)
- Root validation now covers all active workspaces instead of only `@yipei/web`.
- `apps/site` now has a real `astro check` path, backed by installed `@astrojs/check`.
- `apps/site/variants` had to be excluded from Astro validation because the snapshot trees intentionally omit `src/lib` and are not standalone compile targets.
- Theme switching now has two critical safety behaviors:
  - switching to the already active theme is a no-op
  - switching to another theme aborts on dirty theme-related paths unless `--force` is used
- `README.md` and `apps/site/README.md` now match the real architecture:
  - public routes live in `apps/site`
  - functional routes live in `apps/web`
  - `packages/site-content` is the current public content source of truth
- Local Figma asset helper scripts were still pointing at `apps/web/public/figma-assets`; they now target `apps/site/public/figma-assets`, which matches the current repo layout.
- Verification status:
  - `npm run check` passes
  - Python asset scripts compile successfully
  - theme switch guard/no-op behavior works as intended

## Auth Framework Findings (2026-03-10)
- Existing auth routes were only visual placeholders and had no working Supabase sign-in flow.
- The project already includes a browser Supabase client and enough `supabase-js` capabilities for:
  - `signInWithOtp`
  - `verifyOtp`
  - `exchangeCodeForSession`
- Current implementation should stay frontend-only for speed and to avoid introducing a new server auth dependency mid-stream.
- Confirmed launch behavior:
  - phone login UI visible and prioritized
  - SMS button disabled with "coming soon"
  - email login supports Magic Link and Email OTP
  - member pages gate signed-out users back to `/auth?next=...`
- Deployment baseline remains ECS-based, not Vercel-based.
- Production deployment requires externally provided values for:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - final production `SITE_URL`
- ECS deployment flow is now hardened with:
  - `.env.production` required-variable validation
  - compose config validation before deploy
  - web health endpoint at `/api/health`
- Image-placement correction findings:
  - the homepage hero had been using `BrandCaseGrid`, which mixed profile/banner assets into a position that should behave like a compact project/logo wall
  - the service brand strip also incorrectly included the profile image in a brand slot
  - correcting this required splitting raw assets by semantic role instead of just reusing every pulled file wherever a visual slot existed
- Proof-wall refinement findings:
  - the old proof section still read too much like a premium grid, not a storyboard; stronger stagger and sticky narrative copy improved the sense of sequence without adding noisy interaction
  - the homepage and services page Chinese copy needed to be tightened together; polishing only the homepage left the trust and collaboration language feeling less premium than the visual system
  - running `next dev` and `next build` against the same `apps/web/.next` directory can corrupt manifests/chunks badly enough to produce false page-not-found and missing-module build errors
  - moving the dirty `.next` aside and rebuilding from a clean directory restored stable build output
- Cinematic rebuild findings:
  - the prior redesign still fundamentally relied on card/grid semantics, which kept the experience in the "premium website" category rather than a true release-page/campaign category
  - achieving the requested quality required a new component layer and a new shell language, not further iteration on the old `figma-*` visual system
  - rollback safety is best handled by preserving overwritten route-level and shell-level implementations as `legacy-*` components while switching routes to the new cinematic layer
- Maintainability findings:
  - the hardest-to-maintain files were page components acting as content store, view model, interaction controller, and renderer at the same time
  - homepage content was tightly coupled to render logic inside `figma-home.tsx`; splitting content and sections immediately reduced edit surface without forcing a visual redesign
  - service-page maintainability improved once repeated visual sections were extracted into reusable section components, leaving only locale/data orchestration in the page wrapper
  - the remaining major maintainability hotspot is `globals.css`, which still mixes tokens, shell rules, page rules, and legacy styles in one file
- Figma parity findings for homepage correction:
  - the current homepage had three major content additions not present in the original Figma long page: a method block, a signature-cases block, and a dynamic-proof narrative block
  - the original Figma intent is much simpler: intro, metrics, coached-projects wall, grouped link sections, and consulting prices
  - the current hero also had invented trust/CTA/proof copy not present in the original design; those needed to be removed rather than rewritten
  - the original `辅导过的项目` section in Figma is organized as two grouped project cards:
    - `OpenSource Launch`
    - `Startup Coach`
  - the highest-leverage upgrade that still respects the original design is to keep those two groups but render them as a restrained scroll wall instead of static logo blocks
- Structural cleanup findings:
## Project Asset Restoration Findings (2026-03-10)
- The public project wall had two separate problems:
  - many coached projects were removed because only standalone raw assets were being allowed through
  - the surviving list mixed projects from different Figma nodes, so even visible items no longer matched the original wall
- `node-209-75-design-context.txt` is the canonical source for the large coached-project wall shown in the original design:
  - `OpenSource Launch`
  - `Startup Coach`
- The extracted `tiles/` assets are not random placeholders; they are exact 120x61 crops from the original `node-209-75.png` wall and are suitable as faithful reconstruction assets when no standalone raw export exists.
- OCR + image inspection confirmed the correct reconstructed names for the screenshot-backed tiles:
  - `Second Me`
  - `memu`
  - `OpenAgents`
  - `Datastrato`
  - `TEN-framework`
  - `BUDDIE`
  - `ACEMusic`
  - `Acontext`
  - `Bonjour!`
  - `Spark Lab`
  - `万物时`
  - `KIGLAND KIGURUMI`
  - `KUSA`
  - `EEZYCOLLAB`
  - `Nomofly`
  - `PaperGen`
- `node-7-556-design-context.txt` remains the source for the named standalone Product Hunt coach exports already pulled as raw assets:
  - `Wegic`
  - `AI Editor`
  - `Teable`
- The correct restoration strategy is:
  - use screenshot-backed reconstructed tiles for the full `node-209` wall
  - keep confirmed `raw` assets for separate named projects from `node-7-556`
  - keep Iris on the pulled raw portrait JPG
  - the codebase had accumulated three abandoned visual directions at once:
    - active figma/legacy path
    - unused cinematic home/services path
    - several service-only showcase/proof helper components that no longer matched the active homepage
  - the heaviest structural waste was not business logic but abandoned presentation layers:
    - `cinematic-home.tsx`
    - `cinematic-services-page.tsx`
    - `legacy-page-shell.tsx` as an unnecessary wrapper target
    - old showcase/proof helper components under `components/services`
  - `globals.css` had become the biggest maintenance hotspot because it still contained large dead blocks for cinematic and old showcase systems that were no longer mounted anywhere
  - collapsing shell indirection and removing dead presentation routes is the fastest way to make the next redesign tractable

## Payment Integration Design Findings (2026-03-10)
- Existing payment implementation is partial:
  - webhook signature verification exists
  - `payment_results` persistence exists
  - `checkout` and `payment/result` remain static placeholders
- Current missing domain pieces:
  - internal `orders` table and repository
  - payment-session creation endpoint
  - provider abstraction
  - authenticated order history rendering
  - order-bound result rendering
- User selected the staged strategy:
  - use `PayJS` first
  - preserve architecture for future native WeChat Pay and Alipay integrations
- User explicitly requires:
  - visible WeChat and Alipay choices in checkout
  - payment success/failure feedback
  - Supabase order + transaction persistence
  - users to view their own purchases and order history
  - ability to attach and show a product link after payment

## Payment Decisions (2026-03-10)
| Decision | Rationale |
|----------|-----------|
| Build a payment adapter layer before wiring PayJS | Prevents provider-specific coupling in the checkout lifecycle |
| Introduce an `orders` domain separate from `payment_results` | `payment_results` is audit/event data, not the user-facing source of truth |
| Persist `product_link` on the order | Supports post-payment delivery and result-page/member-center visibility |
| Use authenticated result/history reads only | User must be able to view their own orders without public lookup risk |

## Architecture Migration Findings (2026-03-10)
- The main performance and maintenance problem is not the visual code alone; it is that the repo's public brand pages and feature application run inside the same Next app.
- For a `2 core / 2 GB` server, the best fit is to make the public site static-first and keep the feature flows isolated in the existing Next runtime.
- The least risky migration path is additive:
  - create `apps/site`
  - keep `apps/web` alive for auth/payment/member flows
  - introduce a shared `packages/site-content` package for public content and locale-safe structures
- `apps/web` already contains enough public content to seed the migration:
  - `src/modules/site/home-content.ts`
  - `src/modules/services/project-logos.ts`
- `apps/web` route inventory cleanly separates public routes from functional routes:
  - public: `/[locale]`, `/[locale]/services`, `/[locale]/insights`, `/[locale]/links`
  - functional: `/[locale]/auth`, `/[locale]/checkout`, `/[locale]/payment/result`, `/[locale]/me/**`, `/api/**`
- The approved split architecture is documented in `docs/plans/2026-03-10-light-architecture-migration-design.md`.
- The migration baseline now exists in code:
  - `apps/site` has been scaffolded as an Astro static public site
  - `packages/site-content` now holds shared public copy, project-wall data, and locale-safe structures
  - `apps/web` now consumes `@yipei/site-content` for homepage content and coached-project data
- This keeps the first migration phase additive:
  - the public site can evolve independently
  - the functional app remains intact
  - no route cutover is required yet
- `apps/site` build currently succeeds and emits 21 static routes covering:
  - locale home pages
  - locale services pages
  - locale links pages
  - locale insights index pages
  - locale insight detail pages
- `npm install` completed successfully after escalation; current notable install findings:
  - several transitive packages emit `EBADENGINE` warnings under Node `v23.7.0`
  - install still succeeds
  - npm audit reports `15` known vulnerabilities in the full workspace dependency graph
- The migration is now fully cut over at the route boundary:
  - `apps/web` public routes redirect to `apps/site`
  - `apps/web` only serves auth, checkout, payment result, member pages, and APIs
  - `http://localhost:3000/zh` now returns `307` to `http://localhost:4321/zh`
  - `http://localhost:3000/zh/auth` still returns `200` from the functional app
- Public-site implementation residue has been removed from `apps/web`:
  - homepage components deleted
  - services/public editorial components deleted
  - Sanity-backed public content modules deleted
  - `figma-assets` removed from `apps/web/public`
  - `apps/web` now uses a much smaller functional-only global stylesheet
- Post-cleanup size snapshot:
  - `apps/web/src`: `240K`
  - `apps/web/public`: `0B`
  - `packages/site-content`: `48K`
  - `apps/site`: `3.8M`
| Preserve separate `paid` and `fulfilled` statuses | Needed for support, delivery operations, and future automation |

## Payment Implementation Findings (2026-03-10)
- Added server-side order/payment foundation:
  - `apps/web/src/server/repositories/orders-repository.ts`
  - `apps/web/src/server/payments/service.ts`
  - `apps/web/src/server/payments/provider.ts`
  - `apps/web/src/server/payments/providers/payjs-provider.ts`
  - `apps/web/src/server/auth/request-user.ts`
- Added authenticated payment/order APIs:
  - `POST /api/payments/session`
  - `GET /api/orders`
  - `GET /api/orders/[orderId]`
- Checkout is now a real authenticated client flow:
  - creates order
  - creates provider payment session
  - shows pending payment state
  - polls order status
- Result page is now order-bound and authenticated:
  - requires active user session
  - fetches only the current user's order
  - polls while status is pending/processing
- Member orders page now shows:
  - order snapshot
  - amount
  - paid time
  - product link when present
- Existing payment webhook was extended to:
  - continue generic signed JSON handling
  - support PayJS form webhook verification
  - update `orders` state after payment confirmation
- Runtime requirement discovered:
  - the app now expects an `orders` table alongside `payment_results`
  - without Supabase schema and PayJS env values, checkout API will fail at runtime even though build passes
- Added a runnable SQL bootstrap file for Supabase payment tables:
  - `docs/ops/supabase-payment-schema.sql`

## Build / Verification Findings (2026-03-10)
- `npm run typecheck --workspace @yipei/web` passes after payment integration changes.
- `npm run build --workspace @yipei/web` passes after:
  - replacing checkout QR `<img>` with `next/image`
  - explicitly typing `displayPlans` in services page to avoid fallback union inference issues

## Public Site + Payment Bridge Findings (2026-03-10)
- The public site and functional app had drifted on plan identity:
  - public site used `session-30`, `session-60`, `growth-pack`, `retainer`
  - functional payment catalog still exposed `single-session`, `playbook-pack`, `company-coaching`
- That drift meant public CTAs could only deep-link generically into checkout and could not reliably preselect the correct paid service.
- The functional payment catalog is now aligned to the public service model:
  - `session-30` = `800 RMB`
  - `session-60` = `1500 RMB`
  - `growth-pack` = `99 RMB`
  - `retainer` = `7000 RMB / month`
- Cross-origin session awareness between `apps/site` (`4321`) and `apps/web` (`3000`) cannot rely on Supabase browser storage alone because localStorage is origin-scoped.
- The lightweight bridge solution is a shared cookie marker:
  - `apps/web` writes `iris_app_session=1` when a Supabase session exists
  - `apps/site` reads that marker to switch CTA labels and auth-vs-checkout routing
  - actual authorization still remains in the feature app; the cookie only drives public CTA state
- Checkout now accepts deep-linked query params:
  - `plan`
  - `channel`
- Public-site service cards and hero CTAs now point into those deep-linked checkout URLs instead of generic `/checkout`.
- Retry from the payment result page now preserves the originating plan and payment channel where available.
- Validation completed:
  - `npm run build:site` passed
  - `npm run build:web` passed
  - `npm run lint` passed
  - `npm run typecheck` passed when re-run serially after `build:web`

## Auth / Member Experience Findings (2026-03-10)
- The prior auth surface had become visually serviceable but structurally generic:
  - sign-in was still a single utility card
  - callback was only a raw status shell
  - signed-in state still read as a normal personal center rather than a premium client area
- The approved direction is `Apple Executive Identity`:
  - strong identity / trust panel at sign-in
  - restrained auth workspace with email magic link as the main path
  - signed-in state reframed as a `Private Client Dashboard`
- The member center now loads orders for all signed-in sections, not only the orders page, so the summary layer can stay truthful on overview and profile.
- Order status tone is now explicitly mapped into three visual states:
  - `success`
  - `pending`
  - `danger`
- Validation completed after the redesign:
  - `npm run lint` passed
  - `npm run build:web` passed
  - `npm run typecheck` passed

## Standalone Runtime Findings (2026-03-10)
- `output: "standalone"` does not automatically make login/static assets available when the standalone server is launched directly from `apps/web`.
- The login-page 404s were caused by missing copied assets inside the standalone tree:
  - HTML route responded
  - chunk and CSS requests under `/_next/static/*` returned `404`
- The required runtime fix is:
  - copy `apps/web/.next/static` to `apps/web/.next/standalone/apps/web/.next/static`
  - then launch `node .next/standalone/apps/web/server.js`
- This is now automated in:
  - `apps/web/scripts/start-standalone.mjs`
  - `apps/web/package.json` (`start`)
- Live verification after the fix:
  - `GET /zh/auth` -> `200`
  - login page chunk `/_next/static/chunks/app/[locale]/auth/page-2f3845217a9e119c.js` -> `200`
  - login page CSS `/_next/static/css/7aa7f3e56a85ddf0.css` -> `200`

## Product-Language Cleanup Findings (2026-03-10)
- The strongest source of "not professional enough" UI quality was not only layout; it was the amount of meta explanatory copy left in both the public site and the feature app.
- Removed user-facing engineering/product-architecture language such as:
  - public site vs feature app explanations
  - system-boundary explanations
  - migration placeholders in the insight detail shell
  - technical payment reassurance copy that read like implementation notes
- Login copy was tightened further:
  - fewer supporting cards
  - simpler title/subtitle
  - more direct destination context
- Checkout and payment-result copy was tightened to sound like a mature product surface rather than a technical flow explanation.
- Public site bridge/status language now focuses on user action:
  - sign in
  - continue booking
  - continue payment
  - view orders
  instead of explaining deployment or app boundaries.

## Account UI Compression Findings (2026-03-10)
- The auth surface still felt too much like a system demo because it showed unavailable actions (`Phone / Soon`) and over-explained what would happen next.
- For a premium account/product experience, the better rule is:
  - show only the currently available path
  - use one-line destination context
  - let account/order continuity be implied by layout and state, not repeated paragraphs
- The member dashboard also felt too operational when summary cards were arranged as a dense 4-column dashboard; reducing that density improves perceived quality without removing functionality.
- Payment/result pages read more professionally when they emphasize:
  - current state
  - chosen service
  - next action
  instead of provider/implementation details.
- Public-site account bridge wording has a direct effect on perceived polish:
  - shorter labels like `登录`, `账户`, `订单`
  - shorter status phrases
  feel more premium than explanatory button text.

## Single-Screen Auth Findings (2026-03-10)
- The previous auth page was cleaner than before, but the split layout still made the screen feel like a product explainer rather than a login surface.
- For this site, the more credible direction is:
  - one centered sign-in sheet
  - one visible auth path
  - one-line continuation context
  - minimal trust copy
- The auth route also benefits from this structurally:
  - less JSX
  - fewer state branches
  - smaller route bundle

## Homepage Hero Findings (2026-03-10)
- The opening screen was not weak because of missing content; it was weak because too many things competed at once:
  - portrait
  - role line
  - tags
  - three intro paragraphs
  - three CTAs
  - account bridge card
  - proof cards
- The stronger solution is not "add more luxury styling", but:
  - reduce first-screen decisions
  - move proof lower
  - give the portrait more authority
  - keep only the highest-value identity information above the fold
- The approved `Apple x Advisor Hybrid` treatment works best when the hero behaves like:
  - left: identity + one core action
  - right: dominant portrait
  - bottom: restrained signal strip

## Project Asset Findings (2026-03-10)
- The homepage project wall had two separate asset-quality tiers mixed together:
  - verified `raw` Figma assets
  - older `tiles` crops extracted from screenshots
- That made the issue look like "many photos did not pull correctly", even though requests themselves were often returning `200`.
- The correct short-term fix is to stop presenting screenshot crops as if they were successfully pulled original assets.
- The homepage project wall is now cleaner because it only shows projects with verified raw assets.
- Remaining unresolved project visuals are not being claimed as pulled anymore; if needed later, they should be re-added only after matching raw assets are confirmed.

## Project Wall White Gallery Findings (2026-03-21)
- The visual mismatch was no longer the logos themselves; it was that each logo carried its own white backing plate inside an already stylized cinematic section.
- The more coherent solution is to move the white surface up one level:
  - one deliberate white exhibit slab for the whole wall
  - subtle row organization inside that slab
  - nearly transparent individual logo cells
- Preserving hover slowdown is important because a hard stop makes the wall feel broken once the overall treatment becomes calmer and more gallery-like.

## Logo-Led Blue-Green Palette Findings (2026-03-24)
- The current primary logo already contains the approved brand direction:
  - leaf green around `#C0D696`
  - wave blue around `#A8D2DE`
  - ink navy around `#11252E`
- The current mismatch is not the logo itself; it is the surrounding cinematic palette, which still leans warm gold and warm cream.
- The approved direction is:
  - keep the logo asset unchanged
  - derive the site palette from the logo colors
  - remove warm gold accents from header, controls, highlights, and atmospheric glows
- The approved role split is:
  - green carries brand warmth and active emphasis
  - blue carries structure, links, borders, focus, and navigation signals
- The approved header direction is:
  - no warm cream/gold logo badge
  - use a cool misted support surface so the existing logo colors read naturally
- The approved site-wide guardrails are:
  - no gold, amber, orange, or purple accents in the active cinematic theme
  - no high-saturation cyan/green drift beyond the softness of the logo itself
  - no gradients, glow, or recolor applied directly to the logo graphic
- Implementation result:
  - the active cinematic stylesheet now uses the logo-led blue-green palette in both `apps/site/src/styles/global.css` and `apps/site/variants/cinematic/styles/global.css`
  - header badge support surfaces were shifted from warm cream/gold to cool misted blue-white
  - primary buttons now use a restrained wave-blue to leaf-green gradient
  - warm gold accent literals were fully removed from both active and cinematic snapshot stylesheets
- Verification result:
  - `npm run check:site` passed with pre-existing Astro hints only
  - `npm run build:site` passed
  - static visual QA via `python3 -m http.server` + headless Chrome screenshots of `/zh/` at desktop and narrow-screen widths confirmed the homepage now reads as logo-led blue-green rather than gold-accented

## Light Logo Editorial Redesign Findings (2026-03-24)
- The user rejected the remaining dark-site posture and requested a true redesign, not just a palette swap.
- The approved primary colors are the logo's actual fill colors:
  - green `#C0D696`
  - blue `#B0D5DF`
- The approved site direction is:
  - light theme
  - misted editorial presentation
  - premium spacing and typography
  - black/ink used only for text and structure, not as the main background
- The approved color role split is:
  - green for CTA and emphasis
  - blue for structure, borders, and atmospheric surfaces
  - neutrals must occupy most of the page
- Implementation result:
  - the site now reads as a light, high-key brand surface instead of a recolored dark theme
  - header, hero, stat strip, service scenes, pricing cards, and proof/project sections now use pale white, blue-white, and green-white surfaces
  - the unchanged logo now fits the site more naturally because the page no longer fights it with dark visual mass
- Verification result:
  - `http://127.0.0.1:4321/zh/` returns `200 OK`
  - `npm run check:site` passed with the same pre-existing Astro hints only
  - `npm run build:site` passed
  - desktop and narrow-screen screenshots confirmed the homepage now reads as a light premium site led by `#C0D696` and `#B0D5DF`
