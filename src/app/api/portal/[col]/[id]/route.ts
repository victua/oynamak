import { NextResponse } from 'next/server';
import { guard } from '@/lib/auth-server';
import { deleteDocById, getDocById, isCol, updateDocById } from '@/lib/portal-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ col: string; id: string }> };
const fail = (err: unknown) => NextResponse.json({ error: err instanceof Error ? err.message : 'Database error.' }, { status: 500 });
const notFound = () => NextResponse.json({ error: 'Not found.' }, { status: 404 });

export async function GET(_: Request, { params }: Ctx) {
  const { col, id } = await params;
  const g = await guard();
  if ('res' in g) return g.res;
  if (!isCol(col)) return notFound();
  try { const item = await getDocById(col, id); return item ? NextResponse.json({ item }) : notFound(); } catch (e) { return fail(e); }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { col, id } = await params;
  const g = await guard();
  if ('res' in g) return g.res;
  if (!isCol(col)) return notFound();
  try {
    const { id: _id, createdAt: _c, ...patch } = await req.json();
    const item = await updateDocById(col, id, patch);
    return item ? NextResponse.json({ item }) : notFound();
  } catch (e) { return fail(e); }
}

export async function DELETE(_: Request, { params }: Ctx) {
  const { col, id } = await params;
  const g = await guard();
  if ('res' in g) return g.res;
  if (!isCol(col)) return notFound();
  try { await deleteDocById(col, id); return NextResponse.json({ ok: true }); } catch (e) { return fail(e); }
}
