'use client';

import { useState, useEffect, useCallback } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ensureUserProfile } from '@/lib/roles';
import { authErrorMessage } from '@/lib/auth-errors';
import type { UserProfile } from '@/lib/types';

/**
 * Trade the freshly minted ID token for an httpOnly session cookie so the
 * server can authenticate this user. The client and the cookie must agree:
 * if this fails we sign the user back out rather than leave them in a state
 * where the client thinks they're in but every server route disagrees
 * (which would bounce them between /login and /ops forever).
 */
async function establishSession(user: User): Promise<string | null> {
    try {
        const idToken = await user.getIdToken(true);
        const res = await fetch('/api/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });
        if (!res.ok) {
            const { error } = await res.json().catch(() => ({ error: null }));
            return error ?? 'Could not start a server session.';
        }
        return null;
    } catch {
        return 'Could not reach the server to start a session.';
    }
}

async function sessionIsLive(): Promise<boolean> {
    try {
        const res = await fetch('/api/session');
        if (!res.ok) return false;
        const { authenticated } = await res.json();
        return !!authenticated;
    } catch {
        return false;
    }
}

async function clearSession() {
    try {
        await fetch('/api/session', { method: 'DELETE' });
    } catch {
        // Best effort: the cookie expires on its own, and the client sign-out
        // below is what the user actually asked for.
    }
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = useCallback(async (nextUser: User) => {
        try {
            setProfile(await ensureUserProfile(nextUser));
            setProfileError(null);
        } catch (error: any) {
            setProfile(null);
            setProfileError(error?.message ?? 'Could not load your user profile.');
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
            setUser(nextUser);

            if (!nextUser) {
                setProfile(null);
                setProfileError(null);
                setLoading(false);
                return;
            }

            await loadProfile(nextUser);
            setLoading(false);
        });

        return unsubscribe;
    }, [loadProfile]);

    /**
     * Reconcile client auth state with the server session cookie. Firebase
     * persists the client session for far longer than the cookie's 14 days,
     * and /api/session refuses to mint a new cookie from a stale sign-in, so
     * without this a returning user ping-pongs between /login and /ops.
     * Returns null when a usable session exists, otherwise an error message.
     */
    const syncSession = useCallback(async (): Promise<string | null> => {
        const current = auth.currentUser;
        if (!current) return 'Not signed in.';
        if (await sessionIsLive()) return null;
        return (await establishSession(current))
            ?? (await sessionIsLive() ? null : 'Could not start a server session.');
    }, []);

    /** Re-read the profile after a role or status change. */
    const refreshProfile = useCallback(async () => {
        if (auth.currentUser) await loadProfile(auth.currentUser);
    }, [loadProfile]);

    const signIn = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const sessionError = await establishSession(result.user);
            if (sessionError) {
                await firebaseSignOut(auth);
                return { user: null, error: sessionError };
            }
            return { user: result.user, error: null };
        } catch (error: any) {
            return { user: null, error: authErrorMessage(error) };
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const sessionError = await establishSession(result.user);
            if (sessionError) {
                await firebaseSignOut(auth);
                return { user: null, error: sessionError };
            }
            return { user: result.user, error: null };
        } catch (error: any) {
            return { user: null, error: authErrorMessage(error) };
        }
    };

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const sessionError = await establishSession(result.user);
            if (sessionError) {
                await firebaseSignOut(auth);
                return { user: null, error: sessionError };
            }
            return { user: result.user, error: null };
        } catch (error: any) {
            return { user: null, error: authErrorMessage(error) };
        }
    };

    const signOut = async () => {
        try {
            await clearSession();
            await firebaseSignOut(auth);
            return { error: null };
        } catch (error: any) {
            return { error: authErrorMessage(error) };
        }
    };

    return {
        user,
        profile,
        role: profile?.role ?? null,
        profileError,
        loading,
        refreshProfile,
        syncSession,
        signIn,
        signUp,
        signInWithGoogle,
        signOut
    };
}
