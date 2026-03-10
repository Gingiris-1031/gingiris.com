import "server-only";

import { createServiceSupabaseClient } from "@/lib/supabase/server";
import type { PaymentChannel } from "@/modules/payments/catalog";

export type OrderStatus =
  | "pending_payment"
  | "processing"
  | "paid"
  | "failed"
  | "cancelled"
  | "fulfilled";

export type OrderRecord = {
  id: string;
  user_id: string;
  locale: string;
  plan_code: string;
  plan_name_snapshot: string;
  amount_cny: number;
  currency: string;
  payment_channel: PaymentChannel;
  payment_provider: string;
  status: OrderStatus;
  provider_order_id?: string | null;
  provider_trade_no?: string | null;
  product_link?: string | null;
  delivery_notes?: string | null;
  paid_at?: string | null;
  fulfilled_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export async function insertOrder(order: OrderRecord) {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase.from("orders").insert(order).select("*").single();

  if (error) {
    throw error;
  }

  return data as OrderRecord;
}

export async function listOrdersForUser(userId: string) {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as OrderRecord[];
}

export async function getOrderForUser(orderId: string, userId: string) {
  const supabase = createServiceSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return (data as OrderRecord | null) ?? null;
}

export async function updateOrderAfterPaymentSession(
  orderId: string,
  patch: Pick<OrderRecord, "provider_order_id" | "payment_provider">,
) {
  const supabase = createServiceSupabaseClient();
  const { error } = await supabase
    .from("orders")
    .update({
      provider_order_id: patch.provider_order_id ?? null,
      payment_provider: patch.payment_provider,
    })
    .eq("id", orderId);

  if (error) {
    throw error;
  }
}

export async function updateOrderPaymentState(
  orderId: string,
  patch: {
    status: OrderStatus;
    payment_provider?: string;
    provider_order_id?: string | null;
    provider_trade_no?: string | null;
    paid_at?: string | null;
  },
) {
  const supabase = createServiceSupabaseClient();
  const payload: Record<string, string | null> = {
    status: patch.status,
  };

  if (patch.payment_provider) {
    payload.payment_provider = patch.payment_provider;
  }
  if (patch.provider_order_id !== undefined) {
    payload.provider_order_id = patch.provider_order_id;
  }
  if (patch.provider_trade_no !== undefined) {
    payload.provider_trade_no = patch.provider_trade_no;
  }
  if (patch.paid_at !== undefined) {
    payload.paid_at = patch.paid_at;
  }

  const { error } = await supabase.from("orders").update(payload).eq("id", orderId);

  if (error) {
    throw error;
  }
}
