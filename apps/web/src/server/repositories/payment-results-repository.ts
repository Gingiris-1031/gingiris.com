import "server-only";
import { createServiceSupabaseClient } from "@/lib/supabase/server";

export type PaymentResultRecord = {
  order_id: string;
  provider: string;
  provider_event_id: string;
  provider_trade_no?: string | null;
  status: string;
  raw_payload: unknown;
  confirmed_at?: string | null;
};

export async function insertPaymentResult(
  record: PaymentResultRecord,
): Promise<"inserted" | "duplicate"> {
  const supabase = createServiceSupabaseClient();

  const { data: existing, error: readError } = await supabase
    .from("payment_results")
    .select("id")
    .eq("provider_event_id", record.provider_event_id)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  if (existing) {
    return "duplicate";
  }

  const { error: insertError } = await supabase.from("payment_results").insert(record);

  if (insertError) {
    if (insertError.code === "23505") {
      return "duplicate";
    }
    throw insertError;
  }

  return "inserted";
}
