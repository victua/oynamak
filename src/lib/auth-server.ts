// Server-side session verification. Import only from server components,
// route handlers, or server actions — never from a "use client" module.

import 'server-only';
import { cookies } from 'next/headers';
import { adminAuth, adminDb } from './firebase-admin';
import { SESSION_COOKIE } from './session';
import { USERS_COLLECTION, isActive } from './roles';
import type { UserProfile } from './types';

/**
 * Firestore returns class instances (Timestamp, GeoPoint, DocumentReference)
 * that cannot cross the server/client component boundary. The profile is
 * handed to a client component, so flatten anything non-plain to a string.
 */
function toPlain(value: unknown): unknown {
    if (value === null || typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(toPlain);

    const maybeTimestamp = value as { toDate?: () => Date };
    if (typeof maybeTimestamp.toDate === 'function') {
        return maybeTimestamp.toDate().toISOString();
    }

    return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, toPlain(v)]),
    );
}

export type SessionResult =
    | { status: 'anonymous' }
    | { status: 'no-profile'; uid: string }
    | { status: 'ok'; uid: string; profile: UserProfile };

/**
 * Verify the session cookie and load the caller's profile.
 * `checkRevoked` is on, so a disabled or signed-out user is rejected even
 * while their cookie is still within its 14-day window.
 */
export async function getSession(): Promise<SessionResult> {
    const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
    if (!cookie) return { status: 'anonymous' };

    let uid: string;
    try {
        ({ uid } = await adminAuth.verifySessionCookie(cookie, true));
    } catch {
        return { status: 'anonymous' };
    }

    const snap = await adminDb.collection(USERS_COLLECTION).doc(uid).get();
    if (!snap.exists) return { status: 'no-profile', uid };

    const data = toPlain(snap.data() ?? {}) as Record<string, unknown>;
    return { status: 'ok', uid, profile: { uid, ...data } as UserProfile };
}

/**
 * True when the caller has a profile and it is active. A profile exists only
 * because someone already in the console created it, so its presence *is* the
 * authorisation — there is no role to check.
 */
export function sessionIsAuthorised(
    session: SessionResult,
): session is Extract<SessionResult, { status: 'ok' }> {
    return session.status === 'ok' && isActive(session.profile);
}

/**
 * Guard for server actions and route handlers. Never trust the client — every
 * mutation re-verifies the cookie and re-reads the account server-side.
 * Throws rather than redirects so callers can surface the message.
 */
export async function requireUser(): Promise<UserProfile> {
    const session = await getSession();
    if (session.status !== 'ok') throw new Error('You are not signed in.');
    if (!sessionIsAuthorised(session)) {
        throw new Error('Your account is not active. Ask another user to unlock it.');
    }
    return session.profile;
}
