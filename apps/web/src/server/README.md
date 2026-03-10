# Server Layer

This folder is intentionally server-only.

- `repositories/`: data access adapters
- `services/`: use cases / orchestration
- `policies/`: authz rules
- `validators/`: input contracts

Admin review and webhook processing must stay in server-side handlers.
