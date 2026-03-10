import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPublicSiteOrigin } from "@/lib/public-site";
import { defaultLocale, isLocale } from "@/modules/i18n/config";
import { detectLocaleFromHeader } from "@/modules/i18n/detect-locale";

const functionalRoots = new Set(["auth", "checkout", "payment", "me"]);
const publicRoots = new Set(["services", "insights", "links"]);

function buildPublicSiteUrl(pathname: string, search: string) {
  const url = new URL(pathname, getPublicSiteOrigin());
  url.search = search;
  return url;
}

function resolvePreferredLocale(request: NextRequest): string {
  const fromCookie = request.cookies.get("locale")?.value;
  if (fromCookie && isLocale(fromCookie)) {
    return fromCookie;
  }

  const fromHeader = detectLocaleFromHeader(request.headers.get("accept-language"));
  if (isLocale(fromHeader)) {
    return fromHeader;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localePreference = resolvePreferredLocale(request);

  if (pathname === "/") {
    return NextResponse.redirect(buildPublicSiteUrl(`/${localePreference}`, request.nextUrl.search));
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!maybeLocale) {
    return NextResponse.next();
  }

  if (isLocale(maybeLocale)) {
    const currentLocale = maybeLocale;
    const nextSegment = segments[1];

    if (!nextSegment || publicRoots.has(nextSegment) || !functionalRoots.has(nextSegment)) {
      return NextResponse.redirect(buildPublicSiteUrl(pathname, request.nextUrl.search));
    }

    const response = NextResponse.next();
    const currentCookie = request.cookies.get("locale")?.value;
    if (currentCookie !== currentLocale) {
      response.cookies.set("locale", currentLocale, {
        httpOnly: false,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
    return response;
  }

  if (publicRoots.has(maybeLocale)) {
    return NextResponse.redirect(buildPublicSiteUrl(`/${localePreference}${pathname}`, request.nextUrl.search));
  }

  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|woff|woff2)$).*)"],
};
