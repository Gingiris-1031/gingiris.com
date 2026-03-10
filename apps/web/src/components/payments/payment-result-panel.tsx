"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { normalizeNextPath } from "@/modules/auth/config";
import type { Locale } from "@/modules/i18n/config";
import { formatCny } from "@/modules/payments/catalog";

type OrderDetail = {
  id: string;
  status: string;
  plan_code?: string;
  plan_name_snapshot: string;
  amount_cny: number;
  payment_channel?: "wechat" | "alipay";
  product_link?: string | null;
  delivery_notes?: string | null;
  paid_at?: string | null;
};

const copy = {
  zh: {
    signInTitle: "请先登录查看支付结果",
    signInBody: "登录后可查看当前账户下的订单结果。",
    signIn: "前往登录",
    missingTitle: "暂未找到订单",
    missingBody: "请从支付页或订单中心进入结果页。",
    pending: "正在加载订单结果...",
    successTitle: "支付成功",
    processingTitle: "正在确认支付",
    failedTitle: "支付未完成",
    fulfilledTitle: "已完成交付",
    successBody: "订单状态已更新，可继续在订单中心查看。",
    processingBody: "已收到支付结果，正在完成最后确认。",
    failedBody: "支付尚未完成，可返回支付页继续处理。",
    openProduct: "查看产品链接",
    backOrders: "查看我的订单",
    retry: "返回支付页",
    orderId: "订单号",
    amount: "金额",
    paidAt: "支付时间",
    delivery: "交付说明",
  },
  en: {
    signInTitle: "Sign in to view the payment result",
    signInBody: "Sign in to review orders attached to your account.",
    signIn: "Go to sign in",
    missingTitle: "Order not found",
    missingBody: "Open the result page from checkout or your orders center.",
    pending: "Loading order result...",
    successTitle: "Payment successful",
    processingTitle: "Confirming payment",
    failedTitle: "Payment not completed",
    fulfilledTitle: "Delivery completed",
    successBody: "The order has been updated and remains available in your orders center.",
    processingBody: "A payment result was received and the last confirmation step is still in progress.",
    failedBody: "The payment has not completed yet. Return to checkout and try again.",
    openProduct: "Open product link",
    backOrders: "View my orders",
    retry: "Back to checkout",
    orderId: "Order ID",
    amount: "Amount",
    paidAt: "Paid at",
    delivery: "Delivery note",
  },
} as const;

function getStatusMeta(locale: Locale, status: string) {
  const t = copy[locale];

  if (status === "paid") {
    return { title: t.successTitle, body: t.successBody, tone: "success" };
  }
  if (status === "fulfilled") {
    return { title: t.fulfilledTitle, body: t.successBody, tone: "success" };
  }
  if (status === "processing" || status === "pending_payment") {
    return { title: t.processingTitle, body: t.processingBody, tone: "pending" };
  }

  return { title: t.failedTitle, body: t.failedBody, tone: "danger" };
}

export function PaymentResultPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const searchParams = useSearchParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  const orderId = searchParams.get("order");
  const nextPath = useMemo(
    () => normalizeNextPath(`/${locale}/payment/result${orderId ? `?order=${orderId}` : ""}`, locale),
    [locale, orderId],
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!orderId) {
        if (!cancelled) {
          setMissing(true);
          setLoading(false);
        }
        return;
      }

      const supabase = createBrowserSupabaseClient();
      const [{ data: userData }, { data: sessionData }] = await Promise.all([
        supabase.auth.getUser(),
        supabase.auth.getSession(),
      ]);

      const token = sessionData.session?.access_token ?? null;
      if (!cancelled) {
        setHasSession(Boolean(userData.user && token));
        setAccessToken(token);
      }

      if (!token) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        if (!cancelled) {
          setMissing(response.status === 404);
          setLoading(false);
        }
        return;
      }

      const payload = (await response.json()) as { ok: boolean; order?: OrderDetail };
      if (!cancelled) {
        setOrder(payload.order ?? null);
        setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [orderId]);

  useEffect(() => {
    if (!orderId || !accessToken || !order) {
      return;
    }

    if (order.status !== "pending_payment" && order.status !== "processing") {
      return;
    }

    let cancelled = false;
    const interval = window.setInterval(async () => {
      const response = await fetch(`/api/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        return;
      }

      const payload = (await response.json()) as { ok: boolean; order?: OrderDetail };
      if (!cancelled && payload.order) {
        setOrder(payload.order);
      }
    }, 3000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [accessToken, order, orderId]);

  if (loading) {
    return (
      <main className="page-card payment-result-shell">
        <h1>{t.pending}</h1>
      </main>
    );
  }

  if (!hasSession) {
    return (
      <main className="page-card payment-result-shell">
        <h1>{t.signInTitle}</h1>
        <p>{t.signInBody}</p>
        <Link className="figma-primary-btn" href={`/${locale}/auth?next=${encodeURIComponent(nextPath)}`}>
          {t.signIn}
        </Link>
      </main>
    );
  }

  if (missing || !order) {
    return (
      <main className="page-card payment-result-shell">
        <h1>{t.missingTitle}</h1>
        <p>{t.missingBody}</p>
        <div className="action-row">
          <Link className="figma-secondary-btn" href={`/${locale}/me/orders`}>
            {t.backOrders}
          </Link>
        </div>
      </main>
    );
  }

  const meta = getStatusMeta(locale, order.status);
  const retryHref = `/${locale}/checkout${order.plan_code ? `?plan=${encodeURIComponent(order.plan_code)}${order.payment_channel ? `&channel=${encodeURIComponent(order.payment_channel)}` : ""}` : ""}`;

  return (
    <main className="payment-result-shell">
      <section className="page-card payment-result-card">
        <span className={`auth-state-chip auth-state-chip-${meta.tone}`}>{meta.title}</span>
        <h1>{meta.title}</h1>
        <p>{meta.body}</p>

        <div className="payment-result-grid">
          <div className="payment-result-meta">
            <div className="checkout-status-row">
              <span>{t.orderId}</span>
              <strong>{order.id}</strong>
            </div>
            <div className="checkout-status-row">
              <span>{t.amount}</span>
              <strong>{formatCny(order.amount_cny, locale)}</strong>
            </div>
            {order.paid_at ? (
              <div className="checkout-status-row">
                <span>{t.paidAt}</span>
                <strong>{new Date(order.paid_at).toLocaleString(locale === "zh" ? "zh-CN" : "en-US")}</strong>
              </div>
            ) : null}
            {order.delivery_notes ? (
              <div className="checkout-status-stack">
                <span>{t.delivery}</span>
                <p>{order.delivery_notes}</p>
              </div>
            ) : null}
          </div>

          <div className="payment-result-actions">
            {order.product_link ? (
              <a className="figma-primary-btn" href={order.product_link} rel="noreferrer" target="_blank">
                {t.openProduct}
              </a>
            ) : null}
            <Link className="figma-secondary-btn" href={`/${locale}/me/orders`}>
              {t.backOrders}
            </Link>
            {(order.status === "failed" || order.status === "cancelled") ? (
              <Link className="figma-secondary-btn" href={retryHref}>
                {t.retry}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
