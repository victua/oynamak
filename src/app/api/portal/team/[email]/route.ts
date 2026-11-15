import { NextResponse } from 'next/server';
import { ADMIN_EMAILS, guard } from '@/lib/auth-server';
import { deleteDocById, updateDocById } from '@/lib/portal-store';

export const runtime = 'nodejs';
type Ctx = { params: Promise<{ email: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const g = await guard('admin');
  if ('res' in g) return g.res;
  const email = decodeURIComponent((await params).email).toLowerCase();
  if (ADMIN_EMAILS.includes(email)) return NextResponse.json({ error: 'The founding admins cannot be changed.' }, { status: 400 });
  const { role } = await req.json();
  await updateDocById('users', email, { role: role === 'admin' ? 'admin' : 'staff' });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: Ctx) {
  const g = await guard('admin');
  if ('res' in g) return g.res;
  const email = decodeURIComponent((await params).email).toLowerCase();
  if (ADMIN_EMAILS.includes(email)) return NextResponse.json({ error: 'The founding admins cannot be removed.' }, { status: 400 });
  if (email === g.user.email) return NextResponse.json({ error: 'You cannot remove yourself.' }, { status: 400 });
  await deleteDocById('users', email);
  return NextResponse.json({ ok: true });
}
