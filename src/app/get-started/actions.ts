'use server';

// Public lead capture. This is the only path by which an inquiry from the
// website reaches the business, so it validates carefully and never throws
// past the caller — a failed write must not look like a success to a visitor.

import { createLead, LEAD_SERVICES } from '@/lib/leads-server';
import type { LeadService } from '@/lib/types';

export type SubmitLeadResult =
    | { ok: true; leadNumber: number }
    | { ok: false; error: string };

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function submitLead(input: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message?: string;
}): Promise<SubmitLeadResult> {
    try {
        const name = input.name?.trim() ?? '';
        const email = input.email?.trim().toLowerCase() ?? '';
        const phone = input.phone?.trim() ?? '';
        const message = input.message?.trim() ?? '';
        const service = input.service?.trim() ?? '';

        if (name.length < 2) return { ok: false, error: 'Please enter your full name.' };
        if (!EMAIL.test(email)) return { ok: false, error: 'Please enter a valid email address.' };
        if (phone.replace(/\D/g, '').length < 7) return { ok: false, error: 'Please enter a valid phone number.' };
        if (!service) return { ok: false, error: 'Please choose an area of interest.' };

        // Keep unrecognised values rather than rejecting: a renamed option on
        // the form should never cost a real inquiry.
        const resolved = (LEAD_SERVICES as string[]).includes(service)
            ? (service as LeadService)
            : ('Other' as LeadService);

        const { leadNumber } = await createLead({
            name,
            email,
            phone,
            service: resolved,
            source: 'Website',
            ...(message ? { message: message.slice(0, 5000) } : {}),
        });

        return { ok: true, leadNumber };
    } catch (error) {
        console.error('[submitLead] could not save lead:', error);
        return {
            ok: false,
            error: 'We could not save your inquiry just now. Please try again, or email us directly.',
        };
    }
}
