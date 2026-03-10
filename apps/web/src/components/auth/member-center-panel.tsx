"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { getPublicSiteHomeHref } from "@/lib/public-site";
import { normalizeNextPath } from "@/modules/auth/config";
import type { Locale } from "@/modules/i18n/config";
import { formatCny } from "@/modules/payments/catalog";

type MemberSection = "overview" | "orders" | "profile";

type OrderRecord = {
  id: string;
  status: string;
  plan_code?: string;
  plan_name_snapshot: string;
  amount_cny: number;
  payment_channel: "wechat" | "alipay";
  payment_provider: string;
  product_link?: string | null;
  paid_at?: string | null;
  delivery_notes?: string | null;
  created_at?: string | null;
};

const copy = {
  zh: {
    pending: "正在检查账户状态...",
    signedOutTitle: "请先登录账户",
    signedOutBody: "登录后可继续预约与订单。",
    signIn: "前往登录",
    signOut: "退出登录",
    openSite: "返回主页",
    signedIn: "Account",
    overviewTitle: "账户总览",
    overviewBody: "统一查看账户、订单与交付。",
    ordersTitle: "订单与支付",
    ordersBody: "所有支付、交付与后续链接都沉淀在这里。",
    profileTitle: "账户资料",
    profileBody: "保留必要的账户信息与访问状态。",
    emailLabel: "当前账号",
    accountStatus: "账户状态",
    accountReady: "已连接，可继续支付与查看订单",
    totalOrders: "累计订单",
    latestOrder: "最近订单",
    noLatestOrder: "还没有最近订单",
    deliveryTitle: "交付方式",
    deliveryBody: "支付完成后，资料链接、会前安排与后续说明都会进入订单中心。",
    ordersEmpty: "还没有订单。完成支付后，这里会显示你的购买记录。",
    ordersLoading: "正在加载订单...",
    openProduct: "查看产品链接",
    goCheckout: "去支付页",
    continuePayment: "继续支付",
    viewStatus: "查看状态",
    paidAt: "支付时间",
    createdAt: "创建时间",
    amount: "金额",
    channel: "支付方式",
    provider: "支付服务",
    profileCards: {
      identityTitle: "账户身份",
      identityBody: "当前所有支付与订单都会绑定这个邮箱账户。",
      authTitle: "认证方式",
      authBody: "当前使用邮箱 magic link 完成验证。",
      dashboardTitle: "账户状态",
      dashboardBody: "登录后可继续预约、支付、订单与交付。",
      signOutTitle: "退出当前账户",
      signOutBody: "退出后仍可返回主页，重新登录后继续预约、支付或查看订单。",
    },
    nav: {
      overview: "总览",
      orders: "订单",
      profile: "资料",
    },
    orderStates: {
      pending_payment: "待支付",
      processing: "确认中",
      paid: "已支付",
      fulfilled: "已交付",
      failed: "支付失败",
      cancelled: "已取消",
    },
  },
  en: {
    pending: "Checking your account state...",
    signedOutTitle: "Sign in to your account",
    signedOutBody: "Sign in to continue bookings and orders.",
    signIn: "Go to sign in",
    signOut: "Sign out",
    openSite: "Back home",
    signedIn: "Account",
    overviewTitle: "Account overview",
    overviewBody: "View account, orders, and delivery in one place.",
    ordersTitle: "Orders and payments",
    ordersBody: "Payments, delivery, and follow-up links all settle here.",
    profileTitle: "Account profile",
    profileBody: "Keep only the account information and access state that matter.",
    emailLabel: "Signed-in account",
    accountStatus: "Account state",
    accountReady: "Connected and ready for checkout or order review",
    totalOrders: "Total orders",
    latestOrder: "Latest order",
    noLatestOrder: "No recent order yet",
    deliveryTitle: "Delivery model",
    deliveryBody: "After payment, materials, scheduling, and follow-up notes will continue in the orders center.",
    ordersEmpty: "You do not have any orders yet. Completed payments will show up here.",
    ordersLoading: "Loading orders...",
    openProduct: "Open product link",
    goCheckout: "Go to checkout",
    continuePayment: "Continue to checkout",
    viewStatus: "View status",
    paidAt: "Paid at",
    createdAt: "Created at",
    amount: "Amount",
    channel: "Payment channel",
    provider: "Provider",
    profileCards: {
      identityTitle: "Account identity",
      identityBody: "Payments and order history remain attached to this email account.",
      authTitle: "Authentication",
      authBody: "Email magic link is the current sign-in method.",
      dashboardTitle: "Account state",
      dashboardBody: "Stay signed in to continue bookings, checkout, orders, and delivery.",
      signOutTitle: "Sign out",
      signOutBody: "After signing out you can return home and sign in again later to continue.",
    },
    nav: {
      overview: "Overview",
      orders: "Orders",
      profile: "Profile",
    },
    orderStates: {
      pending_payment: "Pending payment",
      processing: "Processing",
      paid: "Paid",
      fulfilled: "Fulfilled",
      failed: "Failed",
      cancelled: "Cancelled",
    },
  },
} as const;

const sectionCopy = {
  overview: { titleKey: "overviewTitle", bodyKey: "overviewBody" },
  orders: { titleKey: "ordersTitle", bodyKey: "ordersBody" },
  profile: { titleKey: "profileTitle", bodyKey: "profileBody" },
} as const;

function formatDateValue(value: string | null | undefined, locale: Locale) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleString(locale === "zh" ? "zh-CN" : "en-US");
}

function getOrderTone(status: string) {
  if (status === "paid" || status === "fulfilled") {
    return "success";
  }

  if (status === "pending_payment" || status === "processing") {
    return "pending";
  }

  return "danger";
}

export function MemberCenterPanel({
  locale,
  section,
}: {
  locale: Locale;
  section: MemberSection;
}) {
  const t = copy[locale];
  const homeHref = getPublicSiteHomeHref(locale);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const nextPath = useMemo(
    () => normalizeNextPath(`/${locale}/me${section === "overview" ? "" : `/${section}`}`, locale),
    [locale, section],
  );

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const supabase = createBrowserSupabaseClient();
        const [{ data, error }, { data: sessionData }] = await Promise.all([
          supabase.auth.getUser(),
          supabase.auth.getSession(),
        ]);

        if (error) {
          throw error;
        }

        if (active) {
          setEmail(data.user?.email ?? null);
          setAccessToken(sessionData.session?.access_token ?? null);
        }
      } catch (error) {
        if (active) {
          const message = error instanceof Error ? error.message : "";
          setSetupError(message);
          setEmail(null);
          setAccessToken(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let active = true;
    setOrdersLoading(true);

    async function loadOrders() {
      try {
        const response = await fetch("/api/orders", {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        const payload = (await response.json()) as { ok: boolean; orders?: OrderRecord[] };
        if (active) {
          setOrders(payload.orders ?? []);
        }
      } catch {
        if (active) {
          setOrders([]);
        }
      } finally {
        if (active) {
          setOrdersLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      active = false;
    };
  }, [accessToken, section]);

  async function handleSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    window.location.assign(`/${locale}/auth`);
  }

  if (loading) {
    return (
      <main className="page-card member-loading-card">
        <p className="auth-card-kicker">{t.signedIn}</p>
        <h1>{t.overviewTitle}</h1>
        <p>{t.pending}</p>
      </main>
    );
  }

  if (setupError || !email || !accessToken) {
    return (
      <main className="page-card member-signed-out-card">
        <p className="auth-card-kicker">{t.signedOutTitle}</p>
        <h1>{t.signedOutTitle}</h1>
        <p>{t.signedOutBody}</p>
        <div className="action-row">
          <Link className="figma-primary-btn" href={`/${locale}/auth?next=${encodeURIComponent(nextPath)}`}>
            {t.signIn}
          </Link>
          <a className="figma-secondary-btn" href={homeHref}>
            {t.openSite}
          </a>
        </div>
      </main>
    );
  }

  const detail = sectionCopy[section];
  const title = t[detail.titleKey];
  const body = t[detail.bodyKey];
  const latestOrder = orders[0] ?? null;
  const recentOrders = orders.slice(0, 2);

  return (
    <main className="member-shell">
      <section className="page-card member-hero-card">
        <div className="member-hero-head">
          <div className="member-hero-copy">
            <p className="auth-card-kicker">{t.signedIn}</p>
            <h1>{title}</h1>
            <p>{body}</p>
          </div>
          <div className="member-hero-actions">
            <a className="figma-secondary-btn" href={homeHref}>
              {t.openSite}
            </a>
            <Link className="figma-primary-btn" href={`/${locale}/checkout`}>
              {latestOrder?.status === "pending_payment" ? t.continuePayment : t.goCheckout}
            </Link>
            <button className="figma-secondary-btn member-signout" onClick={handleSignOut} type="button">
              {t.signOut}
            </button>
          </div>
        </div>

        <div className="member-summary-grid">
          <article className="member-summary-card">
            <span>{t.emailLabel}</span>
            <strong>{email}</strong>
            <p>{t.accountReady}</p>
          </article>
          <article className="member-summary-card">
            <span>{t.totalOrders}</span>
            <strong>{orders.length}</strong>
            <p>{orders.length > 0 ? t.ordersTitle : t.ordersEmpty}</p>
          </article>
          <article className="member-summary-card">
            <span>{t.latestOrder}</span>
            <strong>{latestOrder?.plan_name_snapshot ?? t.noLatestOrder}</strong>
            <p>
              {latestOrder
                ? t.orderStates[latestOrder.status as keyof typeof t.orderStates] ?? latestOrder.status
                : t.deliveryBody}
            </p>
          </article>
          <article className="member-summary-card">
            <span>{t.deliveryTitle}</span>
            <strong>{t.accountStatus}</strong>
            <p>{t.deliveryBody}</p>
          </article>
        </div>
      </section>

      <nav className="member-section-nav" aria-label="Member sections">
        <Link className={section === "overview" ? "pill member-nav-pill member-nav-pill-active" : "pill member-nav-pill"} href={`/${locale}/me`}>
          {t.nav.overview}
        </Link>
        <Link className={section === "orders" ? "pill member-nav-pill member-nav-pill-active" : "pill member-nav-pill"} href={`/${locale}/me/orders`}>
          {t.nav.orders}
        </Link>
        <Link className={section === "profile" ? "pill member-nav-pill member-nav-pill-active" : "pill member-nav-pill"} href={`/${locale}/me/profile`}>
          {t.nav.profile}
        </Link>
      </nav>

      {section === "overview" ? (
        <section className="page-card member-section-card">
          <div className="member-dashboard-grid">
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.emailLabel}</p>
              <strong>{email}</strong>
              <p>{t.profileCards.identityBody}</p>
            </article>
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.latestOrder}</p>
              <strong>{latestOrder?.plan_name_snapshot ?? t.noLatestOrder}</strong>
              <p>{latestOrder?.delivery_notes ?? t.deliveryBody}</p>
              <div className="action-row">
                <Link className="figma-secondary-btn" href={`/${locale}/me/orders`}>
                  {t.ordersTitle}
                </Link>
              </div>
            </article>
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.deliveryTitle}</p>
              <strong>{t.accountReady}</strong>
              <p>{t.profileCards.dashboardBody}</p>
            </article>
          </div>

          <div className="member-section-block">
            <div className="member-section-block-head">
              <p className="auth-card-kicker">{t.ordersTitle}</p>
              <h2>{t.latestOrder}</h2>
            </div>
            {ordersLoading ? <p>{t.ordersLoading}</p> : null}
            {!ordersLoading && recentOrders.length === 0 ? (
              <div className="member-order-card member-empty-order-card">
                <p>{t.ordersEmpty}</p>
                <Link className="figma-primary-btn" href={`/${locale}/checkout`}>
                  {t.goCheckout}
                </Link>
              </div>
            ) : null}
            {!ordersLoading ? (
              <div className="member-order-list member-order-list-compact">
                {recentOrders.map((order) => (
                  <article className="member-order-card" key={order.id}>
                    <div className="member-order-head">
                      <div>
                        <strong>{order.plan_name_snapshot}</strong>
                        <span>{order.id}</span>
                      </div>
                      <span className={`auth-state-chip auth-state-chip-${getOrderTone(order.status)}`}>
                        {t.orderStates[order.status as keyof typeof t.orderStates] ?? order.status}
                      </span>
                    </div>
                    <div className="member-order-meta">
                      <span>{t.amount}</span>
                      <strong>{formatCny(order.amount_cny, locale)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {section === "orders" ? (
        <section className="page-card member-section-card">
          <div className="member-section-block-head">
            <p className="auth-card-kicker">{t.ordersTitle}</p>
            <h2>{t.ordersTitle}</h2>
            <p>{t.ordersBody}</p>
          </div>

          {ordersLoading ? <p>{t.ordersLoading}</p> : null}
          {!ordersLoading && orders.length === 0 ? (
            <div className="member-order-card member-empty-order-card">
              <p>{t.ordersEmpty}</p>
              <Link className="figma-primary-btn" href={`/${locale}/checkout`}>
                {t.goCheckout}
              </Link>
            </div>
          ) : null}

          {!ordersLoading ? (
            <div className="member-order-list">
              {orders.map((order) => (
                <article className="member-order-card member-order-card-expanded" key={order.id}>
                  <div className="member-order-head">
                    <div>
                      <strong>{order.plan_name_snapshot}</strong>
                      <span>{order.id}</span>
                    </div>
                    <span className={`auth-state-chip auth-state-chip-${getOrderTone(order.status)}`}>
                      {t.orderStates[order.status as keyof typeof t.orderStates] ?? order.status}
                    </span>
                  </div>

                  <div className="member-order-grid">
                    <div className="member-order-meta">
                      <span>{t.amount}</span>
                      <strong>{formatCny(order.amount_cny, locale)}</strong>
                    </div>
                    <div className="member-order-meta">
                      <span>{t.channel}</span>
                      <strong>{order.payment_channel === "wechat" ? "WeChat Pay" : "Alipay"}</strong>
                    </div>
                    <div className="member-order-meta">
                      <span>{t.provider}</span>
                      <strong>{order.payment_provider}</strong>
                    </div>
                    <div className="member-order-meta">
                      <span>{order.paid_at ? t.paidAt : t.createdAt}</span>
                      <strong>{formatDateValue(order.paid_at ?? order.created_at, locale) ?? "-"}</strong>
                    </div>
                  </div>

                  {order.delivery_notes ? <p>{order.delivery_notes}</p> : null}

                  <div className="action-row">
                    <Link className="figma-secondary-btn" href={`/${locale}/payment/result?order=${encodeURIComponent(order.id)}`}>
                      {t.viewStatus}
                    </Link>
                    {order.product_link ? (
                      <a className="figma-primary-btn" href={order.product_link} rel="noreferrer" target="_blank">
                        {t.openProduct}
                      </a>
                    ) : null}
                    {(order.status === "pending_payment" || order.status === "failed" || order.status === "cancelled") && order.plan_code ? (
                      <Link className="figma-secondary-btn" href={`/${locale}/checkout?plan=${encodeURIComponent(order.plan_code)}`}>
                        {t.continuePayment}
                      </Link>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {section === "profile" ? (
        <section className="page-card member-section-card">
          <div className="member-section-block-head">
            <p className="auth-card-kicker">{t.profileTitle}</p>
            <h2>{t.profileTitle}</h2>
            <p>{t.profileBody}</p>
          </div>
          <div className="member-dashboard-grid member-profile-grid">
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.profileCards.identityTitle}</p>
              <strong>{email}</strong>
              <p>{t.profileCards.identityBody}</p>
            </article>
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.profileCards.authTitle}</p>
              <strong>Email Magic Link</strong>
              <p>{t.profileCards.authBody}</p>
            </article>
            <article className="member-detail-card">
              <p className="auth-card-kicker">{t.profileCards.dashboardTitle}</p>
              <strong>{t.accountReady}</strong>
              <p>{t.profileCards.dashboardBody}</p>
            </article>
            <article className="member-detail-card member-detail-card-emphasis">
              <p className="auth-card-kicker">{t.profileCards.signOutTitle}</p>
              <strong>{t.signOut}</strong>
              <p>{t.profileCards.signOutBody}</p>
              <div className="action-row">
                <button className="figma-primary-btn member-signout" onClick={handleSignOut} type="button">
                  {t.signOut}
                </button>
              </div>
            </article>
          </div>
        </section>
      ) : null}
    </main>
  );
}
