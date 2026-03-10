import { defaultLocale, isLocale, type Locale } from "./config";

export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const tokens = acceptLanguage
    .split(",")
    .map((item) => {
      const [first] = item.trim().split(";");
      return first ?? "";
    })
    .filter((item) => item.length > 0);

  for (const token of tokens) {
    const base = token.toLowerCase().split("-")[0] ?? "";
    if (isLocale(base)) {
      return base;
    }
  }

  return defaultLocale;
}
