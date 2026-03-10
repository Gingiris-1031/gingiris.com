"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { getPublicSiteHomeHref } from "@/lib/public-site";
import type { Locale } from "@/modules/i18n/config";
import { buildCallbackUrl, normalizeNextPath } from "@/modules/auth/config";
import { mapAuthErrorMessage } from "@/modules/auth/errors";

const copy = {
  zh: {
    kicker: "Account",
    title: "登录",
    subtitle: "继续预约、支付与订单。",
    security: "Secure",
    resumeTitle: "继续进入",
    destinations: {
      checkout: "支付页",
      orders: "订单中心",
      profile: "账户资料",
      dashboard: "账户总览",
    },
    emailTitle: "邮箱登录",
    emailLabel: "邮箱地址",
    emailPlaceholder: "name@example.com",
    sendMagic: "发送登录链接",
    sending: "提交中...",
    sentMagic: "登录链接已发送，请前往邮箱完成验证。",
    callbackHint: "打开邮件中的安全链接即可继续。",
    emailFootnote: "当前设备验证完成后会自动返回目标页面。",
    secureNote: "Magic Link",
    policy: "继续即表示你同意隐私政策与服务条款。",
    backHome: "返回主页",
  },
  en: {
    kicker: "Account",
    title: "Sign in",
    subtitle: "Continue bookings, payments, and orders.",
    security: "Secure",
    resumeTitle: "Continue to",
    destinations: {
      checkout: "checkout",
      orders: "orders center",
      profile: "account profile",
      dashboard: "account overview",
    },
    emailTitle: "Email login",
    emailLabel: "Email address",
    emailPlaceholder: "name@example.com",
    sendMagic: "Send sign-in link",
    sending: "Submitting...",
    sentMagic: "Sign-in link sent. Check your inbox to continue.",
    callbackHint: "Open the secure email link to continue.",
    emailFootnote: "This device will be verified and returned to the target page.",
    secureNote: "Magic Link",
    policy: "By continuing, you agree to the privacy policy and service terms.",
    backHome: "Back home",
  },
} as const;

function describeNextPath(nextPath: string, locale: Locale) {
  const t = copy[locale];

  if (nextPath.includes("/checkout")) {
    return t.destinations.checkout;
  }

  if (nextPath.includes("/me/orders")) {
    return t.destinations.orders;
  }

  if (nextPath.includes("/me/profile")) {
    return t.destinations.profile;
  }

  return t.destinations.dashboard;
}

export function QuickAuthPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const homeHref = getPublicSiteHomeHref(locale);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextPath = useMemo(() => normalizeNextPath(searchParams.get("next"), locale), [locale, searchParams]);
  const nextLabel = useMemo(() => describeNextPath(nextPath, locale), [locale, nextPath]);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: buildCallbackUrl(locale, nextPath),
        },
      });

      if (error) {
        throw error;
      }

      setSuccessMessage(t.sentMagic);
    } catch (error) {
      const message = error instanceof Error ? error.message : null;
      setErrorMessage(mapAuthErrorMessage(message, locale));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth-page auth-page-minimal">
      <section className="auth-minimal-shell">
        <div className="auth-minimal-topbar">
          <div className="auth-brand-lockup">
            <span className="auth-brand-mark" aria-hidden>
              IJ
            </span>
            <div className="auth-brand-copy">
              <span className="auth-card-kicker">{t.kicker}</span>
              <span className="auth-security-pill">{t.security}</span>
            </div>
          </div>
          <a className="auth-window-back" href={homeHref}>
            {t.backHome}
          </a>
        </div>

        <section className="auth-minimal-panel">
          <div className="auth-minimal-copy">
            <p className="auth-card-kicker">{t.emailTitle}</p>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>

          <div className="auth-minimal-destination">
            <span>{t.resumeTitle}</span>
            <strong>{nextLabel}</strong>
          </div>

          <form className="auth-form auth-minimal-form" onSubmit={handleEmailSubmit}>
            <label className="auth-field">
              <span>{t.emailLabel}</span>
              <input
                autoComplete="email"
                inputMode="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.emailPlaceholder}
                required
                type="email"
                value={email}
              />
            </label>
            <button className="figma-primary-btn auth-submit" disabled={pending} type="submit">
              {pending ? t.sending : t.sendMagic}
            </button>
          </form>

          {successMessage ? <p className="auth-feedback auth-feedback-success">{successMessage}</p> : null}
          {errorMessage ? <p className="auth-feedback auth-feedback-error">{errorMessage}</p> : null}

          <div className="auth-minimal-meta">
            <div className="auth-minimal-meta-row">
              <span className="auth-panel-meta">{t.secureNote}</span>
              <span className="auth-minimal-subnote">{t.emailFootnote}</span>
            </div>
            <p className="auth-inline-note">{t.callbackHint}</p>
            <p className="auth-footer-note">{t.policy}</p>
          </div>
        </section>
      </section>
    </main>
  );
}
