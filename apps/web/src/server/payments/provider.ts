import "server-only";

import type { Locale } from "@/modules/i18n/config";
import type { PaymentChannel } from "@/modules/payments/catalog";

export type CreatePaymentSessionInput = {
  orderId: string;
  locale: Locale;
  planName: string;
  amountCny: number;
  paymentChannel: PaymentChannel;
  userId: string;
};

export type PaymentSessionResult = {
  paymentProvider: string;
  paymentChannel: PaymentChannel;
  displayMode: "qr" | "redirect";
  paymentUrl: string | null;
  qrCodeUrl: string | null;
  providerOrderId: string | null;
  expiresAt: string | null;
};

export interface PaymentProvider {
  createPaymentSession(input: CreatePaymentSessionInput): Promise<PaymentSessionResult>;
}
