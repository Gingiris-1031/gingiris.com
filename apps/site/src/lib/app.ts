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

function sanitizeOrigin(appOrigin: string) {
  return appOrigin.replace(/\/$/, "");
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

export function buildAppHref(appOrigin: string, locale: SiteLocale, action: Exclude<AppAction, "checkout">) {
  const origin = sanitizeOrigin(appOrigin);

  switch (action) {
    case "auth":
      return `${origin}/${locale}/auth`;
    case "orders":
      return `${origin}/${locale}/me/orders`;
    case "app":
      return `${origin}/${locale}/me`;
  }
}

export function buildCheckoutHref(
  appOrigin: string,
  locale: SiteLocale,
  options?: {
    planCode?: string;
    channel?: AppPaymentChannel;
  },
) {
  return `${sanitizeOrigin(appOrigin)}${buildCheckoutPath(locale, options)}`;
}

export function buildAuthHref(
  appOrigin: string,
  locale: SiteLocale,
  options?: {
    nextPath?: string;
  },
) {
  const origin = sanitizeOrigin(appOrigin);
  if (!options?.nextPath) {
    return `${origin}/${locale}/auth`;
  }

  return `${origin}/${locale}/auth?next=${encodeURIComponent(options.nextPath)}`;
}
