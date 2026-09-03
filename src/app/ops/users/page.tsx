// Server component: reads the live `users` collection with the Admin SDK.
// The layout has already verified the session and ops role before we get here.

import { adminDb } from "@/lib/firebase-admin";
import { getSession } from "@/lib/auth-server";
import { USERS_COLLECTION } from "@/lib/roles";
import { UsersConsole } from "@/components/ops/users-console";
import type { UserProfile } from "@/lib/types";

export const dynamic = "force-dynamic";

async function listUsers(): Promise<UserProfile[]> {
    const snap = await adminDb.collection(USERS_COLLECTION).get();
    return snap.docs
        .map((doc) => {
            const d = doc.data();
            return {
                uid: doc.id,
                email: d.email ?? "",
                displayName: d.displayName ?? d.email ?? "Unknown user",
                photoURL: d.photoURL ?? undefined,
                role: d.role ?? "client",
                status: d.status ?? "Active",
                createdAt: typeof d.createdAt === "string" ? d.createdAt : undefined,
                lastLoginAt: typeof d.lastLoginAt === "string" ? d.lastLoginAt : undefined,
            } satisfies UserProfile;
        })
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export default async function UsersPage() {
    const [users, session] = await Promise.all([listUsers(), getSession()]);
    const actor = session.status === "ok" ? session.profile : null;

    return (
        <UsersConsole
            users={users}
            currentUid={actor?.uid ?? ""}
            canManage={actor?.role === "admin"}
        />
    );
}
