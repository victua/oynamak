// Account lookup for the Operations Portal (/ops).
//
// There is one portal and one kind of user: anybody with a `users/{uid}`
// document may use the console, and anybody without one may not. That is the
// whole authorisation model — there is deliberately no role field to branch
// on, because a single role carries no information.
//
// Accounts are created only by an existing user, from /ops/users. Nothing here
// provisions a profile: an authenticated stranger with no document is denied,
// which is what makes it safe that Firebase Auth will happily mint an account
// for any email address.

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import type { UserProfile } from './types';

export const USERS_COLLECTION = 'users';

/** Where a signed-in user lands when no `next` target was given. */
export const HOME_PATH = '/ops/dashboard';

/** An account exists and has not been locked or left pending. */
export function isActive(profile: UserProfile | null | undefined) {
    return profile?.status === 'Active';
}

export function initialsOf(name: string) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]!.toUpperCase())
        .join('') || '?';
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
    return snap.exists() ? ({ uid: snap.id, ...snap.data() } as UserProfile) : null;
}

/**
 * Read the signed-in user's profile. Returns null when they have none, which
 * is how an unprovisioned account is refused — this never creates one.
 *
 * Throws only if Firestore rejects the read (e.g. rules not deployed yet), so
 * callers can tell "no access" apart from "could not check".
 */
export async function loadUserProfile(user: User): Promise<UserProfile | null> {
    const profile = await getUserProfile(user.uid);
    if (!profile) return null;

    // Best-effort touch; never block sign-in on it.
    updateDoc(doc(db, USERS_COLLECTION, user.uid), {
        lastLoginAt: new Date().toISOString(),
    }).catch(() => { });

    return profile;
}

/** Guards against open redirects via the `?next=` parameter. */
export function safeNextPath(next: string | null | undefined) {
    if (!next) return null;
    return next.startsWith('/') && !next.startsWith('//') ? next : null;
}
