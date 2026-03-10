# Auth Identity Redesign

Date: 2026-03-10

## Goal

Upgrade the functional app's sign-in and signed-in experience so it feels like a premium private-client product instead of a generic utility surface.

The target tone is:

- high-status and trustworthy
- Apple-like order and restraint
- efficient to use
- visually aligned with the upgraded public site

## Scope

The redesign covers:

- `apps/web/src/components/auth/quick-auth-panel.tsx`
- `apps/web/src/components/auth/auth-callback-panel.tsx`
- `apps/web/src/components/auth/member-center-panel.tsx`
- supporting auth/member styles in `apps/web/src/app/globals.css`

The redesign does not change:

- Supabase auth behavior
- auth routes
- order APIs
- payment creation or result APIs

## Direction

### Sign-in

The sign-in page becomes an identity-led entry surface:

- left column: identity, trust, status, and what the account unlocks
- right column: minimal auth actions with email as primary
- phone auth remains visible but clearly secondary / not-yet-live

This should feel closer to a premium account portal than a form page.

### Callback

The callback screen becomes part of the same flow rather than a raw state screen:

- cleaner verification card
- stronger progress and success messaging
- same design language as sign-in

### Signed-in

The member area becomes a `Private Client Dashboard`:

- hero summary with account identity and current section
- tighter navigation between overview / orders / profile
- higher-signal summary cards
- more premium order cards with clearer status and action hierarchy

## UX Intent

- reduce noise and visual fragmentation
- make the logged-in state feel valuable
- keep actions obvious
- preserve fast scanning on mobile

## Implementation Notes

- prefer structural changes inside the existing client components rather than introducing a new heavy abstraction layer
- keep copy high-signal and avoid marketing fluff inside the app
- use CSS to create hierarchy, material quality, and spatial order without adding unnecessary runtime complexity
