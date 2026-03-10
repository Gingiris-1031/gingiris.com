import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";
import { logger } from "@/lib/logger";
import { insertPaymentResult } from "@/server/repositories/payment-results-repository";
import { updateOrderPaymentState } from "@/server/repositories/orders-repository";
import { verifyPayjsSignature } from "@/server/payments/signature";
import { hasProcessedEvent, markEventProcessed } from "@/server/services/webhook-idempotency";

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  if (!secret || !signature) {
    return false;
  }

  const normalizedSignature = signature.startsWith("sha256=")
    ? signature.slice("sha256=".length)
    : signature;
  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (digest.length !== normalizedSignature.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(normalizedSignature));
}

function tryParseJson(rawBody: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(rawBody);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

function parseFormEncoded(rawBody: string): Record<string, string> | null {
  const params = new URLSearchParams(rawBody);
  const entries = Array.from(params.entries());
  if (entries.length === 0) {
    return null;
  }

  return entries.reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}

function pickString(
  source: Record<string, unknown>,
  keys: readonly string[],
): string | null {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }
  return null;
}

function canPersistWebhook(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function verifyPayjsWebhook(payload: Record<string, string>) {
  if (!serverEnv.PAYJS_KEY) {
    return false;
  }

  return verifyPayjsSignature(payload, serverEnv.PAYJS_KEY, payload.sign);
}

function buildPayjsEventId(payload: Record<string, string>) {
  return payload.payjs_order_id || payload.transaction_id || `${payload.out_trade_no}-${payload.time_end || "notify"}`;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const contentType = request.headers.get("content-type") || "";
  const signature = request.headers.get("x-webhook-signature");
  const requestedProvider = new URL(request.url).searchParams.get("provider");

  const payjsPayload = contentType.includes("application/x-www-form-urlencoded")
    ? parseFormEncoded(rawBody)
    : null;

  if (payjsPayload || requestedProvider === "payjs") {
    if (!payjsPayload || !verifyPayjsWebhook(payjsPayload)) {
      logger.warn("payment_webhook_invalid_payjs_signature", {
        provider: "payjs",
      });
      return new NextResponse("fail", { status: 401 });
    }

    const providerEventId = buildPayjsEventId(payjsPayload);
    const orderId = payjsPayload.out_trade_no;
    const providerTradeNo = payjsPayload.transaction_id || payjsPayload.payjs_order_id || null;
    const paidAt = payjsPayload.time_end || new Date().toISOString();
    const status = payjsPayload.return_code === "1" ? "paid" : "failed";

    if (!providerEventId || !orderId) {
      logger.warn("payment_webhook_missing_payjs_fields", {
        providerEventIdPresent: Boolean(providerEventId),
        orderIdPresent: Boolean(orderId),
      });
      return new NextResponse("fail", { status: 400 });
    }

    if (hasProcessedEvent(providerEventId)) {
      return new NextResponse("success", { status: 200 });
    }

    if (canPersistWebhook()) {
      try {
        const result = await insertPaymentResult({
          order_id: orderId,
          provider: "payjs",
          provider_event_id: providerEventId,
          provider_trade_no: providerTradeNo,
          status,
          raw_payload: payjsPayload,
          confirmed_at: paidAt,
        });

        if (result !== "duplicate") {
          await updateOrderPaymentState(orderId, {
            status,
            payment_provider: "payjs",
            provider_order_id: payjsPayload.payjs_order_id || null,
            provider_trade_no: providerTradeNo,
            paid_at: status === "paid" ? paidAt : null,
          });
        }
      } catch (error) {
        logger.error("payment_webhook_payjs_persistence_failed", {
          providerEventId,
          orderId,
          error: error instanceof Error ? error.message : String(error),
        });
        return new NextResponse("fail", { status: 500 });
      }
    }

    markEventProcessed(providerEventId);
    logger.info("payment_webhook_payjs_processed", {
      providerEventId,
      orderId,
      status,
    });

    return new NextResponse("success", { status: 200 });
  }

  // Webhook route must never depend on user session auth.
  if (!verifySignature(rawBody, signature)) {
    logger.warn("payment_webhook_invalid_signature", { signaturePresent: Boolean(signature) });
    return NextResponse.json({ ok: false, reason: "invalid_signature" }, { status: 401 });
  }

  const payload = tryParseJson(rawBody);
  if (!payload) {
    logger.warn("payment_webhook_invalid_payload", { bytes: rawBody.length });
    return NextResponse.json({ ok: false, reason: "invalid_payload" }, { status: 400 });
  }

  const provider = request.headers.get("x-payment-provider") || pickString(payload, [
    "provider",
    "channel",
  ]) || "unknown";
  const providerEventId = pickString(payload, [
    "event_id",
    "eventId",
    "id",
    "notify_id",
  ]);
  const orderId = pickString(payload, [
    "order_id",
    "orderId",
    "out_trade_no",
    "merchant_order_no",
  ]);
  const providerTradeNo = pickString(payload, [
    "provider_trade_no",
    "trade_no",
    "transaction_id",
  ]);
  const status = pickString(payload, ["status", "trade_status", "event_type"]) || "pending";
  const confirmedAt =
    pickString(payload, ["confirmed_at", "paid_at", "gmt_payment"]) || new Date().toISOString();

  if (!providerEventId || !orderId) {
    logger.warn("payment_webhook_missing_fields", {
      providerEventIdPresent: Boolean(providerEventId),
      orderIdPresent: Boolean(orderId),
    });
    return NextResponse.json({ ok: false, reason: "missing_event_fields" }, { status: 400 });
  }

  if (hasProcessedEvent(providerEventId)) {
    logger.info("payment_webhook_duplicate_memory", { providerEventId, orderId });
    return NextResponse.json({ ok: true, duplicate: true });
  }

  if (canPersistWebhook()) {
    try {
      const result = await insertPaymentResult({
        order_id: orderId,
        provider,
        provider_event_id: providerEventId,
        provider_trade_no: providerTradeNo,
        status,
        raw_payload: payload,
        confirmed_at: confirmedAt,
      });

      if (result === "duplicate") {
        markEventProcessed(providerEventId);
        logger.info("payment_webhook_duplicate_db", { providerEventId, orderId });
        return NextResponse.json({ ok: true, duplicate: true });
      }

      await updateOrderPaymentState(orderId, {
        status: status === "paid" ? "paid" : "processing",
        payment_provider: provider,
        provider_trade_no: providerTradeNo,
        paid_at: status === "paid" ? confirmedAt : null,
      });
    } catch (error) {
      logger.error("payment_webhook_persistence_failed", {
        providerEventId,
        orderId,
        error: error instanceof Error ? error.message : String(error),
      });
      return NextResponse.json({ ok: false, reason: "persistence_failed" }, { status: 500 });
    }
  } else {
    logger.warn("payment_webhook_persistence_disabled", {
      providerEventId,
      orderId,
    });
    logger.info("payment_webhook_raw_payload", {
      providerEventId,
      orderId,
      rawBody,
    });
  }

  markEventProcessed(providerEventId);
  logger.info("payment_webhook_processed", { providerEventId, orderId, provider, status });

  return NextResponse.json({ ok: true });
}
