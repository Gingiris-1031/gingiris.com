# 2026-03-10 Fast Login with Supabase Auth

## Goal
Build a production-ready fast login framework for the web app with Supabase Auth, prioritizing phone-login presentation while shipping a working email fallback first.

## Confirmed Scope
- Phone login is visually prioritized on the login page.
- SMS verification is not enabled yet in Supabase, so the phone CTA stays visible but disabled with an "coming soon" label.
- Email login is fully usable at launch.
- Email login supports both Magic Link and Email OTP.
- Privacy policy and login purpose must remain visible on the page.
- The experience must stay responsive and readable in mobile WeChat browser scenarios.

## Chosen Approach
Use direct frontend integration with Supabase Auth.

### Why
- Fastest path to a usable production login.
- Current project already has a browser Supabase client wrapper.
- Auth callback and member-center gating can be implemented without adding a new server auth layer.

## Architecture
- `/{locale}/auth`
  - Client-rendered dual-mode login UI.
  - Phone card is primary in layout but disabled by feature flag.
  - Email card supports Magic Link and Email OTP.
- `/{locale}/auth/callback`
  - Handles Supabase callback completion.
  - Resolves errors into friendly copy.
  - Redirects to safe in-site `next` destination or `/{locale}/me`.
- `/{locale}/me`, `/{locale}/me/orders`, `/{locale}/me/profile`
  - Protected at the client layer for this phase.
  - Signed-out users are routed into the auth flow with preserved `next`.

## Supabase Integration
- Use browser client only.
- Email send step:
  - `supabase.auth.signInWithOtp({ email, options })`
- Email OTP verify step:
  - `supabase.auth.verifyOtp({ email, token, type: "email" })`
- Magic-link callback:
  - Prefer PKCE-style code exchange when `code` is present.
  - Fallback to checking an existing session for compatibility.

## Security Boundaries
- Only public anon key is used in the browser.
- Service-role key stays server-only and unused in this flow.
- `next` is sanitized to local paths only.
- Raw Supabase errors are mapped to user-friendly messages.
- Phone auth remains feature-gated until SMS provider setup is complete.

## UX Notes
- Mobile-first CTA sizing and one-column fallback.
- Inline status messaging instead of browser notifications.
- Clear success states for "email sent", "code verified", and callback completion.
- Visible privacy notice under the form area.

## Verification Plan
- Check Magic Link send flow.
- Check Email OTP request and verification flow.
- Check callback success, expired link, invalid token, and no-session scenarios.
- Check signed-out access to member pages.
- Run workspace web typecheck and build.
