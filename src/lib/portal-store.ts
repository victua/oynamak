import 'server-only';
import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { adminApp } from './firebase-admin';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

export const COLLECTIONS = ['enquiries', 'leads', 'customers', 'quotes'] as const;
export type Col = (typeof COLLECTIONS)[number] | 'users' | 'sessions';
export type Doc = { id: string; [k: string]: unknown };

const db = (): Firestore => getFirestore(adminApp(), process.env.LEADS_DATABASE_ID || 'oynamak-portal');

// Local file store: used only while developing, when Firestore is not reachable.
let useFile = process.env.PORTAL_STORE === 'file';
const FILE = path.join(process.cwd(), '.data', 'portal.json');
type FileData = Record<string, Record<string, Doc>>;
const readFileData = async (): Promise<FileData> => { try { return JSON.parse(await fs.readFile(FILE, 'utf8')); } catch { return {}; } };
const writeFileData = async (d: FileData) => { await fs.mkdir(path.dirname(FILE), { recursive: true }); await fs.writeFile(FILE, JSON.stringify(d, null, 2)); };

async function run<T>(remote: () => Promise<T>, local: () => Promise<T>): Promise<T> {
  if (useFile) return local();
  try { return await remote(); } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Firestore not reachable, using the local file store:', err instanceof Error ? err.message : err);
      useFile = true;
      return local();
    }
    throw err;
  }
}

/** Only these are reachable through the generic portal API. */
export const isCol = (c: string): c is Col => (COLLECTIONS as readonly string[]).includes(c);

export function listDocs(col: Col): Promise<Doc[]> {
  return run(
    async () => (await db().collection(col).orderBy('createdAt', 'desc').limit(1000).get()).docs.map((d) => ({ ...d.data(), id: d.id }) as Doc),
    async () => Object.values((await readFileData())[col] ?? {}).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))),
  );
}

export function getDocById(col: Col, id: string): Promise<Doc | null> {
  return run(
    async () => { const s = await db().collection(col).doc(id).get(); return s.exists ? ({ ...s.data(), id: s.id } as Doc) : null; },
    async () => (await readFileData())[col]?.[id] ?? null,
  );
}

export function createDoc(col: Col, data: Record<string, unknown>): Promise<Doc> {
  const now = new Date().toISOString();
  const body = { ...data, createdAt: now, updatedAt: now };
  return run(
    async () => { const ref = await db().collection(col).add(body); return { ...body, id: ref.id }; },
    async () => { const all = await readFileData(); const id = randomUUID(); (all[col] ??= {})[id] = { ...body, id }; await writeFileData(all); return { ...body, id }; },
  );
}

export function updateDocById(col: Col, id: string, patch: Record<string, unknown>): Promise<Doc | null> {
  const body = { ...patch, updatedAt: new Date().toISOString() };
  return run(
    async () => {
      const ref = db().collection(col).doc(id);
      if (!(await ref.get()).exists) return null;
      await ref.set(body, { merge: true });
      return { ...(await ref.get()).data(), id } as Doc;
    },
    async () => { const all = await readFileData(); const cur = all[col]?.[id]; if (!cur) return null; all[col][id] = { ...cur, ...body, id }; await writeFileData(all); return all[col][id]; },
  );
}

export function deleteDocById(col: Col, id: string): Promise<void> {
  return run(
    async () => { await db().collection(col).doc(id).delete(); },
    async () => { const all = await readFileData(); if (all[col]) delete all[col][id]; await writeFileData(all); },
  );
}

/** Create or replace a document with a chosen id (used for team members, keyed by email). */
export function setDocById(col: Col, id: string, data: Record<string, unknown>): Promise<Doc> {
  const now = new Date().toISOString();
  const body = { ...data, createdAt: now, updatedAt: now };
  return run(
    async () => { await db().collection(col).doc(id).set(body); return { ...body, id }; },
    async () => { const all = await readFileData(); (all[col] ??= {})[id] = { ...body, id }; await writeFileData(all); return { ...body, id }; },
  );
}
