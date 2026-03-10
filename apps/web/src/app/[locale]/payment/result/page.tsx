import { notFound } from "next/navigation";
import { PaymentResultPanel } from "@/components/payments/payment-result-panel";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function PaymentResultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return <PaymentResultPanel locale={locale as Locale} />;
}
