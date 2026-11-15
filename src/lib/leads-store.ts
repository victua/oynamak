import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { createDoc } from './portal-store';

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  interest?: string;
  channel: string;
};

/** Saves a website enquiry. It is always written to the logs too, so one is never lost if the database is not ready. */
export async function saveLead(lead: LeadInput): Promise<{ stored: boolean }> {
  const doc = { ...lead, status: 'New' };
  console.log('ENQUIRY', JSON.stringify({ ...doc, at: new Date().toISOString() }));
  try {
    await createDoc('enquiries', doc);
    return { stored: true };
  } catch (err) {
    console.error('Enquiry database write failed:', err instanceof Error ? err.message : err);
    return { stored: false };
  }
}

// Short-lived download links for the company profile
const secret = () => process.env.LEAD_TOKEN_SECRET || 'oynamak-profile-link';
const sign = (exp: string) => createHmac('sha256', secret()).update(exp).digest('hex').slice(0, 32);

export function makeProfileToken(minutes = 15): string {
  const exp = String(Date.now() + minutes * 60_000);
  return `${exp}.${sign(exp)}`;
}

export function checkProfileToken(token: string | null): boolean {
  if (!token) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}
