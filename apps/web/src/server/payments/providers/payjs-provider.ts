import "server-only";

import { serverEnv } from "@/lib/env/server";
import { createPayjsSignature } from "@/server/payments/signature";
import type { CreatePaymentSessionInput, PaymentProvider, PaymentSessionResult } from "@/server/payments/provider";

type PayjsResponse = Record<string, unknown>;

function requireString(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function pickString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

async function postPayjsForm(url: string, payload: Record<string, string | number>) {
  const body = new URLSearchParams();
  Object.entries(payload).forEach(([key, value]) => {
    body.set(key, String(value));
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
    cache: "no-store",
  });

  const text = await response.text();

  try {
    return JSON.parse(text) as PayjsResponse;
  } catch {
    throw new Error(`PayJS returned a non-JSON response: ${text.slice(0, 120)}`);
  }
}

export class PayjsProvider implements PaymentProvider {
  async createPaymentSession(input: CreatePaymentSessionInput): Promise<PaymentSessionResult> {
    const key = requireString(serverEnv.PAYJS_KEY, "PAYJS_KEY");
    const notifyUrl = new URL("/api/webhooks/payment", serverEnv.SITE_URL).toString();
    const callbackUrl = new URL(`/${input.locale}/payment/result?order=${encodeURIComponent(input.orderId)}`, serverEnv.SITE_URL).toString();

    if (input.paymentChannel === "wechat") {
      const mchid = requireString(serverEnv.PAYJS_MCHID, "PAYJS_MCHID");
      const payload: Record<string, string | number> = {
        mchid,
        total_fee: input.amountCny,
        out_trade_no: input.orderId,
        body: input.planName,
        attach: input.userId,
        notify_url: notifyUrl,
      };
      payload.sign = createPayjsSignature(payload, key);

      const result = await postPayjsForm("https://payjs.cn/api/native", payload);
      const returnCode = Number(result.return_code ?? 0);

      if (returnCode !== 1) {
        throw new Error(pickString(result.return_msg) ?? pickString(result.msg) ?? "Failed to create PayJS payment");
      }

      return {
        paymentProvider: "payjs",
        paymentChannel: "wechat",
        displayMode: "qr",
        paymentUrl: pickString(result.code_url),
        qrCodeUrl: pickString(result.qrcode),
        providerOrderId: pickString(result.payjs_order_id),
        expiresAt: null,
      };
    }

    const mchid = serverEnv.PAYJS_ALIPAY_MCHID;
    if (!mchid || !mchid.startsWith("2088")) {
      throw new Error("Alipay channel is not configured yet.");
    }

    const payload: Record<string, string | number> = {
      mchid,
      total_fee: input.amountCny,
      out_trade_no: input.orderId,
      body: input.planName,
      attach: input.userId,
      notify_url: notifyUrl,
      callback_url: callbackUrl,
      auto: 1,
    };
    payload.sign = createPayjsSignature(payload, key);

    const paymentUrl = `https://payjs.cn/api/cashier?${new URLSearchParams(
      Object.entries(payload).reduce<Record<string, string>>((acc, [entryKey, value]) => {
        acc[entryKey] = String(value);
        return acc;
      }, {}),
    ).toString()}`;

    return {
      paymentProvider: "payjs",
      paymentChannel: "alipay",
      displayMode: "redirect",
      paymentUrl,
      qrCodeUrl: null,
      providerOrderId: input.orderId,
      expiresAt: null,
    };
  }
}
