'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollection, portalApi } from '@/components/portal/use-collection';
import { Empty, PageTitle, Panel, StatusBadge, fmtDate } from '@/components/portal/bits';
import type { Enquiry } from '@/lib/portal-types';

export default function EnquiriesPage() {
  const { items, loading, error, update, remove, reload } = useCollection<Enquiry>('enquiries');
  const router = useRouter();
  const [q, setQ] = useState('');
  const rows = items.filter((e) => `${e.name} ${e.email} ${e.phone} ${e.channel}`.toLowerCase().includes(q.toLowerCase()));

  const makeLead = async (e: Enquiry) => {
    await portalApi.create('leads', { name: e.name, email: e.email, phone: e.phone, interest: e.interest ?? '', source: e.channel, notes: e.message ?? '', status: 'New', enquiryId: e.id });
    await update(e.id, { status: 'Converted' });
    router.push('/portal/leads');
  };

  return (
    <>
      <PageTitle title="Enquiries" sub="Everyone who filled in a form or downloaded the profile on the website.">
        <Button variant="outline" onClick={reload}>Refresh</Button>
      </PageTitle>
      <Input placeholder="Search by name, email or phone" value={q} onChange={(e) => setQ(e.target.value)} className="mb-4 h-11 max-w-md bg-white" />
      <Panel className="overflow-x-auto p-0 md:p-0">
        {rows.length === 0 ? <Empty loading={loading} error={error} text="No enquiries yet." /> : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
              <tr><th className="p-4">Who</th><th className="p-4">Contact</th><th className="p-4">Came from</th><th className="p-4">Date</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-b align-top last:border-0">
                  <td className="p-4"><div className="font-semibold">{e.name}</div>{e.message && <div className="mt-1 max-w-xs text-xs text-muted-foreground">{e.message}</div>}</td>
                  <td className="p-4">{e.phone && <a className="block hover:text-accent" href={`tel:${e.phone}`}>{e.phone}</a>}{e.email && <a className="block hover:text-accent" href={`mailto:${e.email}`}>{e.email}</a>}</td>
                  <td className="p-4">{e.channel}</td>
                  <td className="p-4 whitespace-nowrap">{fmtDate(e.createdAt)}</td>
                  <td className="p-4"><StatusBadge status={e.status} /></td>
                  <td className="p-4"><div className="flex flex-wrap justify-end gap-1">
                    {e.status !== 'Converted' && <Button size="sm" onClick={() => makeLead(e)}>Make lead</Button>}
                    {e.status === 'New' && <Button size="sm" variant="outline" onClick={() => update(e.id, { status: 'Handled' })}>Handled</Button>}
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete the enquiry from ${e.name}?`) && remove(e.id)}>Delete</Button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </>
  );
}
