import { NextRequest, NextResponse } from 'next/server';
import { SessionAccessMiddleware } from './app/middlewares/AuthMiddleware';

const PUBLIC_FILE = /\.(.*)$/;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	// const res = NextResponse.next()

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-url', request.url);

	if (
		request.nextUrl.pathname.startsWith('/_next') ||
		request.nextUrl.pathname.includes('/api/') ||
		PUBLIC_FILE.test(request.nextUrl.pathname)
	) {
		return;
	}

	if (request.nextUrl.locale === 'default') {
		const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
		return NextResponse.redirect(
			new URL(
				`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`,
				request.url,
			),
		);
	}

	// const locale = request.cookies.get('lang')?.value ?? 'en';

	if (process.env.NEXT_PUBLIC_ENABLE_SESSION_CHECK != 'false') {
		if (await SessionAccessMiddleware.isUserNotAuthenticated(request)) {
			return NextResponse.redirect(`${request.nextUrl.origin + '/auth/signin'}`);
		}

		if (await SessionAccessMiddleware.isUserAuthenticated(request)) {
			return NextResponse.redirect(
				`${request.nextUrl.origin + '/'}`,
			);
		}
	}

	return NextResponse.next({
		request: {
			// Apply new request headers
			headers: requestHeaders,
		},
	});
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/:path*'],
};
