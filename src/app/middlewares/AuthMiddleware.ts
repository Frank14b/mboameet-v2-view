import type { NextRequest } from 'next/server';
import { getToken, isTokenExpired } from '../lib/server-utils';

export const protectedPages = [
	'/profile',
	'/settings',
	'/chats',
];

const isUserAuthenticated = async (request: NextRequest) => {
	try {
		const authToken = getToken();
		const tokenIsExpired = isTokenExpired();

		if (authToken?.length > 0 && !tokenIsExpired) {
			if (request.nextUrl.pathname.startsWith('/auth')) {
				return true;
			}
		}
		return false;
	} catch (error) {
		return true;
	}
};

const isUserNotAuthenticated = async (request: NextRequest) => {
	try {
		const authToken = getToken();
		// const tokenIsExpired = isTokenExpired();

		if (authToken.length == 0) {
			if (request.nextUrl.pathname == '/') {
				return true;
			}

			for (let i = 0; i < protectedPages.length; i++) {
				if (request.nextUrl.pathname.startsWith(protectedPages[i])) {
					return true;
				}
			}
		} else {
			if (request.nextUrl.pathname == '/') {
				return false;
			}
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const SessionAccessMiddleware = {
	isUserAuthenticated,
	isUserNotAuthenticated,
};
