import { NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { isLocale } from "@/modules/i18n/config";
import { createOrderAndPaymentSession } from "@/server/payments/service";
import { getAuthenticatedUserFromRequest } from "@/server/auth/request-user";

const bodySchema = z.object({
  locale: z.string(),
  planCode: z.string().min(1),
  paymentChannel: z.enum(["wechat", "alipay"]),
});

export async function POST(request: Request) {
  const user = await getAuthenticatedUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  let parsedBody: z.infer<typeof bodySchema>;
  try {
    parsedBody = bodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_payload" }, { status: 400 });
  }

  if (!isLocale(parsedBody.locale)) {
    return NextResponse.json({ ok: false, reason: "invalid_locale" }, { status: 400 });
  }

  try {
    const session = await createOrderAndPaymentSession({
      userId: user.id,
      locale: parsedBody.locale,
      planCode: parsedBody.planCode,
      paymentChannel: parsedBody.paymentChannel,
    });

    return NextResponse.json({ ok: true, session });
  } catch (error) {
    logger.error("payment_session_create_failed", {
      userId: user.id,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        ok: false,
        reason: "create_payment_failed",
        message: error instanceof Error ? error.message : "Unable to create payment session.",
      },
      { status: 500 },
    );
  }
}
