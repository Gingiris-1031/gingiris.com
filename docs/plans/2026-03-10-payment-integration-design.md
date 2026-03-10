# 2026-03-10 Payment Integration Design

## Context
- The web app already has:
  - Supabase auth wiring
  - a signed payment webhook route at `POST /api/webhooks/payment`
  - `payment_results` persistence baseline
- The current gaps are:
  - no real order creation flow
  - no provider abstraction for payment initiation
  - no authenticated order history view
  - no real payment result rendering

## Goals
- Launch a real payment flow for paid services.
- Use `PayJS` first while preserving a clean path to future native WeChat Pay and Alipay integrations.
- Let users see their own purchases and order status after payment.
- Persist payment state and transaction evidence in Supabase for operations and support.
- Keep the checkout experience simple, trustworthy, and localized.

## Non-Goals
- Implement native WeChat Pay or Alipay direct integration in this milestone.
- Implement automated fulfillment generation in this milestone.
- Expose public unauthenticated order lookups.

## Selected Approach
Use a `payment adapter layer` with `PayJS` as the first provider implementation.

Why:
- Faster to launch than dual native integrations.
- Avoids hard-coding PayJS details into the checkout UI and order lifecycle.
- Keeps the payment domain extensible for later `wechat-native` and `alipay-native` providers.

## Alternatives Considered

### 1. PayJS direct coupling
- Pros:
  - smallest initial implementation
  - quickest time to first payment
- Cons:
  - order, status, and result logic would need refactoring later
  - future native provider support becomes migration work instead of extension work

### 2. Adapter layer with PayJS first
- Pros:
  - balanced delivery speed and extensibility
  - one stable order/payment lifecycle for all future providers
- Cons:
  - slightly more backend structure up front

### 3. PayJS + native direct integrations in the same milestone
- Pros:
  - maximum flexibility on day one
- Cons:
  - too much scope for current repo stage
  - heavier test matrix and compliance surface

## Architecture

### User Flow
1. User signs in.
2. User opens `/{locale}/checkout`.
3. User reviews service summary and chooses `wechat` or `alipay`.
4. Frontend submits to a server-side create-order-and-pay endpoint.
5. Server creates an `orders` record with `pending_payment`.
6. Server calls `PaymentProvider.createPaymentSession(...)`.
7. `PayJSProvider` returns a normalized payment session payload.
8. Frontend shows QR or redirects depending on device/channel.
9. Frontend polls order status while webhook confirmation is pending.
10. Webhook verifies signature, stores payment evidence, updates order status.
11. Frontend transitions to a secure result page.
12. User can later view the same order under `/{locale}/me/orders`.

### Service Boundaries
- `checkout UI`
  - collects selection and initiates payment
  - never handles merchant secrets
- `order service`
  - creates internal order record
  - enforces user ownership and amount snapshotting
- `payment provider adapter`
  - standardizes provider I/O
  - first implementation: `PayJSProvider`
- `webhook processor`
  - verifies authenticity
  - enforces idempotency
  - updates transactional state
- `orders pages`
  - only render data the authenticated user owns

## Data Model

### `orders`
- `id`
- `user_id`
- `locale`
- `plan_code`
- `plan_name_snapshot`
- `amount_cny`
- `currency`
- `payment_channel` (`wechat` | `alipay`)
- `payment_provider` (`payjs` initially)
- `status` (`pending_payment` | `processing` | `paid` | `failed` | `cancelled` | `fulfilled`)
- `provider_order_id`
- `provider_trade_no`
- `product_link`
- `delivery_notes`
- `paid_at`
- `fulfilled_at`
- `created_at`
- `updated_at`

### `payment_results`
Keep the existing table and persistence baseline, but ensure it is explicitly tied to the internal order id and stores:
- provider name
- provider event id
- provider trade number
- normalized status
- raw payload
- confirmed timestamp

## Status Model
- `pending_payment`
  - order created, waiting for user payment
- `processing`
  - optional transient state while provider result is being confirmed
- `paid`
  - payment confirmed
- `failed`
  - payment attempt failed or provider returned failure
- `cancelled`
  - user or provider cancelled before payment completion
- `fulfilled`
  - paid order with delivery completed

Rationale:
- separates money movement from product delivery
- allows support to distinguish payment success from operational completion

## API Design

### Create Order + Payment Session
Server route to add:
- purpose:
  - validate user session
  - create order snapshot
  - call provider adapter
  - return standardized payment session data

Expected response shape:
- `orderId`
- `status`
- `paymentChannel`
- `paymentProvider`
- `displayMode` (`qr` | `redirect`)
- `paymentUrl`
- `qrCodeUrl`
- `expiresAt`

### Order Status Query
Server route to add:
- purpose:
  - allow authenticated frontend polling
  - return only current user's order

Expected response shape:
- `orderId`
- `status`
- `paidAt`
- `productLink`
- `deliveryNotes`

### Webhook Update
Existing route remains the entrypoint:
- continue signature verification
- continue idempotent event handling
- extend persistence to update `orders`

## Checkout UI Design

### Layout
- order summary card
- payment method selector
- primary payment action
- trust and support copy

### Interaction States
- idle:
  - show selected plan, amount, payment method
- submitting:
  - disable payment button
  - button copy: creating order / preparing payment
- awaiting payment:
  - show QR on desktop or redirect CTA on mobile
  - show order id and countdown/expiration if provider exposes it
  - start background polling
- confirmed:
  - redirect to result page or swap into success card
- failed:
  - keep order context and offer retry

### UX Requirements
- prominent primary CTA
- clear payment progress feedback
- friendly error copy
- explicit trust language
- localized Chinese-first copy with English parity

## Result Page Design
- Secure, order-bound rendering only.
- No open query-based lookup.
- States:
  - success
  - processing
  - failed/cancelled
- When available, show:
  - order id
  - payment time
  - product link
  - delivery note

## Orders Center Design
Upgrade `/{locale}/me/orders` from placeholder to real authenticated order history:
- list user's orders
- show status, amount, plan snapshot, payment time
- surface `product_link` when available
- provide re-entry to result detail for each order

## Security
- All payment creation and signing happen server-side.
- Merchant secrets never reach the browser.
- Webhook signature verification remains mandatory.
- Webhook processing remains idempotent.
- Order queries must be scoped to authenticated user ownership.
- Result page must not trust raw query strings as source of truth.

## Compliance Baseline
- Store only necessary transaction metadata.
- Do not store card or bank-equivalent sensitive payment instruments in app tables.
- Add visible privacy/support/refund notice entry points around checkout and orders.
- Retain raw provider payloads only for audit/support needs.

## Documentation / Provider References
When implementation starts, attach verified current documentation links for:
- PayJS
- WeChat Pay
- Alipay Open Platform

Note:
- exact URLs were not added in this design step because network verification was not available in the local environment
- these links should be validated at implementation time, not guessed from memory

## Implementation Boundaries For Next Step
- build order table/repository/service
- add provider adapter interface + `PayJSProvider`
- wire real checkout interaction
- wire secure result page + orders page
- extend webhook to update order state
- add tests for state transitions and ownership checks

## Open Questions
- Final plan catalog source: Sanity snapshots only or mixed static+CMS source?
- Should `processing` be persisted or derived purely in UI while waiting for webhook?
- Should product links be manually filled by admin first or also support automatic fulfillment later?

## Approval
Approved by user on 2026-03-10 for implementation planning.
