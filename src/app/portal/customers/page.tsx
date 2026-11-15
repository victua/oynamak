'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCollection } from '@/components/portal/use-collection';
import { createDraftQuote } from '@/components/portal/new-quote';
import { Empty, PageTitle, Panel, fmtDate } from '@/components/portal/bits';
import { RecordDialog, type Field } from '@/components/portal/record-dialog';
import type { Customer } from '@/lib/portal-types';

const fields: Field[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'organisation', label: 'Club, school or company' },
  { key: 'phone', label: 'Phone', type: 'tel' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'address', label: 'Address', type: 'textarea' },
  { key: 'notes', label: 'Notes', type: 'textarea' },
];

export default function CustomersPage() {
  const { items, loading, error, create, update, remove } = useCollection<Customer>('customers');
  const router = useRouter();
  const [q, setQ] = useState('');
  const [dlg, setDlg] = useState<{ c?: Customer } | null>(null);
  const rows = items.filter((c) => `${c.name} ${c.organisation} ${c.email} ${c.phone}`.toLowerCase().includes(q.toLowerCase()));

  const newQuote = async (c: Customer) => {
    const quote = await createDraftQuote(c);
    router.push(`/portal/quotes/${quote.id}`);
  };

  return (
    <>
      <PageTitle title="Customers" sub="Clubs, schools, federations and brands you work with.">
        <Button onClick={() => setDlg({})}><Plus className="mr-1 h-4 w-4" />Add customer</Button>
      </PageTitle>
      <Input placeholder="Search customers" value={q} onChange={(e) => setQ(e.target.value)} className="mb-4 h-11 max-w-md bg-white" />
      <Panel className="overflow-x-auto p-0 md:p-0">
        {rows.length === 0 ? <Empty loading={loading} error={error} text="No customers yet. Turn a lead into a customer when they say yes." /> : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
              <tr><th className="p-4">Customer</th><th className="p-4">Contact</th><th className="p-4">Since</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b align-top last:border-0">
                  <td className="p-4"><div className="font-semibold">{c.name}</div>{c.organisation && <div className="text-xs text-muted-foreground">{c.organisation}</div>}</td>
                  <td className="p-4">{c.phone && <a className="block hover:text-accent" href={`tel:${c.phone}`}>{c.phone}</a>}{c.email && <a className="block hover:text-accent" href={`mailto:${c.email}`}>{c.email}</a>}</td>
                  <td className="p-4 whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                  <td className="p-4"><div className="flex flex-wrap justify-end gap-1">
                    <Button size="sm" onClick={() => newQuote(c)}>New quote</Button>
                    <Button size="sm" variant="outline" onClick={() => setDlg({ c })}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete ${c.name}?`) && remove(c.id)}>Delete</Button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
      <RecordDialog
        open={!!dlg} onOpenChange={(v) => !v && setDlg(null)} title={dlg?.c ? 'Edit customer' : 'Add customer'} fields={fields}
        initial={{ name: '', organisation: '', phone: '', email: '', address: '', notes: '', ...(dlg?.c as unknown as Record<string, string>) }}
        onSave={async (v) => { if (dlg?.c) await update(dlg.c.id, v); else await create(v); }}
      />
    </>
  );
}
