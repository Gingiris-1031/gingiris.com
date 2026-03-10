import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { getAuthenticatedUserFromRequest } from "@/server/auth/request-user";
import { getOrderForUser } from "@/server/repositories/orders-repository";

export async function GET(
  request: Request,
  context: { params: Promise<{ orderId: string }> },
) {
  const user = await getAuthenticatedUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  const { orderId } = await context.params;

  try {
    const order = await getOrderForUser(orderId, user.id);
    if (!order) {
      return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    logger.error("order_get_failed", {
      userId: user.id,
      orderId,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json({ ok: false, reason: "order_get_failed" }, { status: 500 });
  }
}
