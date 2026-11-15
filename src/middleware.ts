import { NextResponse, type NextRequest } from 'next/server';
import { authConfigured, devBypass } from '@/lib/firebase-config';

/** Quick gate: no session cookie, no portal. The real check happens on the server in each page and API route. */
export function middleware(req: NextRequest) {
  const isApi = req.nextUrl.pathname.startsWith('/api/');
  if (devBypass) return NextResponse.next();
  if (!authConfigured) return new NextResponse('The portal is not set up yet.', { status: 503 });
  if (req.cookies.get('__session')) return NextResponse.next();
  if (isApi) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/portal/:path*', '/api/portal/:path*'] };
