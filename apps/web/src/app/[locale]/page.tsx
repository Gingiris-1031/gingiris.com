import { notFound, redirect } from "next/navigation";
import { getPublicSiteHref } from "@/lib/public-site";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  redirect(getPublicSiteHref(`/${currentLocale}`));
}
