import "server-only";

import type { Locale } from "@/modules/i18n/config";
import { getServicePlanByCode, type PaymentChannel } from "@/modules/payments/catalog";
import { insertOrder, updateOrderAfterPaymentSession } from "@/server/repositories/orders-repository";
import { PayjsProvider } from "@/server/payments/providers/payjs-provider";

function createOrderId() {
  return `ord_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function createOrderAndPaymentSession(input: {
  userId: string;
  locale: Locale;
  planCode: string;
  paymentChannel: PaymentChannel;
}) {
  const plan = getServicePlanByCode(input.planCode);
  if (!plan) {
    throw new Error("Selected plan is invalid.");
  }

  const orderId = createOrderId();
  const paymentProvider = new PayjsProvider();

  await insertOrder({
    id: orderId,
    user_id: input.userId,
    locale: input.locale,
    plan_code: plan.code,
    plan_name_snapshot: plan.name[input.locale],
    amount_cny: plan.amountCny,
    currency: "CNY",
    payment_channel: input.paymentChannel,
    payment_provider: "payjs",
    status: "pending_payment",
    delivery_notes: plan.deliveryNote[input.locale],
  });

  const session = await paymentProvider.createPaymentSession({
    orderId,
    locale: input.locale,
    planName: plan.name[input.locale],
    amountCny: plan.amountCny,
    paymentChannel: input.paymentChannel,
    userId: input.userId,
  });

  await updateOrderAfterPaymentSession(orderId, {
    provider_order_id: session.providerOrderId,
    payment_provider: session.paymentProvider,
  });

  return {
    orderId,
    status: "pending_payment" as const,
    paymentChannel: session.paymentChannel,
    paymentProvider: session.paymentProvider,
    displayMode: session.displayMode,
    paymentUrl: session.paymentUrl,
    qrCodeUrl: session.qrCodeUrl,
    expiresAt: session.expiresAt,
  };
}
