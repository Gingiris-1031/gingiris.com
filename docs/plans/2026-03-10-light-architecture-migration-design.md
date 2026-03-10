# 2026-03-10 Lightweight Architecture Migration Design

## Context
- The current repo mixes two very different concerns in one runtime path:
  - a public brand site
  - a functional application with auth, checkout, payments, member pages, and APIs
- The deployment target is a small `2 core / 2 GB` server.
- The user wants:
  - a lighter public site
  - preserved product functionality
  - a cleaner base for future iterative design work
  - freedom to fully redesign the public-facing experience later

## Goal
Restructure the monorepo so the public site becomes static-first and lightweight while all existing functional capabilities remain available.

## Non-Goals
- Do not remove auth, payment, or member functionality.
- Do not migrate every internal feature out of `apps/web` in a single step.
- Do not redesign the public site visuals in this migration phase.

## Selected Approach
Adopt a split-app architecture:

- `apps/site`
  - new public site
  - Astro
  - static-first
  - owns: home, services, insights, links
- `apps/web`
  - existing functional app
  - Next.js
  - owns: auth, checkout, payment result, member center, APIs
- `apps/studio`
  - Sanity Studio
  - remains in the repo but should not be deployed on the small public server as a long-running service
- `packages/site-content`
  - shared public content and locale-safe public data structures

## Why This Approach
- Astro is a better fit for the marketing/public layer:
  - lower runtime cost
  - less client JS by default
  - simpler output for a small server
- Next.js remains the right place for user/session/payment flows:
  - server routes already exist
  - auth and payment boundaries stay stable
  - migration risk stays controlled
- Splitting the layers makes later visual redesign much easier because public design work stops competing with checkout/auth/member complexity.

## Alternatives Considered

### 1. Keep a single Next.js app and only trim code
- Pros:
  - smallest immediate migration
  - no new framework to introduce
- Cons:
  - public and functional concerns remain entangled
  - runtime stays heavier than necessary
  - future maintenance remains painful

### 2. Move everything to Astro
- Pros:
  - extremely light public output
- Cons:
  - poor fit for the existing auth/payment/member feature set
  - would force unnecessary business-logic migration

### 3. Split public and functional apps
- Pros:
  - best fit for the real workload split
  - best long-term maintainability
  - keeps feature risk contained
- Cons:
  - requires workspace expansion and migration plumbing

## Architecture

### Public Site
- Framework: Astro
- Output target: static files
- Responsibilities:
  - `/{locale}`
  - `/{locale}/services`
  - `/{locale}/insights`
  - `/{locale}/links`
- Data model:
  - prefer shared structured content from `packages/site-content`
  - optionally read CMS-backed public data later through framework-agnostic adapters

### Functional App
- Framework: Next.js
- Responsibilities:
  - `/{locale}/auth`
  - `/{locale}/auth/callback`
  - `/{locale}/checkout`
  - `/{locale}/payment/result`
  - `/{locale}/me/**`
  - `/api/**`
- This app remains the place for:
  - Supabase auth
  - order lifecycle
  - payment session creation
  - payment webhooks

### Shared Packages
- `packages/site-content`
  - locale config for the public site
  - public content objects
  - public project-wall data
  - light shared helper utilities
- Existing infra/config packages remain unchanged for now.

## Migration Strategy

### Phase 1
- Add `apps/site`
- Add `packages/site-content`
- Move public content into the shared package
- Build a first static version of:
  - home
  - services
  - insights
  - links
- Keep public pages in `apps/web` intact during the cutover period

### Phase 2
- Point public traffic to `apps/site`
- Keep `apps/web` for feature routes only
- Reduce duplicated public page logic in `apps/web`

### Phase 3
- Externalize or selectively consume CMS-backed content from shared adapters
- Redesign the public site on top of the lighter architecture

## Routing and Deployment

### Recommended Production Topology
- Nginx serves the static Astro output at the main domain.
- Requests for functional paths proxy to the Next app.

Example split:
- `/`, `/zh`, `/en`, `/zh/services`, `/zh/insights`, `/zh/links` -> Astro static output
- `/zh/auth`, `/zh/checkout`, `/zh/payment`, `/zh/me`, `/api/*` -> Next app

## Data Rules
- Public site content must not depend on browser session state.
- Public site modules should stay framework-agnostic where possible.
- Payment, auth, and order state remain server-owned inside `apps/web`.

## Performance Principles
- Static-first for public pages
- minimal JS on public routes
- no public-route dependency on member/payment code
- keep large build artifacts isolated to the feature app

## Verification Plan
- `apps/site` builds successfully
- `apps/web` still builds successfully
- root workspace scripts can build both apps independently
- migrated public pages render with locale-aware routes
- existing auth/payment/member flows remain untouched
