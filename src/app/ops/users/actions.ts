'use server';

// Mutations for the Users console. Every action re-verifies the session cookie
// and re-reads the caller's account server-side — the client is never trusted.
//
// These use the Admin SDK, which bypasses Firestore rules by design; the
// `requireUser` guard is what enforces access here.
//
// There are no roles: every active account can invite, lock and unlock. What
// stops a stranger is that only these actions can mint a profile at all.

import { revalidatePath } from 'next/cache';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { requireUser } from '@/lib/auth-server';
import { USERS_COLLECTION } from '@/lib/roles';
import type { UserAccountStatus } from '@/lib/types';

const STATUSES: UserAccountStatus[] = ['Active', 'Locked', 'Pending Activation'];

export type ActionResult = { ok: true; message: string } | { ok: false; error: string };

function fail(error: unknown): ActionResult {
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' };
}

export async function setUserStatus(
    uid: string,
    status: UserAccountStatus,
): Promise<ActionResult> {
    try {
        const actor = await requireUser();

        if (!STATUSES.includes(status)) throw new Error('Unknown status.');
        // Everyone has the same powers now, so the only lockout worth guarding
        // against is a user shutting themselves out of the console.
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
        return {
            ok: true,
            message: locked ? 'Account locked.' : 'Account is now active.',
        };
    } catch (error) {
        return fail(error);
    }
}

/**
 * Take away someone's access.
 *
 * This deletes the Oynamak profile and nothing else. The Firebase Auth account
 * survives deliberately: `tungacoke` is one project shared by roughly fourteen
 * products, so deleting the auth user would destroy this person's sign-in for
 * every other one of them. Without a users/{uid} document they are refused
 * here — that is the whole access model — while their other logins carry on.
 *
 * Refresh tokens are revoked so an open session dies now rather than whenever
 * its 14-day cookie happens to lapse; getSession verifies with checkRevoked.
 *
 * You cannot remove yourself. That is also what stops the console being emptied
 * of everyone, since the last person standing can never delete the last profile.
 */
export async function removeUser(uid: string): Promise<ActionResult> {
    try {
        const actor = await requireUser();
        if (uid === actor.uid) {
            throw new Error('You cannot remove your own access. Ask someone else to.');
        }

        const ref = adminDb.collection(USERS_COLLECTION).doc(uid);
        const snap = await ref.get();
        if (!snap.exists) throw new Error('That user no longer exists.');
        const name = (snap.data()?.displayName as string) || (snap.data()?.email as string) || 'That user';

        await ref.delete();
        try {
            await adminAuth.revokeRefreshTokens(uid);
        } catch {
            // The auth account may not exist (profile without one). The profile
            // is already gone, which is what actually revokes access.
        }

        revalidatePath('/ops/users');
        return { ok: true, message: `${name} no longer has access.` };
    } catch (error) {
        return fail(error);
    }
}

export type InviteResult =
    | { ok: true; message: string; resetLink?: string }
    | { ok: false; error: string };

/**
 * Give someone access. Firebase Auth is shared across every product on the
 * `tungacoke` project, so an account for this email may already exist — in
 * that case we attach a profile to the existing uid rather than failing.
 *
 * This is the only way into the console: there is no public sign-up, so an
 * account without a profile created here can authenticate and still see
 * nothing.
 *
 * Nothing is sent and there is no link to pass on — being added IS the
 * invitation. The person goes to the sign-in page, enters this address and
 * chooses their own password; /api/session switches them from
 * 'Pending Activation' to 'Active' the moment that first sign-in succeeds.
 *
 * The auth account is created here without a password on purpose, so that the
 * sign-in page can tell "added, never signed in" from "already has a password"
 * — this Firebase project is shared, and the address may already have one from
 * another product.
 */
export async function inviteUser(
    email: string,
    displayName: string,
): Promise<InviteResult> {
    try {
        await requireUser();

        const cleanEmail = email.trim().toLowerCase();
        const cleanName = displayName.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) throw new Error('Enter a valid email address.');
        if (!cleanName) throw new Error('Enter a name.');

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
            throw new Error('That person already has access.');
        }

        const now = new Date().toISOString();
        await ref.set({
            email: cleanEmail,
            displayName: cleanName,
            status: 'Pending Activation',
            createdAt: now,
        });

        revalidatePath('/ops/users');

        return {
            ok: true,
            message: reused
                ? `${cleanName} already had an account on this Firebase project, so it was linked to a new Oynamak profile — they sign in with the password they already use.`
                : `${cleanName} can now set a password at the sign-in page.`,
        };
    } catch (error) {
        const e = fail(error);
        return { ok: false, error: e.ok ? 'Something went wrong.' : e.error };
    }
}

/** Password-reset link for an existing user, for another user to pass on. */
export async function generateResetLink(uid: string): Promise<InviteResult> {
    try {
        await requireUser();
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
