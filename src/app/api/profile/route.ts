import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { checkProfileToken } from '@/lib/leads-store';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  if (!checkProfileToken(new URL(req.url).searchParams.get('t'))) {
    return NextResponse.json({ error: 'This link has expired. Please request the profile again.' }, { status: 403 });
  }
  const file = await readFile(path.join(process.cwd(), 'private', 'Oynamak-Company-Profile.pdf'));
  return new NextResponse(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Oynamak-Company-Profile.pdf"',
      'Cache-Control': 'private, no-store',
    },
  });
}
