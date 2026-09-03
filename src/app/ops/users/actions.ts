'use server';

// Mutations for the Users console. Every action re-verifies the session cookie
// and re-reads the caller's role server-side — the client is never trusted.
//
// These use the Admin SDK, which bypasses Firestore rules by design; the
// `requireRole` guard is what enforces access here.

import { revalidatePath } from 'next/cache';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { requireRole } from '@/lib/auth-server';
import { USERS_COLLECTION } from '@/lib/roles';
import type { UserAccountStatus, UserRole } from '@/lib/types';

const ROLES: UserRole[] = ['admin', 'staff', 'client'];
const STATUSES: UserAccountStatus[] = ['Active', 'Locked', 'Pending Activation'];

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

function fail(error: unknown): ActionResult {
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' };
}

export async function setUserRole(uid: string, role: UserRole): Promise<ActionResult> {
    try {
        const actor = await requireRole(['admin']);

        if (!ROLES.includes(role)) throw new Error('Unknown role.');
        // Guard against an admin locking themselves out of the console.
        if (uid === actor.uid && role !== 'admin') {
            throw new Error('You cannot change your own role. Ask another admin.');
        }

        const ref = adminDb.collection(USERS_COLLECTION).doc(uid);
        if (!(await ref.get()).exists) throw new Error('That user no longer exists.');

        await ref.update({ role });
        revalidatePath('/ops/users');
        return { ok: true, message: `Role changed to ${role}.` };
    } catch (error) {
        return fail(error);
    }
}

export async function setUserStatus(
    uid: string,
    status: UserAccountStatus,
): Promise<ActionResult> {
    try {
        const actor = await requireRole(['admin']);

        if (!STATUSES.includes(status)) throw new Error('Unknown status.');
        if (uid === actor.uid && status !== 'Active') {
            throw new Error('You cannot lock your own account.');
        }

        const ref = adminDb.collection(USERS_COLLECTION).doc(uid);
        if (!(await ref.get()).exists) throw new Error('That user no longer exists.');

        await ref.update({ status });

        // Disable the auth account too and revoke refresh tokens, so a lock
        // takes effect immediately instead of when their 14-day session cookie
        // happens to expire. getSession() verifies with checkRevoked.
        const locked = status !== 'Active';
        await adminAuth.updateUser(uid, { disabled: locked });
        if (locked) await adminAuth.revokeRefreshTokens(uid);

        revalidatePath('/ops/users');
        return { ok: true, message: locked ? 'Account locked.' : 'Account unlocked.' };
    } catch (error) {
        return fail(error);
    }
}

export type InviteResult =
    | { ok: true; message: string; resetLink: string }
    | { ok: false; error: string };

/**
 * Give someone access. Firebase Auth is shared across every product on the
 * `tungacoke` project, so an account for this email may already exist — in
 * that case we attach a profile to the existing uid rather than failing.
 *
 * No email is sent (there's no mail provider wired up yet); the caller gets a
 * password-set link to pass on.
 */
export async function inviteUser(
    email: string,
    displayName: string,
    role: UserRole,
): Promise<InviteResult> {
    try {
        await requireRole(['admin']);

        const cleanEmail = email.trim().toLowerCase();
        const cleanName = displayName.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) throw new Error('Enter a valid email address.');
        if (!cleanName) throw new Error('Enter a name.');
        if (!ROLES.includes(role)) throw new Error('Unknown role.');

        let uid: string;
        let reused = false;
        try {
            uid = (await adminAuth.getUserByEmail(cleanEmail)).uid;
            reused = true;
        } catch {
            uid = (await adminAuth.createUser({
                email: cleanEmail,
                displayName: cleanName,
                emailVerified: false,
            })).uid;
        }

        const ref = adminDb.collection(USERS_COLLECTION).doc(uid);
        if ((await ref.get()).exists) {
            throw new Error('That person already has access. Change their role instead.');
        }

        const now = new Date().toISOString();
        await ref.set({
            email: cleanEmail,
            displayName: cleanName,
            role,
            status: 'Pending Activation',
            createdAt: now,
        });

        const resetLink = await adminAuth.generatePasswordResetLink(cleanEmail);
        revalidatePath('/ops/users');

        return {
            ok: true,
            resetLink,
            message: reused
                ? 'That email already had an account on this Firebase project, so it was linked to a new Oynamak profile.'
                : 'Account created.',
        };
    } catch (error) {
        const e = fail(error);
        return { ok: false, error: e.ok ? 'Something went wrong.' : e.error };
    }
}

/** Password-reset link for an existing user, for the admin to pass on. */
export async function generateResetLink(uid: string): Promise<InviteResult> {
    try {
        await requireRole(['admin']);
        const snap = await adminDb.collection(USERS_COLLECTION).doc(uid).get();
        const email = snap.data()?.email;
        if (!email) throw new Error('That user has no email address on file.');

        return {
            ok: true,
            message: 'Password reset link generated.',
            resetLink: await adminAuth.generatePasswordResetLink(email),
        };
    } catch (error) {
        const e = fail(error);
        return { ok: false, error: e.ok ? 'Something went wrong.' : e.error };
    }
}
