import { z } from "zod";

export const paymentStatusSchema = z.enum([
  "pending",
  "paid",
  "failed",
  "canceled",
  "refunded",
]);

export const fulfillmentStatusSchema = z.enum([
  "new",
  "in_review",
  "scheduled",
  "delivered",
  "closed",
]);

export const orderSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  service_plan_id: z.string().optional(),
  plan_key: z.string(),
  plan_name_snapshot: z.string(),
  price_snapshot: z.number(),
  currency_snapshot: z.string(),
  payment_status: paymentStatusSchema,
  fulfillment_status: fulfillmentStatusSchema,
  provider: z.string(),
  created_at: z.string(),
});

export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type FulfillmentStatus = z.infer<typeof fulfillmentStatusSchema>;
export type Order = z.infer<typeof orderSchema>;
