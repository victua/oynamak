// Server component: loads one customer plus the ops users who can advise them.

import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import { getCustomer } from "@/lib/customers-server";
import { OPS_ROLES, USERS_COLLECTION } from "@/lib/roles";
import { CustomerDetail } from "@/components/ops/customer-detail";

export const dynamic = "force-dynamic";

async function listAdvisors(): Promise<string[]> {
    const snap = await adminDb
        .collection(USERS_COLLECTION)
        .where("role", "in", OPS_ROLES)
        .get();
    return snap.docs
        .map((d) => (d.data().displayName as string) || (d.data().email as string) || "")
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
}

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const [customer, advisors] = await Promise.all([getCustomer(id), listAdvisors()]);

    if (!customer) notFound();

    return <CustomerDetail customer={customer} advisors={advisors} />;
}
