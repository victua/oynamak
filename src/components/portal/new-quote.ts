import { portalApi } from './use-collection';
import type { Customer, Quote } from '@/lib/portal-types';

/** Creates a draft quote with the next number, optionally filled from a customer. */
export async function createDraftQuote(c?: Customer): Promise<Quote> {
  const list = await fetch('/api/portal/quotes').then((r) => r.json());
  const n = ((list.items as Quote[] | undefined) ?? []).length + 1;
  return portalApi.create<Quote>('quotes', {
    number: `OYN-Q-${String(n).padStart(4, '0')}`, status: 'Draft',
    customerId: c?.id ?? '', customerName: c?.name ?? '', customerOrg: c?.organisation ?? '', customerEmail: c?.email ?? '', customerPhone: c?.phone ?? '', customerAddress: c?.address ?? '',
    date: new Date().toISOString().slice(0, 10), validDays: 30, items: [{ description: '', qty: 1, unitPrice: 0 }], includeVat: true,
    notes: 'Prices are in Kenya shillings. Payment terms: 50% to confirm the order, balance on delivery.',
  });
}
