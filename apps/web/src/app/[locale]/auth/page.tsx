import { notFound } from "next/navigation";
import { QuickAuthPanel } from "@/components/auth/quick-auth-panel";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <QuickAuthPanel locale={locale as Locale} />;
}
