import { NextResponse } from 'next/server';
import { roleFor } from '@/lib/auth-server';

export const runtime = 'nodejs';

/** Tells the sign-in page whether an email is on the team, before it creates a password for it. */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    return NextResponse.json({ allowed: Boolean(await roleFor(String(email || '').trim())) });
  } catch { return NextResponse.json({ allowed: false }); }
}
