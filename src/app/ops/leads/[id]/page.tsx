// Server component: loads one lead plus the ops users who can own it.

import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import { getLead } from "@/lib/leads-server";
import { OPS_ROLES, USERS_COLLECTION } from "@/lib/roles";
import { LeadDetail } from "@/components/ops/lead-detail";

export const dynamic = "force-dynamic";

/** Admins and staff, for the "Assign To" picker. */
async function listAssignees(): Promise<string[]> {
    const snap = await adminDb
        .collection(USERS_COLLECTION)
        .where("role", "in", OPS_ROLES)
        .get();
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
