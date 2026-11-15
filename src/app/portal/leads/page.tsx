'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCollection, portalApi } from '@/components/portal/use-collection';
import { Empty, PageTitle, Panel, fmtDate } from '@/components/portal/bits';
import { RecordDialog, type Field } from '@/components/portal/record-dialog';
import { leadStatuses, type Lead } from '@/lib/portal-types';

const fields: Field[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'organisation', label: 'Club, school or company' },
  { key: 'phone', label: 'Phone', type: 'tel' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'interest', label: 'Interested in' },
  { key: 'status', label: 'Stage', type: 'select', options: leadStatuses },
  { key: 'notes', label: 'Notes', type: 'textarea' },
];

export default function LeadsPage() {
  const { items, loading, error, create, update, remove } = useCollection<Lead>('leads');
  const router = useRouter();
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('all');
  const [dlg, setDlg] = useState<{ lead?: Lead } | null>(null);
  const rows = items.filter((l) => (stage === 'all' || l.status === stage) && `${l.name} ${l.organisation} ${l.email} ${l.phone}`.toLowerCase().includes(q.toLowerCase()));

  const makeCustomer = async (l: Lead) => {
    await portalApi.create('customers', { name: l.name, organisation: l.organisation ?? '', email: l.email, phone: l.phone, notes: l.notes ?? '', leadId: l.id });
    await update(l.id, { status: 'Won' });
    router.push('/portal/customers');
  };

  return (
    <>
      <PageTitle title="Leads" sub="People worth following up. Move them along until they win or drop out.">
        <Button onClick={() => setDlg({})}><Plus className="mr-1 h-4 w-4" />Add lead</Button>
      </PageTitle>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Search leads" value={q} onChange={(e) => setQ(e.target.value)} className="h-11 max-w-md bg-white" />
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="h-11 w-full bg-white sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All stages</SelectItem>{leadStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <Panel className="overflow-x-auto p-0 md:p-0">
        {rows.length === 0 ? <Empty loading={loading} error={error} text="No leads yet. Turn an enquiry into a lead, or add one." /> : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
              <tr><th className="p-4">Lead</th><th className="p-4">Contact</th><th className="p-4">Interested in</th><th className="p-4">Stage</th><th className="p-4">Added</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-b align-top last:border-0">
                  <td className="p-4"><div className="font-semibold">{l.name}</div>{l.organisation && <div className="text-xs text-muted-foreground">{l.organisation}</div>}</td>
                  <td className="p-4">{l.phone && <a className="block hover:text-accent" href={`tel:${l.phone}`}>{l.phone}</a>}{l.email && <a className="block hover:text-accent" href={`mailto:${l.email}`}>{l.email}</a>}</td>
                  <td className="p-4">{l.interest || l.source}</td>
                  <td className="p-4">
                    <Select value={l.status} onValueChange={(v) => update(l.id, { status: v })}>
                      <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{leadStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 whitespace-nowrap">{fmtDate(l.createdAt)}</td>
                  <td className="p-4"><div className="flex flex-wrap justify-end gap-1">
                    <Button size="sm" variant="outline" onClick={() => setDlg({ lead: l })}>Edit</Button>
                    <Button size="sm" onClick={() => makeCustomer(l)}>Make customer</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete ${l.name}?`) && remove(l.id)}>Delete</Button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
      <RecordDialog
        open={!!dlg} onOpenChange={(v) => !v && setDlg(null)} title={dlg?.lead ? 'Edit lead' : 'Add lead'} fields={fields}
        initial={{ name: '', organisation: '', phone: '', email: '', interest: '', status: 'New', notes: '', ...(dlg?.lead as unknown as Record<string, string>) }}
        onSave={async (v) => { if (dlg?.lead) await update(dlg.lead.id, v); else await create({ ...v, source: 'Added by staff' }); }}
      />
    </>
  );
}
