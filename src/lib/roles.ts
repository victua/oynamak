// Role lookup for the Operations Portal (/ops) and Client Portal (/portal).
// A user's role lives on their Firestore `users/{uid}` document so it can be
// administered from /ops/users without a deploy.

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import type { UserProfile, UserRole } from './types';

export const USERS_COLLECTION = 'users';

/** Roles allowed into the Operations Portal. */
export const OPS_ROLES: UserRole[] = ['admin', 'staff'];

/** Roles allowed into the Client Portal. */
export const PORTAL_ROLES: UserRole[] = ['admin', 'staff', 'client'];

/** Every new sign-up starts here; an admin promotes them from /ops/users. */
export const DEFAULT_ROLE: UserRole = 'client';

export function hasRole(profile: UserProfile | null, allowed: UserRole[]) {
    return !!profile && allowed.includes(profile.role);
}

export function isActive(profile: UserProfile | null) {
    return profile?.status === 'Active';
}

function fallbackName(user: User) {
    return user.displayName || user.email?.split('@')[0] || 'Unknown user';
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
 * Read the signed-in user's profile, creating it on first sign-in.
 * Throws if Firestore rejects the read (e.g. security rules not deployed yet),
 * so callers can surface that rather than silently denying access.
 */
export async function ensureUserProfile(user: User): Promise<UserProfile> {
    const ref = doc(db, USERS_COLLECTION, user.uid);
    const snap = await getDoc(ref);
    const now = new Date().toISOString();

    if (!snap.exists()) {
        const profile: UserProfile = {
            uid: user.uid,
            email: user.email ?? '',
            displayName: fallbackName(user),
            ...(user.photoURL ? { photoURL: user.photoURL } : {}),
            role: DEFAULT_ROLE,
            status: 'Active',
            createdAt: now,
            lastLoginAt: now,
        };
        const { uid: _uid, ...data } = profile;
        await setDoc(ref, data);
        return profile;
    }

    // Best-effort touch; never block sign-in on it.
    updateDoc(ref, { lastLoginAt: now }).catch(() => { });

    return { uid: snap.id, ...snap.data() } as UserProfile;
}

/** Where a user lands after signing in when no `next` target was given. */
export function roleHome(role: UserRole | null | undefined) {
    return role === 'admin' || role === 'staff' ? '/ops/dashboard' : '/portal/dashboard';
}

/** Guards against open redirects via the `?next=` parameter. */
export function safeNextPath(next: string | null | undefined) {
    if (!next) return null;
    return next.startsWith('/') && !next.startsWith('//') ? next : null;
}
