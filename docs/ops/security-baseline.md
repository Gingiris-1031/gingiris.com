# Security Baseline (M0)

## Studio Exposure
- `/studio` must not be publicly open.
- Minimum protection:
  - HTTP Basic Auth (current default), or
  - IP allowlist.

## Webhook Rules
- Webhook routes under `/api/webhooks/*`:
  - must validate signature,
  - must NOT rely on user session auth,
  - must log raw payload metadata,
  - must enforce idempotency on provider event id.

## Admin Access Pattern
- Admin review operations go through server-controlled APIs only.
- Do not grant admin data access directly from browser client.

## Secrets
- Never commit real keys.
- Keep prod/staging keys isolated.
