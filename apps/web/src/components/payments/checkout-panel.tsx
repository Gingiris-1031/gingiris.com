"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { normalizeNextPath } from "@/modules/auth/config";
import type { Locale } from "@/modules/i18n/config";
import { formatCny, getServicePlanByCode, servicePlans, type PaymentChannel } from "@/modules/payments/catalog";

type PaymentSession = {
  orderId: string;
  status: string;
  paymentChannel: PaymentChannel;
  paymentProvider: string;
  displayMode: "qr" | "redirect";
  paymentUrl: string | null;
  qrCodeUrl: string | null;
  expiresAt: string | null;
};

type OrderSnapshot = {
  id: string;
  status: string;
  plan_name_snapshot: string;
  amount_cny: number;
  payment_channel: PaymentChannel;
  product_link?: string | null;
  delivery_notes?: string | null;
  paid_at?: string | null;
};

const copy = {
  zh: {
    kicker: "支付入口",
    title: "确认服务",
    subtitle: "选择服务与支付方式，完成后可在订单中心继续查看状态与交付。",
    entryHint: "已为你保留当前服务，可直接继续。",
    signInTitle: "请先登录",
    signInBody: "登录后可继续支付，并保留订单记录。",
    signIn: "前往登录",
    summary: "订单摘要",
    paymentMethod: "支付方式",
    trust: "说明",
    trustItems: [
      "支付完成后，订单中心会自动更新状态。",
      "资料链接与后续安排会继续保留在订单中心。",
      "如未立即跳转，也可稍后回到订单中心查看。",
    ],
    createPayment: "立即支付",
    creating: "正在创建订单...",
    pendingTitle: "等待支付确认",
    pendingBody: "请完成支付。确认后页面会自动更新状态。",
    openPayment: "继续前往支付",
    viewOrders: "查看我的订单",
    orderId: "订单号",
    status: "状态",
    paymentProvider: "支付方式",
    orderCenterHint: "支付完成后也可以直接去订单中心查看。",
    qrHint: "如当前设备未自动跳转，请使用微信扫描二维码，或点击按钮继续。",
    noQr: "当前通道未返回二维码，可直接点击支付链接继续。",
    errors: {
      unauthorized: "当前会话已失效，请重新登录后再试。",
      invalid_payload: "提交信息不完整，请重新选择服务后再试。",
      create_payment_failed: "支付会话创建失败，请检查支付配置或稍后重试。",
      default: "暂时无法发起支付，请稍后重试。",
    },
    states: {
      pending_payment: "待支付",
      processing: "确认中",
      paid: "已支付",
      fulfilled: "已交付",
      failed: "支付失败",
      cancelled: "已取消",
    },
  },
  en: {
    kicker: "Checkout",
    title: "Confirm your service",
    subtitle: "Choose a service and payment method. After payment, continue from your orders center.",
    entryHint: "Your current service has already been reserved here.",
    signInTitle: "Sign in required",
    signInBody:
      "Sign in to continue payment and keep your order history in one place.",
    signIn: "Go to sign in",
    summary: "Order summary",
    paymentMethod: "Payment method",
    trust: "Notes",
    trustItems: [
      "Once payment completes, your orders center updates automatically.",
      "Delivery links and follow-up details remain available from the same order.",
      "If the page does not jump right away, you can still return through orders later.",
    ],
    createPayment: "Pay now",
    creating: "Creating order...",
    pendingTitle: "Waiting for payment confirmation",
    pendingBody:
      "Complete the payment. The page will keep checking your order and update once confirmed.",
    openPayment: "Continue to payment",
    viewOrders: "View my orders",
    orderId: "Order ID",
    status: "Status",
    paymentProvider: "Payment method",
    orderCenterHint: "You can also review the order from your orders center after payment.",
    qrHint: "If this device did not jump automatically, scan the QR code or use the payment link.",
    noQr: "This channel did not return a QR image, so use the payment link to continue.",
    errors: {
      unauthorized: "Your session expired. Please sign in again.",
      invalid_payload: "The submitted payload was incomplete. Please try again.",
      create_payment_failed:
        "Unable to create the payment session. Check your payment configuration and try again.",
      default: "Payment is unavailable right now. Please try again later.",
    },
    states: {
      pending_payment: "Pending payment",
      processing: "Processing",
      paid: "Paid",
      fulfilled: "Fulfilled",
      failed: "Failed",
      cancelled: "Cancelled",
    },
  },
} as const;

function mapApiError(reason: string | undefined, locale: Locale) {
  const t = copy[locale];
  if (!reason) {
    return t.errors.default;
  }

  return t.errors[reason as keyof typeof t.errors] ?? t.errors.default;
}

export function CheckoutPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [planCode, setPlanCode] = useState(servicePlans[0]?.code ?? "");
  const [paymentChannel, setPaymentChannel] = useState<PaymentChannel>("wechat");
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<PaymentSession | null>(null);
  const [orderSnapshot, setOrderSnapshot] = useState<OrderSnapshot | null>(null);

  const selectedPlan = useMemo(() => getServicePlanByCode(planCode) ?? servicePlans[0]!, [planCode]);
  const requestedPlanCode = searchParams.get("plan");
  const requestedChannel = searchParams.get("channel");
  const nextPath = useMemo(() => {
    const query = searchParams.toString();
    return normalizeNextPath(`/${locale}/checkout${query ? `?${query}` : ""}`, locale);
  }, [locale, searchParams]);

  useEffect(() => {
    if (requestedPlanCode) {
      const match = getServicePlanByCode(requestedPlanCode);
      if (match) {
        setPlanCode(match.code);
      }
    }

    if (requestedChannel === "wechat" || requestedChannel === "alipay") {
      setPaymentChannel(requestedChannel);
    }
  }, [requestedPlanCode, requestedChannel]);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const supabase = createBrowserSupabaseClient();
        const [{ data: userData }, { data: sessionData }] = await Promise.all([
          supabase.auth.getUser(),
          supabase.auth.getSession(),
        ]);

        if (!cancelled) {
          setEmail(userData.user?.email ?? null);
          setAccessToken(sessionData.session?.access_token ?? null);
        }
      } finally {
        if (!cancelled) {
          setLoadingSession(false);
        }
      }
    }

    void loadSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeSession || !accessToken) {
      return;
    }

    let cancelled = false;
    const interval = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/orders/${activeSession.orderId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as { ok: boolean; order?: OrderSnapshot };

        if (!payload.ok || !payload.order || cancelled) {
          return;
        }

        setOrderSnapshot(payload.order);

        if (payload.order.status === "paid" || payload.order.status === "fulfilled") {
          window.location.assign(`/${locale}/payment/result?order=${encodeURIComponent(activeSession.orderId)}`);
        }
      } catch {
        // Keep polling quietly; the result page remains available as a fallback.
      }
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [accessToken, activeSession, locale]);

  async function handleSubmit() {
    if (!accessToken || !selectedPlan) {
      setErrorMessage(t.errors.unauthorized);
      return;
    }

    setPending(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/payments/session", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          locale,
          planCode: selectedPlan.code,
          paymentChannel,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        reason?: string;
        message?: string;
        session?: PaymentSession;
      };

      if (!response.ok || !payload.ok || !payload.session) {
        throw new Error(payload.message || mapApiError(payload.reason, locale));
      }

      setActiveSession(payload.session);
      setOrderSnapshot({
        id: payload.session.orderId,
        status: payload.session.status,
        plan_name_snapshot: selectedPlan.name[locale],
        amount_cny: selectedPlan.amountCny,
        payment_channel: paymentChannel,
        delivery_notes: selectedPlan.deliveryNote[locale],
      });

      if (payload.session.displayMode === "redirect" && payload.session.paymentUrl) {
        window.location.assign(payload.session.paymentUrl);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t.errors.default);
    } finally {
      setPending(false);
    }
  }

  if (loadingSession) {
    return (
      <main className="page-card checkout-shell">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </main>
    );
  }

  if (!email || !accessToken) {
    return (
      <main className="page-card checkout-shell">
        <div className="checkout-copy">
          <span className="section-kicker">{t.kicker}</span>
          <h1>{t.signInTitle}</h1>
          <p>{t.signInBody}</p>
          <p className="auth-inline-note">{t.entryHint}</p>
        </div>
        <div className="action-row">
          <Link className="figma-primary-btn" href={`/${locale}/auth?next=${encodeURIComponent(nextPath)}`}>
            {t.signIn}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-shell">
      <section className="page-card checkout-layout">
        <div className="checkout-copy">
          <span className="section-kicker">{t.kicker}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
          <p className="auth-inline-note">{t.entryHint}</p>
        </div>

        <div className="checkout-grid">
          <article className="checkout-card">
            <div className="checkout-card-head">
              <span className="auth-card-kicker">{t.summary}</span>
            </div>

            <div className="checkout-plan-list">
              {servicePlans.map((plan) => {
                const active = plan.code === planCode;
                return (
                  <button
                    aria-pressed={active}
                    className={active ? "checkout-plan checkout-plan-active" : "checkout-plan"}
                    key={plan.code}
                    onClick={() => setPlanCode(plan.code)}
                    type="button"
                  >
                    <div>
                      <strong>{plan.name[locale]}</strong>
                      <p>{plan.description[locale]}</p>
                    </div>
                    <span className="checkout-plan-price">{formatCny(plan.amountCny, locale)}</span>
                  </button>
                );
              })}
            </div>

            <div className="checkout-summary-box">
              <span>{selectedPlan.name[locale]}</span>
              <strong>{formatCny(selectedPlan.amountCny, locale)}</strong>
              <p>{selectedPlan.deliveryNote[locale]}</p>
            </div>
          </article>

          <article className="checkout-card">
            <div className="checkout-card-head">
              <span className="auth-card-kicker">{t.paymentMethod}</span>
            </div>

            <div className="checkout-channel-grid">
              {(["wechat", "alipay"] as PaymentChannel[]).map((channel) => {
                const active = paymentChannel === channel;
                return (
                  <button
                    aria-pressed={active}
                    className={active ? "checkout-channel checkout-channel-active" : "checkout-channel"}
                    key={channel}
                    onClick={() => setPaymentChannel(channel)}
                    type="button"
                  >
                    <strong>{channel === "wechat" ? "微信支付" : "支付宝"}</strong>
                    <span className="checkout-channel-label">{channel === "wechat" ? "WeChat Pay" : "Alipay"}</span>
                  </button>
                );
              })}
            </div>

            <div className="checkout-trust-box">
              <span className="auth-card-kicker">{t.trust}</span>
              <ul>
                {t.trustItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="checkout-actions">
              <button className="figma-primary-btn" disabled={pending} onClick={handleSubmit} type="button">
                {pending ? t.creating : `${t.createPayment} ${formatCny(selectedPlan.amountCny, locale)}`}
              </button>
              <Link className="figma-secondary-btn" href={`/${locale}/me/orders`}>
                {t.viewOrders}
              </Link>
            </div>

            {errorMessage ? <p className="auth-feedback auth-feedback-error">{errorMessage}</p> : null}
          </article>
        </div>
      </section>

      {activeSession && orderSnapshot ? (
        <section className="page-card checkout-pending-card">
          <div className="checkout-card-head">
            <div>
              <span className="section-kicker">{t.pendingTitle}</span>
              <h2>{t.pendingTitle}</h2>
            </div>
          </div>
          <p>{t.pendingBody}</p>

          <div className="checkout-pending-grid">
            <div className="checkout-payment-panel">
              {activeSession.qrCodeUrl ? (
                <div className="checkout-qr-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="Payment QR code" src={activeSession.qrCodeUrl} />
                </div>
              ) : (
                <p className="muted">{t.noQr}</p>
              )}
              <p className="muted">{t.qrHint}</p>
              {activeSession.paymentUrl ? (
                <a className="figma-primary-btn" href={activeSession.paymentUrl} rel="noreferrer" target="_blank">
                  {t.openPayment}
                </a>
              ) : null}
            </div>

            <div className="checkout-status-panel">
              <div className="checkout-status-row">
                <span>{t.orderId}</span>
                <strong>{orderSnapshot.id}</strong>
              </div>
              <div className="checkout-status-row">
                <span>{t.status}</span>
                <strong>{t.states[orderSnapshot.status as keyof typeof t.states] ?? orderSnapshot.status}</strong>
              </div>
              <div className="checkout-status-row">
                <span>{t.paymentProvider}</span>
                <strong>{orderSnapshot.payment_channel === "wechat" ? "WeChat Pay" : "Alipay"}</strong>
              </div>
              <p>{t.orderCenterHint}</p>
              <div className="action-row">
                <Link className="figma-secondary-btn" href={`/${locale}/me/orders`}>
                  {t.viewOrders}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
