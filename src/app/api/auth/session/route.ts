import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { createSession, endSession, roleFor, SESSION_COOKIE, SESSION_DAYS } from '@/lib/auth-server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();
    const decoded = await adminAuth().verifyIdToken(idToken);
    if (!decoded.email || decoded.email_verified !== true) {
      return NextResponse.json({ error: 'Please verify your email first. We have sent you a link.' }, { status: 403 });
    }
    if (!(await roleFor(decoded.email))) {
      return NextResponse.json({ error: 'This email has not been added to the team yet. Ask an admin to add you.' }, { status: 403 });
    }
    const token = await createSession(decoded.email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: SESSION_DAYS * 86_400 });
    return res;
  } catch (err) {
    console.error('Sign-in failed:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Could not sign you in. Please try again.' }, { status: 401 });
  }
}

export async function DELETE() {
  await endSession((await cookies()).get(SESSION_COOKIE)?.value);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
