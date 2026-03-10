export const supportedLocales = ["zh", "en"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "zh";

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export const localeLabels: Record<Locale, string> = {
  zh: "中文",
  en: "English",
};
