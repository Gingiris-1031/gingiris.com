import type { Locale } from "@/modules/i18n/config";

export type EmailAuthMode = "magic-link" | "email-otp";

export const phoneAuthEnabled = process.env.NEXT_PUBLIC_PHONE_AUTH_ENABLED === "true";

export const defaultEmailAuthMode: EmailAuthMode =
  process.env.NEXT_PUBLIC_EMAIL_AUTH_MODE === "email-otp" ? "email-otp" : "magic-link";

export function getDefaultMemberPath(locale: Locale) {
  return `/${locale}/me`;
}

export function normalizeNextPath(input: string | null | undefined, locale: Locale) {
  const fallback = getDefaultMemberPath(locale);

  if (!input || !input.startsWith("/")) {
    return fallback;
  }

  if (input.startsWith("//")) {
    return fallback;
  }

  return input;
}

export function buildCallbackUrl(locale: Locale, nextPath: string) {
  if (typeof window === "undefined") {
    return `/${locale}/auth/callback?next=${encodeURIComponent(nextPath)}`;
  }

  const url = new URL(`/${locale}/auth/callback`, window.location.origin);
  url.searchParams.set("next", nextPath);
  return url.toString();
}
