import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/page-shell";
import { isLocale, type Locale } from "@/modules/i18n/config";

export const metadata: Metadata = {
  title: "Iris Personal Site",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <PageShell locale={locale as Locale}>{children}</PageShell>;
}
