'use client';

import { useCallback, useEffect, useState } from 'react';

export type Col = 'enquiries' | 'leads' | 'customers' | 'quotes';

async function call<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'Content-Type': 'application/json' } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data as T;
}

export const portalApi = {
  create: <T,>(col: Col, body: object) => call<{ item: T }>(`/api/portal/${col}`, { method: 'POST', body: JSON.stringify(body) }).then((d) => d.item),
  get: <T,>(col: Col, id: string) => call<{ item: T }>(`/api/portal/${col}/${id}`).then((d) => d.item),
  update: <T,>(col: Col, id: string, patch: object) => call<{ item: T }>(`/api/portal/${col}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }).then((d) => d.item),
  remove: (col: Col, id: string) => call<{ ok: true }>(`/api/portal/${col}/${id}`, { method: 'DELETE' }),
};

export function useCollection<T extends { id: string }>(col: Col) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    try {
      const d = await call<{ items: T[] }>(`/api/portal/${col}`);
      setItems(d.items); setError('');
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not load.'); }
    finally { setLoading(false); }
  }, [col]);

  useEffect(() => { reload(); }, [reload]);

  return {
    items, loading, error, reload,
    create: async (body: object) => { const it = await portalApi.create<T>(col, body); await reload(); return it; },
    update: async (id: string, patch: object) => { await portalApi.update<T>(col, id, patch); await reload(); },
    remove: async (id: string) => { await portalApi.remove(col, id); await reload(); },
  };
}
