import { notFound } from "next/navigation";
import { MemberCenterPanel } from "@/components/auth/member-center-panel";
import { isLocale, type Locale } from "@/modules/i18n/config";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <MemberCenterPanel locale={locale as Locale} section="profile" />;
}
