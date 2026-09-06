'use server';

// The sign-in screen's two server-side steps.
//
// Access works like Grandstart's portal: someone already in the console adds
// you from /ops/users, and you then set your own password on the sign-in page.
// Nothing is emailed, so there is no link to pass on — being added IS the
// invitation.
//
// The trade-off is deliberate and worth stating: between being added and first
// signing in, an account is claimable by anyone who knows the address, because
// nothing here proves you own the mailbox. Two things keep that narrow — the
// window closes the moment a password exists (`create` only ever fires once),
// and a claim is visible in /ops/users, where the account flips from
// "Pending Activation" to "Active" without the real person having signed in.

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { USERS_COLLECTION } from '@/lib/roles';

/** Minimum we accept when someone sets their own password. */
const MIN_PASSWORD_LENGTH = 8;

export type LoginLookup =
    /** No console account for this address. */
    | { state: 'unknown' }
    /** Added, never signed in, no password yet — show "create a password". */
    | { state: 'create'; firstName: string }
    /** Has a password already (here or on another product) — ask for it. */
    | { state: 'password'; firstName: string }
    /**
     * The account exists but has no password to type — it predates password
     * sign-in here, or was created through a federated provider. Only someone
     * already in the console can issue a set-up link for it.
     */
    | { state: 'no-password'; firstName: string }
    /** Account exists but has been locked. */
    | { state: 'locked' };

function firstNameOf(data: FirebaseFirestore.DocumentData, email: string) {
    const name = (data.displayName as string) || email;
    return name.split(/[\s@]/)[0] ?? '';
}

/**
 * Step one: what should the sign-in screen ask this address for?
 *
 * This runs unauthenticated, so it says whether an address has an account —
 * the same thing the "create a password" screen would reveal anyway. It never
 * returns anything else about the person beyond their first name, which the
 * next screen greets them by.
 */
export async function lookupLoginAccount(email: string): Promise<LoginLookup> {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return { state: 'unknown' };

    const snap = await adminDb
        .collection(USERS_COLLECTION)
        .where('email', '==', cleanEmail)
        .limit(1)
        .get();

    if (snap.empty) return { state: 'unknown' };

    const doc = snap.docs[0];
    const data = doc.data();
    const firstName = firstNameOf(data, cleanEmail);

    if (data.status === 'Locked') return { state: 'locked' };

    // Firebase Auth is shared across every product on `tungacoke`, so this
    // address may already have a password set by one of them. Offering to
    // "create" one would quietly overwrite it everywhere, so only offer that
    // when there is genuinely no password provider on the account.
    let hasPassword = false;
    try {
        const authUser = await adminAuth.getUser(doc.id);
        hasPassword = authUser.providerData.some((p) => p.providerId === 'password');
    } catch {
        // No auth account behind the profile: createPassword will mint one.
    }

    // A password is the only credential this screen takes.
    if (hasPassword) return { state: 'password', firstName };

    // Never signed in and no password yet: this is the invited-user path.
    if (data.status === 'Pending Activation') return { state: 'create', firstName };

    // Active but with no password — a federated sign-in from before this screen
    // was password-only. createPassword deliberately refuses (it guards on
    // 'Pending Activation'), so say so rather than loop them round the form.
    return { state: 'no-password', firstName };
}

export type CreatePasswordResult = { ok: true } | { ok: false; error: string };

/**
 * Step two, for a first-time user: set the password on their own account.
 *
 * Guarded on 'Pending Activation', which is what makes this single-use — once
 * they sign in the status flips to 'Active' (see /api/session) and this path is
 * closed for good. The caller signs in normally afterwards; this deliberately
 * does not mint a session itself.
 */
export async function createPassword(
    email: string,
    password: string,
): Promise<CreatePasswordResult> {
    try {
        const cleanEmail = email.trim().toLowerCase();
        if (password.length < MIN_PASSWORD_LENGTH) {
            return { ok: false, error: `Use at least ${MIN_PASSWORD_LENGTH} characters.` };
        }

        const snap = await adminDb
            .collection(USERS_COLLECTION)
            .where('email', '==', cleanEmail)
            .limit(1)
            .get();

        if (snap.empty) {
            return { ok: false, error: 'That email has no account here.' };
        }

        const doc = snap.docs[0];
        const data = doc.data();

        if (data.status === 'Locked') {
            return { ok: false, error: 'That account is locked. Ask someone on the team to unlock it.' };
        }
        if (data.status !== 'Pending Activation') {
            return {
                ok: false,
                error: 'That account already has a password. Sign in with it instead.',
            };
        }

        try {
            const authUser = await adminAuth.getUser(doc.id);
            if (authUser.providerData.some((p) => p.providerId === 'password')) {
                return {
                    ok: false,
                    error: 'That account already has a password. Sign in with it instead.',
                };
            }
            await adminAuth.updateUser(doc.id, { password, disabled: false });
        } catch {
            // Profile with no auth account behind it — recreate it on the same
            // uid so the users/{uid} key still lines up.
            await adminAuth.createUser({
                uid: doc.id,
                email: cleanEmail,
                displayName: (data.displayName as string) || undefined,
                password,
            });
        }

        return { ok: true };
    } catch (error) {
        console.error('[login/createPassword]', error);
        return { ok: false, error: 'Could not set your password. Please try again.' };
    }
}
