import { notFound } from "next/navigation";
import { AuthCallbackPanel } from "@/components/auth/auth-callback-panel";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function AuthCallbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <AuthCallbackPanel locale={locale as Locale} />;
}
