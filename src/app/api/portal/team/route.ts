import { NextResponse } from 'next/server';
import { ADMIN_EMAILS, guard, type Role } from '@/lib/auth-server';
import { listDocs, setDocById } from '@/lib/portal-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const g = await guard();
  if ('res' in g) return g.res;
  try {
    const docs = await listDocs('users');
    const founders = ADMIN_EMAILS.map((email) => ({ email, name: '', role: 'admin' as Role, locked: true }));
    const others = docs.filter((d) => !ADMIN_EMAILS.includes(String(d.email))).map((d) => ({ email: String(d.email), name: String(d.name ?? ''), role: d.role as Role, locked: false }));
    return NextResponse.json({ members: [...founders, ...others], me: g.user });
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : 'Database error.' }, { status: 500 }); }
}

export async function POST(req: Request) {
  const g = await guard('admin');
  if ('res' in g) return g.res;
  const { email, name, role } = await req.json();
  const e = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  if (ADMIN_EMAILS.includes(e)) return NextResponse.json({ error: 'That person is already an admin.' }, { status: 400 });
  await setDocById('users', e, { email: e, name: String(name || '').trim(), role: role === 'admin' ? 'admin' : 'staff', addedBy: g.user.email });
  return NextResponse.json({ ok: true });
}
