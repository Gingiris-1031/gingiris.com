import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { listOrdersForUser } from "@/server/repositories/orders-repository";
import { getAuthenticatedUserFromRequest } from "@/server/auth/request-user";

export async function GET(request: Request) {
  const user = await getAuthenticatedUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }

  try {
    const orders = await listOrdersForUser(user.id);
    return NextResponse.json({ ok: true, orders });
  } catch (error) {
    logger.error("orders_list_failed", {
      userId: user.id,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ ok: false, reason: "orders_list_failed" }, { status: 500 });
  }
}
