// Exchanges a Firebase ID token for an httpOnly session cookie, so the server
// (middleware, server components) can authenticate a request. Client-side
// Firebase auth state lives in IndexedDB and is invisible to the server.

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { SESSION_COOKIE, SESSION_MAX_AGE_MS } from '@/lib/session';
import { USERS_COLLECTION } from '@/lib/roles';

/**
 * An invited account becomes active the first time its owner actually signs in.
 *
 * Getting this far means Firebase accepted their credentials, so this is the
 * honest moment to switch them on — whether they just set a password, already
 * had one from another product on this Firebase project, or came in through
 * Google. It also means 'Pending Activation' says exactly one thing: added,
 * never signed in. A locked account never reaches here; it is disabled in
 * Firebase Auth and cannot mint a token at all.
 */
async function activateOnFirstSignIn(uid: string) {
    try {
        const ref = adminDb.collection(USERS_COLLECTION).doc(uid);
        const snap = await ref.get();
        if (snap.exists && snap.data()?.status === 'Pending Activation') {
            await ref.update({ status: 'Active' });
        }
    } catch (error) {
        // Never block sign-in on this; the worst case is they stay pending and
        // someone switches them on by hand from /ops/users.
        console.error('[api/session] could not activate pending account:', error);
    }
}

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    let idToken: string | undefined;
    try {
        ({ idToken } = await request.json());
    } catch {
        return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
    }

    if (!idToken) {
        return NextResponse.json({ error: 'Missing idToken.' }, { status: 400 });
    }

    try {
        // Reject anything but a freshly minted token — this endpoint hands out a
        // two-week credential, so we don't want an hour-old ID token doing it.
        const decoded = await adminAuth.verifyIdToken(idToken, true);
        if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
            return NextResponse.json(
                { error: 'Recent sign-in required.' },
                { status: 401 },
            );
        }

        await activateOnFirstSignIn(decoded.uid);

        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn: SESSION_MAX_AGE_MS,
        });

        const response = NextResponse.json({ ok: true });
        response.cookies.set({
            name: SESSION_COOKIE,
            value: sessionCookie,
            maxAge: SESSION_MAX_AGE_MS / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
        return response;
    } catch (error) {
        console.error('[api/session] could not create session cookie:', error);
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }
}

/** Reports whether the caller already holds a valid session cookie. */
export async function GET(request: NextRequest) {
    const cookie = request.cookies.get(SESSION_COOKIE)?.value;
    if (!cookie) return NextResponse.json({ authenticated: false });

    try {
        await adminAuth.verifySessionCookie(cookie, true);
        return NextResponse.json({ authenticated: true });
    } catch {
        return NextResponse.json({ authenticated: false });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
        name: SESSION_COOKIE,
        value: '',
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });
    return response;
}
