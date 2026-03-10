"use client";

import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

const APP_SESSION_COOKIE = "iris_app_session";

function writeBridgeCookie(hasSession: boolean) {
  if (typeof document === "undefined") {
    return;
  }

  if (hasSession) {
    document.cookie = `${APP_SESSION_COOKIE}=1; Path=/; Max-Age=2592000; SameSite=Lax`;
    return;
  }

  document.cookie = `${APP_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function SessionBridgeSync() {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    void supabase.auth.getSession().then(({ data }) => {
      writeBridgeCookie(Boolean(data.session));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      writeBridgeCookie(Boolean(session));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}
