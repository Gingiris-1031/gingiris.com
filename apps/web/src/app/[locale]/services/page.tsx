import { notFound, redirect } from "next/navigation";
import { getPublicSiteHref } from "@/lib/public-site";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  redirect(getPublicSiteHref(`/${locale as Locale}/services`));
}
