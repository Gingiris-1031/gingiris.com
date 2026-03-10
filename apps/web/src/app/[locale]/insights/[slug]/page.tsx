import { notFound, redirect } from "next/navigation";
import { getPublicSiteHref } from "@/lib/public-site";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  redirect(getPublicSiteHref(`/${locale as Locale}/insights/${slug}`));
}
