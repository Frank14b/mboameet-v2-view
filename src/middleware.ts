import { NextRequest, NextResponse } from "next/server";
import { SessionAccessMiddleware } from "./app/middlewares/AuthMiddleware";
import { createI18nMiddleware } from 'next-international/middleware'

const PUBLIC_FILE = /\.(.*)$/;

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  urlMappingStrategy: 'rewrite'
})

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // const res = NextResponse.next()

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return;
  }

  if (request.nextUrl.locale === "default") {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
    return NextResponse.redirect(
      new URL(
        `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
        request.url
      )
    );
  }

  if (process.env.NEXT_PUBLIC_ENABLE_SESSION_CHECK != "false") {
    if (await SessionAccessMiddleware.isUserNotAuthenticated(request)) {
      return NextResponse.redirect(
        `${request.nextUrl.origin + "/auth/signin"}`
      );
    }

    if (await SessionAccessMiddleware.isUserAuthenticated(request)) {
      return NextResponse.redirect(`${request.nextUrl.origin + "/"}`);
    }
  }

  return I18nMiddleware(request);

  // return NextResponse.next(I18nMiddleware(request));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};
