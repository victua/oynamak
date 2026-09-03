// Server-side access to the `customers` collection.
//
// Portfolio items live embedded on the customer document: there are only ever
// a handful, they are always read alongside the customer, and embedding keeps
// a portfolio edit and the resulting total in one atomic write.
//
// `totalPortfolioValue` is always derived from the items, never set by hand,
// so the headline figure cannot drift away from the rows beneath it.

import 'server-only';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';
import type { Customer, CustomerStatus, PortfolioItem } from './types';

export const CUSTOMERS_COLLECTION = 'customers';
const COUNTERS_COLLECTION = 'counters';
const CUSTOMERS_COUNTER = 'customers';

export const CUSTOMER_STATUSES: CustomerStatus[] = ['Active', 'Inactive', 'Suspended'];

export const PORTFOLIO_SERVICES: PortfolioItem['service'][] = [
    'Investments', 'Real Estate', 'Insurance', 'Consulting',
];

export const PORTFOLIO_STATUSES: PortfolioItem['status'][] = [
    'Active', 'Pending', 'Matured', 'Closed',
];

export function portfolioTotal(items: PortfolioItem[]): number {
    return items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
}

function toPortfolioItem(d: any): PortfolioItem {
    return {
        id: d?.id ?? '',
        service: d?.service ?? 'Consulting',
        productName: d?.productName ?? '',
        status: d?.status ?? 'Active',
        value: typeof d?.value === 'number' ? d.value : 0,
        startDate: d?.startDate ?? '',
        maturityDate: d?.maturityDate ?? undefined,
        returns: typeof d?.returns === 'number' ? d.returns : undefined,
        notes: d?.notes ?? undefined,
    };
}

function toCustomer(id: string, d: FirebaseFirestore.DocumentData): Customer {
    const portfolioItems = Array.isArray(d.portfolioItems)
        ? d.portfolioItems.map(toPortfolioItem)
        : [];

    return {
        id,
        customerNumber: typeof d.customerNumber === 'number' ? d.customerNumber : 0,
        name: d.name ?? '',
        email: d.email ?? '',
        phone: d.phone ?? '',
        idNumber: d.idNumber ?? undefined,
        address: d.address ?? undefined,
        joinDate: typeof d.joinDate === 'string' ? d.joinDate : new Date(0).toISOString(),
        status: d.status ?? 'Active',
        source: d.source ?? 'Direct',
        leadId: d.leadId ?? undefined,
        assignedAdvisor: d.assignedAdvisor ?? undefined,
        totalPortfolioValue: portfolioTotal(portfolioItems),
        portfolioItems,
        notes: d.notes ?? undefined,
    };
}

export async function listCustomers(): Promise<Customer[]> {
    const snap = await adminDb
        .collection(CUSTOMERS_COLLECTION)
        .orderBy('customerNumber', 'desc')
        .get();
    return snap.docs.map((doc) => toCustomer(doc.id, doc.data()));
}

export async function getCustomer(id: string): Promise<Customer | null> {
    const snap = await adminDb.collection(CUSTOMERS_COLLECTION).doc(id).get();
    return snap.exists ? toCustomer(snap.id, snap.data()!) : null;
}

/** Sequential customer number, allocated the same way as lead numbers. */
export async function allocateCustomerNumber(): Promise<number> {
    const ref = adminDb.collection(COUNTERS_COLLECTION).doc(CUSTOMERS_COUNTER);
    return adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const next = (snap.exists ? (snap.data()?.next ?? 1) : 1) as number;
        tx.set(ref, { next: next + 1 }, { merge: true });
        return next;
    });
}

export type NewCustomer = {
    name: string;
    email: string;
    phone: string;
    source: Customer['source'];
    leadId?: string;
    assignedAdvisor?: string;
    notes?: string;
};

export async function createCustomer(input: NewCustomer): Promise<{ id: string; customerNumber: number }> {
    const customerNumber = await allocateCustomerNumber();
    const doc = await adminDb.collection(CUSTOMERS_COLLECTION).add({
        ...input,
        customerNumber,
        status: 'Active' satisfies CustomerStatus,
        joinDate: new Date().toISOString(),
        portfolioItems: [],
        totalPortfolioValue: 0,
        createdAt: FieldValue.serverTimestamp(),
    });
    return { id: doc.id, customerNumber };
}

/** Rewrites the embedded portfolio and its derived total in one write. */
export async function writePortfolio(customerId: string, items: PortfolioItem[]) {
    await adminDb.collection(CUSTOMERS_COLLECTION).doc(customerId).update({
        portfolioItems: items,
        totalPortfolioValue: portfolioTotal(items),
    });
}

/** A customer already converted from this lead, if any. */
export async function customerForLead(leadId: string): Promise<Customer | null> {
    const snap = await adminDb
        .collection(CUSTOMERS_COLLECTION)
        .where('leadId', '==', leadId)
        .limit(1)
        .get();
    return snap.empty ? null : toCustomer(snap.docs[0].id, snap.docs[0].data());
}
