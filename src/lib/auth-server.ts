import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authConfigured, devBypass } from './firebase-config';
import { deleteDocById, getDocById, setDocById } from './portal-store';

/** The founding team. They are always admins and cannot be removed. */
export const ADMIN_EMAILS = ['victor@tunga.co', 'cyprian@tunga.co', 'tracy@tunga.co'];
export type Role = 'admin' | 'staff';
export type SessionUser = { email: string; name: string; role: Role };
export const SESSION_COOKIE = '__session';
export const SESSION_DAYS = 5;

const hash = (token: string) => createHash('sha256').update(token).digest('hex');

export async function roleFor(email: string): Promise<Role | null> {
  const e = email.toLowerCase();
  if (ADMIN_EMAILS.includes(e)) return 'admin';
  const doc = await getDocById('users', e).catch(() => null);
  return doc ? ((doc.role as Role) === 'admin' ? 'admin' : 'staff') : null;
}

/** Stores a session in the database and returns the random token for the cookie. */
export async function createSession(email: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  await setDocById('sessions', hash(token), { email: email.toLowerCase(), exp: Date.now() + SESSION_DAYS * 86_400_000 });
  return token;
}

export async function endSession(token?: string) {
  if (token) await deleteDocById('sessions', hash(token)).catch(() => {});
}

export async function getSessionUser(): Promise<SessionUser | null> {
  if (devBypass) return { email: 'dev@local', name: 'Developer', role: 'admin' };
  if (!authConfigured) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const s = await getDocById('sessions', hash(token));
    if (!s || Number(s.exp) < Date.now()) return null;
    const email = String(s.email);
    const role = await roleFor(email);
    return role ? { email, name: email.split('@')[0], role } : null;
  } catch { return null; }
}

/** For API routes: returns the user, or a ready 401/403 response. */
export async function guard(role?: Role): Promise<{ user: SessionUser } | { res: NextResponse }> {
  const user = await getSessionUser();
  if (!user) return { res: NextResponse.json({ error: 'Please sign in.' }, { status: 401 }) };
  if (role === 'admin' && user.role !== 'admin') return { res: NextResponse.json({ error: 'Only admins can do that.' }, { status: 403 }) };
  return { user };
}
