export const supportedLocales = ["zh", "en"] as const;

export type SiteLocale = (typeof supportedLocales)[number];

export const defaultLocale: SiteLocale = "zh";

export function isSiteLocale(value: string): value is SiteLocale {
  return supportedLocales.includes(value as SiteLocale);
}
