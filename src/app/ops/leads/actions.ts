'use server';

// Ops mutations for the leads pipeline. Each re-verifies the session and role
// server-side — the Admin SDK bypasses Firestore rules, so requireRole is the
// enforcement.

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
import { requireRole } from '@/lib/auth-server';
import { LEADS_COLLECTION, LEAD_STATUSES } from '@/lib/leads-server';
import { OPS_ROLES } from '@/lib/roles';
import type { LeadStatus } from '@/lib/types';

export type LeadActionResult = { ok: true; message: string } | { ok: false; error: string };

function fail(error: unknown): LeadActionResult {
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' };
}

async function leadRef(id: string) {
    const ref = adminDb.collection(LEADS_COLLECTION).doc(id);
    if (!(await ref.get()).exists) throw new Error('That lead no longer exists.');
    return ref;
}

function refresh(id?: string) {
    revalidatePath('/ops/leads');
    if (id) revalidatePath(`/ops/leads/${id}`);
}

export async function setLeadStatus(id: string, status: LeadStatus): Promise<LeadActionResult> {
    try {
        await requireRole(OPS_ROLES);
        if (!LEAD_STATUSES.includes(status)) throw new Error('Unknown status.');

        const ref = await leadRef(id);
        await ref.update({
            status,
            // Moving off 'New' is a contact event worth timestamping.
            ...(status !== 'New' ? { lastContactDate: new Date().toISOString() } : {}),
        });

        refresh(id);
        return { ok: true, message: `Status set to ${status}.` };
    } catch (error) {
        return fail(error);
    }
}

export async function assignLead(id: string, assignedTo: string): Promise<LeadActionResult> {
    try {
        const actor = await requireRole(OPS_ROLES);
        const ref = await leadRef(id);
        const value = assignedTo.trim() || actor.displayName;

        await ref.update({ assignedTo: value });
        refresh(id);
        return { ok: true, message: `Assigned to ${value}.` };
    } catch (error) {
        return fail(error);
    }
}

export async function addLeadNote(id: string, note: string): Promise<LeadActionResult> {
    try {
        const actor = await requireRole(OPS_ROLES);
        const text = note.trim();
        if (!text) throw new Error('Write something first.');

        const ref = await leadRef(id);
        const existing = (await ref.get()).data()?.notes ?? '';
        const stamp = new Date().toLocaleString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
        const entry = `[${stamp} — ${actor.displayName}] ${text}`;

        await ref.update({
            notes: existing ? `${existing}\n\n${entry}` : entry,
            lastContactDate: new Date().toISOString(),
        });

        refresh(id);
        return { ok: true, message: 'Note added.' };
    } catch (error) {
        return fail(error);
    }
}

export async function setEstimatedValue(id: string, value: number): Promise<LeadActionResult> {
    try {
        await requireRole(OPS_ROLES);
        if (!Number.isFinite(value) || value < 0) throw new Error('Enter a valid amount.');

        const ref = await leadRef(id);
        await ref.update({ estimatedValue: Math.round(value) });
        refresh(id);
        return { ok: true, message: 'Estimated value updated.' };
    } catch (error) {
        return fail(error);
    }
}
