'use server';

// Ops mutations for customers. Each re-verifies the session and role — the
// Admin SDK bypasses Firestore rules, so requireRole is the enforcement.

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
import { requireRole } from '@/lib/auth-server';
import { OPS_ROLES } from '@/lib/roles';
import {
    CUSTOMERS_COLLECTION, CUSTOMER_STATUSES, PORTFOLIO_SERVICES, PORTFOLIO_STATUSES,
    createCustomer, customerForLead, getCustomer, writePortfolio,
} from '@/lib/customers-server';
import { LEADS_COLLECTION } from '@/lib/leads-server';
import type { CustomerStatus, PortfolioItem } from '@/lib/types';

export type CustomerActionResult =
    | { ok: true; message: string; customerId?: string }
    | { ok: false; error: string };

function fail(error: unknown): CustomerActionResult {
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' };
}

function refresh(id?: string) {
    revalidatePath('/ops/customers');
    if (id) revalidatePath(`/ops/customers/${id}`);
}

async function customerRef(id: string) {
    const ref = adminDb.collection(CUSTOMERS_COLLECTION).doc(id);
    if (!(await ref.get()).exists) throw new Error('That customer no longer exists.');
    return ref;
}

/**
 * Promote a lead into a customer. Idempotent by design: converting twice
 * returns the existing customer rather than creating a duplicate, since the
 * button is easy to double-click and a duplicate customer record is painful
 * to unpick.
 */
export async function convertLeadToCustomer(leadId: string): Promise<CustomerActionResult> {
    try {
        await requireRole(OPS_ROLES);

        const existing = await customerForLead(leadId);
        if (existing) {
            return {
                ok: true,
                customerId: existing.id,
                message: `Already converted — customer #${String(existing.customerNumber).padStart(3, '0')}.`,
            };
        }

        const leadRef = adminDb.collection(LEADS_COLLECTION).doc(leadId);
        const leadSnap = await leadRef.get();
        if (!leadSnap.exists) throw new Error('That lead no longer exists.');
        const lead = leadSnap.data()!;

        const { id, customerNumber } = await createCustomer({
            name: lead.name ?? '',
            email: lead.email ?? '',
            phone: lead.phone ?? '',
            source: 'Lead Conversion',
            leadId,
            ...(lead.assignedAdvisor || lead.assignedTo ? { assignedAdvisor: lead.assignedTo } : {}),
            ...(lead.notes ? { notes: lead.notes } : {}),
        });

        await leadRef.update({ status: 'Converted', lastContactDate: new Date().toISOString() });

        revalidatePath('/ops/leads');
        revalidatePath(`/ops/leads/${leadId}`);
        refresh(id);

        return {
            ok: true,
            customerId: id,
            message: `Converted to customer #${String(customerNumber).padStart(3, '0')}.`,
        };
    } catch (error) {
        return fail(error);
    }
}

export async function setCustomerStatus(id: string, status: CustomerStatus): Promise<CustomerActionResult> {
    try {
        await requireRole(OPS_ROLES);
        if (!CUSTOMER_STATUSES.includes(status)) throw new Error('Unknown status.');

        await (await customerRef(id)).update({ status });
        refresh(id);
        return { ok: true, message: `Status set to ${status}.` };
    } catch (error) {
        return fail(error);
    }
}

export async function setCustomerAdvisor(id: string, advisor: string): Promise<CustomerActionResult> {
    try {
        await requireRole(OPS_ROLES);
        await (await customerRef(id)).update({ assignedAdvisor: advisor.trim() });
        refresh(id);
        return { ok: true, message: advisor.trim() ? `Assigned to ${advisor.trim()}.` : 'Advisor cleared.' };
    } catch (error) {
        return fail(error);
    }
}

export async function addCustomerNote(id: string, note: string): Promise<CustomerActionResult> {
    try {
        const actor = await requireRole(OPS_ROLES);
        const text = note.trim();
        if (!text) throw new Error('Write something first.');

        const ref = await customerRef(id);
        const existing = (await ref.get()).data()?.notes ?? '';
        const stamp = new Date().toLocaleString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
        const entry = `[${stamp} — ${actor.displayName}] ${text}`;

        await ref.update({ notes: existing ? `${existing}\n\n${entry}` : entry });
        refresh(id);
        return { ok: true, message: 'Note added.' };
    } catch (error) {
        return fail(error);
    }
}

export type PortfolioInput = {
    service: PortfolioItem['service'];
    productName: string;
    status: PortfolioItem['status'];
    value: number;
    startDate: string;
    maturityDate?: string;
    notes?: string;
};

export async function addPortfolioItem(
    customerId: string,
    input: PortfolioInput,
): Promise<CustomerActionResult> {
    try {
        await requireRole(OPS_ROLES);

        if (!PORTFOLIO_SERVICES.includes(input.service)) throw new Error('Unknown service.');
        if (!PORTFOLIO_STATUSES.includes(input.status)) throw new Error('Unknown status.');
        if (!input.productName.trim()) throw new Error('Enter a product name.');
        if (!Number.isFinite(input.value) || input.value < 0) throw new Error('Enter a valid value.');

        const customer = await getCustomer(customerId);
        if (!customer) throw new Error('That customer no longer exists.');

        const item: PortfolioItem = {
            id: randomUUID(),
            service: input.service,
            productName: input.productName.trim(),
            status: input.status,
            value: Math.round(input.value),
            startDate: input.startDate || new Date().toISOString().slice(0, 10),
            ...(input.maturityDate ? { maturityDate: input.maturityDate } : {}),
            ...(input.notes?.trim() ? { notes: input.notes.trim() } : {}),
        };

        await writePortfolio(customerId, [...customer.portfolioItems, item]);
        refresh(customerId);
        return { ok: true, message: 'Portfolio item added.' };
    } catch (error) {
        return fail(error);
    }
}

export async function removePortfolioItem(
    customerId: string,
    itemId: string,
): Promise<CustomerActionResult> {
    try {
        await requireRole(OPS_ROLES);
        const customer = await getCustomer(customerId);
        if (!customer) throw new Error('That customer no longer exists.');

        const remaining = customer.portfolioItems.filter((i) => i.id !== itemId);
        if (remaining.length === customer.portfolioItems.length) {
            throw new Error('That portfolio item no longer exists.');
        }

        await writePortfolio(customerId, remaining);
        refresh(customerId);
        return { ok: true, message: 'Portfolio item removed.' };
    } catch (error) {
        return fail(error);
    }
}
