# Site Theme Switch (Legacy vs Cinematic) Design

Date: 2026-03-11

## Goal
Preserve the previous warm premium UI as a reusable legacy theme while keeping the new cinematic UI, and enable one-command local switching between them for the marketing site (`apps/site`).

## Scope
- Applies to `apps/site` only.
- Pages: `/{locale}`, `/{locale}/services`, `/{locale}/insights`, `/{locale}/insights/[slug]`, `/{locale}/links`.
- Shared shell: header, footer, layout, and global styles.

## Requirements
- Build-time theme switching via local scripts.
- Both themes must be fully preserved and independently runnable.
- No runtime toggle in production.
- Keep data and logic layers shared (content modules and link helpers stay in `src/lib` and `packages/site-content`).
- Main logo source location:
  - `/Users/hw/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wxid_gqud2wact5ta12_80ce/msg/file/2026-03/Gingiris logos`

## Approach (Approved)
### 1) Theme Snapshots
Store two full UI snapshots under:
```
apps/site/variants/
  legacy/
    pages/
    components/
    layouts/
    styles/global.css
  cinematic/
    pages/
    components/
    layouts/
    styles/global.css
```

`apps/site/src` always contains the **active** theme.

### 2) Switch Script
Add `scripts/switch-site-theme.mjs` to:
- Validate theme name (`legacy` or `cinematic`).
- Validate snapshot completeness (required subfolders + `styles/global.css`).
- Backup current `src` into its theme snapshot.
- Copy selected snapshot into `apps/site/src`.
- Record `apps/site/.active-theme`.

### 3) NPM Scripts
Add scripts for one-command switching:
- `npm run theme:legacy` → switch to legacy
- `npm run theme:cinematic` → switch to cinematic
- Optional wrappers:
  - `npm run dev:site:legacy` (switch then `npm run dev:site`)
  - `npm run build:site:legacy` (switch then `npm run build:site`)

### 4) Logo Handling
- Copy the chosen primary logo file from the provided folder into:
  - `apps/site/public/brand/`
- Standardize filename for use in both themes, e.g.:
  - `logo-primary.svg` and/or `logo-mark.svg`
- If legacy must retain a different logo, keep `logo-legacy.*` and reference it only in legacy theme header.

## Migration Plan
1. Snapshot current cinematic UI into `variants/cinematic`.
2. Restore legacy UI into `variants/legacy` from a local source/backup.
3. Run switch script to activate desired theme.

## Verification
- Switch to each theme and run `npm run build:site`.
- Quick visual QA on:
  - `/{locale}`
  - `/{locale}/services`
  - `/{locale}/insights`
  - `/{locale}/links`
  - `/{locale}/insights/[slug]`

## Risks / Open Items
- Legacy UI source availability: must be provided from a local backup if not in repo history.
- Logo selection: choose the definitive primary logo file from the provided folder.
