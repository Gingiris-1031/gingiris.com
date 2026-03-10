import Link from "next/link";
import type { Locale } from "@/modules/i18n/config";
import { localeLabels, supportedLocales } from "@/modules/i18n/config";
import { getPublicSiteHomeHref, getPublicSiteHref } from "@/lib/public-site";
import { SessionBridgeSync } from "@/components/ui/session-bridge-sync";

const shellCopy = {
  zh: {
    brand: "Iris",
    subtitle: "账户",
    publicSite: "主页",
    checkout: "支付",
    orders: "订单",
    auth: "登录",
  },
  en: {
    brand: "Iris",
    subtitle: "Account",
    publicSite: "Home",
    checkout: "Checkout",
    orders: "Orders",
    auth: "Sign in",
  },
} as const;

export function PageShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = shellCopy[locale];
  const publicSiteHref = getPublicSiteHomeHref(locale);

  return (
    <div className="app-frame">
      <SessionBridgeSync />
      <div className="app-shell">
        <header className="app-nav">
          <a className="brand-block" href={publicSiteHref}>
            <span className="brand-kicker">{t.subtitle}</span>
            <strong className="brand">{t.brand}</strong>
          </a>
          <nav className="app-links">
            <a className="pill pill-secondary" href={publicSiteHref}>
              {t.publicSite}
            </a>
            <Link className="pill" href={`/${locale}/checkout`}>
              {t.checkout}
            </Link>
            <Link className="pill" href={`/${locale}/me/orders`}>
              {t.orders}
            </Link>
            <Link className="pill" href={`/${locale}/auth`}>
              {t.auth}
            </Link>
            {supportedLocales
              .filter((item) => item !== locale)
              .map((item) => (
                <a key={item} className="pill pill-secondary" href={getPublicSiteHref(`/${item}`)}>
                  {localeLabels[item]}
                </a>
              ))}
          </nav>
        </header>
        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
