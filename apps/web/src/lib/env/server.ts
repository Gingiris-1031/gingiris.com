import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z.enum(["staging", "production"]).default("staging"),
  SITE_URL: z.string().url().default("http://localhost:3000"),
  SANITY_PROJECT_ID: z.string().min(1).default("replace-me"),
  SANITY_DATASET: z.string().min(1).default("staging"),
  SANITY_API_VERSION: z.string().default("2025-01-01"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  PAYMENT_WEBHOOK_SECRET: z.string().optional(),
  PAYJS_MCHID: z.string().optional(),
  PAYJS_KEY: z.string().optional(),
  PAYJS_ALIPAY_MCHID: z.string().optional(),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export const serverEnv = envSchema.parse(process.env);
