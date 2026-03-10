"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { Locale } from "@/modules/i18n/config";
import { normalizeNextPath } from "@/modules/auth/config";
import { mapAuthErrorMessage } from "@/modules/auth/errors";

const copy = {
  zh: {
    kicker: "Account",
    title: "验证中",
    working: "正在确认当前登录状态。",
    success: "验证完成，正在进入账户。",
    fallback: "如未自动跳转，可手动继续。",
    retry: "重新登录",
    continueToMe: "继续进入账户",
    noSession: "未检测到有效登录会话，请重新打开邮件中的链接。",
  },
  en: {
    kicker: "Account",
    title: "Verifying",
    working: "Confirming your current sign-in state.",
    success: "Verification complete. Entering your account.",
    fallback: "If the redirect does not happen automatically, continue manually.",
    retry: "Sign in again",
    continueToMe: "Continue to account",
    noSession: "No valid auth session was detected. Reopen the email link and try again.",
  },
} as const;

export function AuthCallbackPanel({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>(t.working);

  const nextPath = useMemo(() => normalizeNextPath(searchParams.get("next"), locale), [locale, searchParams]);
  const messageClass =
    state === "error"
      ? "auth-feedback auth-feedback-error"
      : state === "success"
        ? "auth-feedback auth-feedback-success"
        : "auth-inline-note";

  useEffect(() => {
    let cancelled = false;

    async function resolveCallback() {
      const errorDescription = searchParams.get("error_description");
      const errorCode = searchParams.get("error");
      const code = searchParams.get("code");

      if (errorDescription || errorCode) {
        if (!cancelled) {
          setState("error");
          setMessage(mapAuthErrorMessage(errorDescription ?? errorCode, locale));
        }
        return;
      }

      try {
        const supabase = createBrowserSupabaseClient();

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            throw error;
          }
        }

        const { data } = await supabase.auth.getSession();

        if (!data.session) {
          throw new Error("no session");
        }

        if (!cancelled) {
          setState("success");
          setMessage(t.success);
          window.setTimeout(() => {
            startTransition(() => {
              router.replace(nextPath);
            });
          }, 600);
        }
      } catch (error) {
        const rawMessage =
          error instanceof Error && error.message === "no session"
            ? t.noSession
            : mapAuthErrorMessage(error instanceof Error ? error.message : null, locale);

        if (!cancelled) {
          setState("error");
          setMessage(rawMessage);
        }
      }
    }

    void resolveCallback();

    return () => {
      cancelled = true;
    };
  }, [locale, nextPath, router, searchParams, t.noSession, t.success]);

  return (
    <main className="auth-page auth-callback-page">
      <section className="auth-callback-shell">
        <article className="auth-callback-card auth-callback-card-upgraded">
          <p className="auth-card-kicker">{t.kicker}</p>
          <h1>{t.title}</h1>
          <p className={messageClass}>{message}</p>
          <p className="auth-inline-note">{t.fallback}</p>
          <div className="action-row">
            <Link className="figma-primary-btn" href={nextPath}>
              {t.continueToMe}
            </Link>
            <Link className="figma-secondary-btn" href={`/${locale}/auth?next=${encodeURIComponent(nextPath)}`}>
              {t.retry}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
