import { NextResponse } from 'next/server';
import { guard } from '@/lib/auth-server';
import { createDoc, isCol, listDocs } from '@/lib/portal-store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const fail = (err: unknown) => NextResponse.json({ error: err instanceof Error ? err.message : 'Database error.' }, { status: 500 });

export async function GET(_: Request, { params }: { params: Promise<{ col: string }> }) {
  const { col } = await params;
  const g = await guard();
  if ('res' in g) return g.res;
  if (!isCol(col)) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  try { return NextResponse.json({ items: await listDocs(col) }); } catch (e) { return fail(e); }
}

export async function POST(req: Request, { params }: { params: Promise<{ col: string }> }) {
  const { col } = await params;
  const g = await guard();
  if ('res' in g) return g.res;
  if (!isCol(col)) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  try {
    const { id: _id, ...data } = await req.json();
    return NextResponse.json({ item: await createDoc(col, data) });
  } catch (e) { return fail(e); }
}
