import { notFound } from "next/navigation";
import { CheckoutPanel } from "@/components/payments/checkout-panel";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <CheckoutPanel locale={locale as Locale} />;
}
