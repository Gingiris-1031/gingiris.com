import type { Locale } from "@/modules/i18n/config";

const DEFAULT_PUBLIC_SITE_ORIGIN = "http://localhost:4321";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getPublicSiteOrigin() {
  return trimTrailingSlash(process.env.NEXT_PUBLIC_MARKETING_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_PUBLIC_SITE_ORIGIN);
}

export function getPublicSiteHref(path: string) {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return `${getPublicSiteOrigin()}${pathname}`;
}

export function getPublicSiteHomeHref(locale: Locale) {
  return getPublicSiteHref(`/${locale}`);
}
