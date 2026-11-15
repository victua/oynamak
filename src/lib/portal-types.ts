export const leadStatuses = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'] as const;
export const quoteStatuses = ['Draft', 'Sent', 'Accepted', 'Declined'] as const;
export const enquiryStatuses = ['New', 'Handled'] as const;

type Base = { id: string; createdAt: string; updatedAt?: string };

export type Enquiry = Base & {
  name: string; email: string; phone: string; channel: string;
  message?: string; interest?: string; status: (typeof enquiryStatuses)[number] | 'Converted';
};
export type Lead = Base & {
  name: string; organisation?: string; email: string; phone: string; interest?: string;
  source?: string; notes?: string; status: (typeof leadStatuses)[number];
};
export type Customer = Base & {
  name: string; organisation?: string; email: string; phone: string; address?: string; notes?: string;
};
export type QuoteItem = { description: string; qty: number; unitPrice: number };
export type Quote = Base & {
  number: string; status: (typeof quoteStatuses)[number];
  customerId?: string; customerName: string; customerOrg?: string; customerEmail?: string; customerPhone?: string; customerAddress?: string;
  date: string; validDays: number; items: QuoteItem[]; includeVat: boolean; notes?: string;
};

export const VAT_RATE = 0.16;
export const quoteTotals = (q: Pick<Quote, 'items' | 'includeVat'>) => {
  const subtotal = q.items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.unitPrice) || 0), 0);
  const vat = q.includeVat ? subtotal * VAT_RATE : 0;
  return { subtotal, vat, total: subtotal + vat };
};
export const money = (n: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 2 }).format(n || 0);
