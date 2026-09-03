// Fast edge gate: bounce anyone without a session cookie away from the portals
// before any page code is rendered or shipped.
//
// This checks *presence*, not validity — the Edge runtime cannot run
// firebase-admin. Cryptographic verification and the role check happen in the
// /ops and /portal server layouts (src/lib/auth-server.ts), which is what
// actually enforces access. This just avoids rendering for the common case.

import { NextRequest, NextResponse } from 'next/server';
import { PATHNAME_HEADER, SESSION_COOKIE, isProtectedPath } from '@/lib/session';

export function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    if (!isProtectedPath(pathname)) return NextResponse.next();

    if (request.cookies.has(SESSION_COOKIE)) {
        // Server layouts have no direct access to the request path; pass it
        // along so they can build an accurate ?next= when the cookie turns
        // out to be expired or forged.
        const headers = new Headers(request.headers);
        headers.set(PATHNAME_HEADER, `${pathname}${search}`);
        return NextResponse.next({ request: { headers } });
    }

    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/ops/:path*', '/portal/:path*'],
};
