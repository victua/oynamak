// Server-side access to the `leads` collection.
//
// Every read and write goes through the Admin SDK: the public form writes via
// a server action rather than the browser, so Firestore rules can stay fully
// closed for `leads` (no public create rule to abuse) and validation and
// numbering happen somewhere the client cannot reach.

import 'server-only';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDb } from './firebase-admin';
import type { Lead, LeadService, LeadSource, LeadStatus } from './types';

export const LEADS_COLLECTION = 'leads';
const COUNTERS_COLLECTION = 'counters';
const LEADS_COUNTER = 'leads';

export const LEAD_STATUSES: LeadStatus[] = [
    'New', 'Contacted', 'Qualified', 'Proposal', 'Converted', 'Lost',
];

export const LEAD_SOURCES: LeadSource[] = [
    'Website', 'Referral', 'Event', 'Social Media', 'Walk-In', 'Other',
];

export const LEAD_SERVICES: LeadService[] = [
    'Sports Products & Equipment Solutions',
    'Strategic Partnerships & Ecosystem Development',
    'International Exchange & Capacity Building',
    'Sports Tourism & International Hosting',
    'Sports Innovation & Technology Solutions',
    'Corporate & Institutional Advisory',
    'General Partnership Inquiry',
    'Investment Services',
    'Real Estate Services',
    'Consulting & Advisory',
    'Insurance & Pension',
    'Financial Planning',
    'Corporate Training',
    'Other',
];

function toLead(id: string, d: FirebaseFirestore.DocumentData): Lead {
    return {
        id,
        leadNumber: typeof d.leadNumber === 'number' ? d.leadNumber : 0,
        name: d.name ?? '',
        email: d.email ?? '',
        phone: d.phone ?? '',
        service: d.service ?? 'Other',
        source: d.source ?? 'Website',
        status: d.status ?? 'New',
        message: d.message ?? undefined,
        notes: d.notes ?? undefined,
        assignedTo: d.assignedTo ?? undefined,
        date: typeof d.date === 'string' ? d.date : new Date(0).toISOString(),
        lastContactDate: typeof d.lastContactDate === 'string' ? d.lastContactDate : undefined,
        estimatedValue: typeof d.estimatedValue === 'number' ? d.estimatedValue : undefined,
    };
}

export async function listLeads(): Promise<Lead[]> {
    const snap = await adminDb
        .collection(LEADS_COLLECTION)
        .orderBy('leadNumber', 'desc')
        .get();
    return snap.docs.map((doc) => toLead(doc.id, doc.data()));
}

export async function getLead(id: string): Promise<Lead | null> {
    const snap = await adminDb.collection(LEADS_COLLECTION).doc(id).get();
    return snap.exists ? toLead(snap.id, snap.data()!) : null;
}

/**
 * Firestore has no auto-increment, so the human-facing lead number is handed
 * out by a transaction against counters/leads. Two simultaneous submissions
 * cannot receive the same number.
 */
export async function allocateLeadNumber(): Promise<number> {
    const ref = adminDb.collection(COUNTERS_COLLECTION).doc(LEADS_COUNTER);
    return adminDb.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const next = (snap.exists ? (snap.data()?.next ?? 1) : 1) as number;
        tx.set(ref, { next: next + 1 }, { merge: true });
        return next;
    });
}

export type NewLead = {
    name: string;
    email: string;
    phone: string;
    service: LeadService;
    source: LeadSource;
    message?: string;
    estimatedValue?: number;
};

export async function createLead(input: NewLead): Promise<{ id: string; leadNumber: number }> {
    const leadNumber = await allocateLeadNumber();
    const doc = await adminDb.collection(LEADS_COLLECTION).add({
        ...input,
        leadNumber,
        status: 'New' satisfies LeadStatus,
        date: new Date().toISOString(),
        createdAt: FieldValue.serverTimestamp(),
    });
    return { id: doc.id, leadNumber };
}
