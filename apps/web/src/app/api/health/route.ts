import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server";

export async function GET() {
  const supabaseConfigured = Boolean(
    serverEnv.NEXT_PUBLIC_SUPABASE_URL && serverEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: serverEnv.APP_ENV,
    siteUrl: serverEnv.SITE_URL,
    services: {
      supabaseAuth: supabaseConfigured,
      paymentWebhookSecret: Boolean(serverEnv.PAYMENT_WEBHOOK_SECRET),
    },
  });
}
