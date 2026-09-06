// Server component: loads one lead plus the users who can own it.

import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import { getLead } from "@/lib/leads-server";
import { USERS_COLLECTION } from "@/lib/roles";
import { LeadDetail } from "@/components/ops/lead-detail";

export const dynamic = "force-dynamic";

/** Every console account, for the "Assign To" picker. */
async function listAssignees(): Promise<string[]> {
    const snap = await adminDb.collection(USERS_COLLECTION).get();
    return snap.docs
        .map((d) => (d.data().displayName as string) || (d.data().email as string) || "")
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
}

export default async function LeadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [lead, assignees] = await Promise.all([getLead(id), listAssignees()]);

    if (!lead) notFound();

    return <LeadDetail lead={lead} assignees={assignees} />;
}
