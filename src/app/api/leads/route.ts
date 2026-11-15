import { NextResponse } from 'next/server';
import { makeProfileToken, saveLead } from '@/lib/leads-store';

export const runtime = 'nodejs';

const hits = new Map<string, number[]>();
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 8) return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this in

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const channel = clean(body.channel, 60) || 'Website form';
  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  if (!phone && !email) return NextResponse.json({ error: 'Please enter a phone number or email.' }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 });
  if (phone && phone.replace(/\D/g, '').length < 7) return NextResponse.json({ error: 'That phone number does not look right.' }, { status: 400 });
  if (channel === 'Company Profile' && (!email || !phone)) return NextResponse.json({ error: 'Please enter both your phone and email.' }, { status: 400 });

  await saveLead({ name, email, phone, channel, message: clean(body.message, 2000), interest: clean(body.interest, 120) });
  return NextResponse.json({ ok: true, token: channel === 'Company Profile' ? makeProfileToken() : undefined });
}
