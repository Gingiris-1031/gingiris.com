import type { SiteLocale } from "@yipei/site-content";

export type AppAction = "auth" | "orders" | "checkout" | "app";
export type AppPaymentChannel = "wechat" | "alipay";

export const APP_SESSION_COOKIE = "iris_app_session";

export const appBridgeCopy = {
  zh: {
    statusSignedOut: "登录后继续预约与订单",
    statusSignedIn: "已登录，可继续",
    accountSignedOut: "登录",
    accountSignedIn: "账户",
    orders: "订单",
  },
  en: {
    statusSignedOut: "Sign in to continue",
    statusSignedIn: "Signed in",
    accountSignedOut: "Sign in",
    accountSignedIn: "Account",
    orders: "Orders",
  },
} as const satisfies Record<
  SiteLocale,
  {
    statusSignedOut: string;
    statusSignedIn: string;
    accountSignedOut: string;
    accountSignedIn: string;
    orders: string;
  }
>;

function sanitizeOrigin(appOrigin?: string) {
  return appOrigin ? appOrigin.replace(/\/$/, "") : "";
}

function joinAppPath(appOrigin: string | undefined, pathname: string) {
  const origin = sanitizeOrigin(appOrigin);
  return origin ? `${origin}${pathname}` : pathname;
}

export function buildCheckoutPath(
  locale: SiteLocale,
  options?: {
    planCode?: string;
    channel?: AppPaymentChannel;
  },
) {
  const path = new URLSearchParams();
  if (options?.planCode) {
    path.set("plan", options.planCode);
  }
  if (options?.channel) {
    path.set("channel", options.channel);
  }

  const query = path.toString();
  return `/${locale}/checkout${query ? `?${query}` : ""}`;
}

export function buildAppHref(appOrigin: string | undefined, locale: SiteLocale, action: Exclude<AppAction, "checkout">) {
  switch (action) {
    case "auth":
      return joinAppPath(appOrigin, `/${locale}/auth`);
    case "orders":
      return joinAppPath(appOrigin, `/${locale}/me/orders`);
    case "app":
      return joinAppPath(appOrigin, `/${locale}/me`);
  }
}

export function buildCheckoutHref(
  appOrigin: string | undefined,
  locale: SiteLocale,
  options?: {
    planCode?: string;
    channel?: AppPaymentChannel;
  },
) {
  return joinAppPath(appOrigin, buildCheckoutPath(locale, options));
}

export function buildAuthHref(
  appOrigin: string | undefined,
  locale: SiteLocale,
  options?: {
    nextPath?: string;
  },
) {
  if (!options?.nextPath) {
    return joinAppPath(appOrigin, `/${locale}/auth`);
  }

  return joinAppPath(appOrigin, `/${locale}/auth?next=${encodeURIComponent(options.nextPath)}`);
}
