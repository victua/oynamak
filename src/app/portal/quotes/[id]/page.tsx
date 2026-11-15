'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Printer, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { portalApi, useCollection } from '@/components/portal/use-collection';
import { PageTitle, Panel } from '@/components/portal/bits';
import { money, quoteStatuses, quoteTotals, VAT_RATE, type Customer, type Quote } from '@/lib/portal-types';
import { siteConfig } from '@/lib/site-config';

const addDays = (iso: string, d: number) => { const t = new Date(iso); t.setDate(t.getDate() + d); return t.toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }); };
const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' });

export default function QuoteEditor() {
  const { id } = useParams<{ id: string }>();
  const [q, setQ] = useState<Quote | null>(null);
  const [saved, setSaved] = useState(true);
  const [msg, setMsg] = useState('');
  const customers = useCollection<Customer>('customers');

  useEffect(() => { portalApi.get<Quote>('quotes', id).then(setQ).catch((e) => setMsg(e.message)); }, [id]);
  if (!q) return <p className="py-10 text-center text-sm text-muted-foreground">{msg || 'Loading...'}</p>;

  const set = (patch: Partial<Quote>) => { setQ({ ...q, ...patch }); setSaved(false); };
  const setItem = (i: number, patch: Partial<Quote['items'][number]>) => set({ items: q.items.map((it, n) => (n === i ? { ...it, ...patch } : it)) });
  const save = async () => { try { await portalApi.update('quotes', id, q); setSaved(true); setMsg('Saved'); } catch (e) { setMsg(e instanceof Error ? e.message : 'Could not save.'); } };
  const pick = (cid: string) => {
    const c = customers.items.find((x) => x.id === cid);
    if (c) set({ customerId: c.id, customerName: c.name, customerOrg: c.organisation ?? '', customerEmail: c.email, customerPhone: c.phone, customerAddress: c.address ?? '' });
  };
  const t = quoteTotals(q);

  return (
    <>
      <PageTitle title={q.number} sub={saved ? msg || 'All changes saved' : 'You have unsaved changes'}>
        <Button variant="outline" asChild><Link href="/portal/quotes"><ArrowLeft className="mr-1 h-4 w-4" />All quotes</Link></Button>
        <Button variant="outline" onClick={save} disabled={saved}>Save</Button>
        <Button onClick={async () => { if (!saved) await save(); window.print(); }}><Printer className="mr-1 h-4 w-4" />Print / save as PDF</Button>
      </PageTitle>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,26rem)_1fr]">
        <div className="no-print space-y-4">
          <Panel className="space-y-3">
            <h2 className="font-bold text-primary">Customer</h2>
            <Select value={q.customerId || ''} onValueChange={pick}>
              <SelectTrigger className="h-11"><SelectValue placeholder="Pick a customer" /></SelectTrigger>
              <SelectContent>{customers.items.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}{c.organisation ? ` (${c.organisation})` : ''}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Name" value={q.customerName} onChange={(e) => set({ customerName: e.target.value })} className="h-11" />
            <Input placeholder="Club, school or company" value={q.customerOrg ?? ''} onChange={(e) => set({ customerOrg: e.target.value })} className="h-11" />
            <Input placeholder="Email" value={q.customerEmail ?? ''} onChange={(e) => set({ customerEmail: e.target.value })} className="h-11" />
            <Input placeholder="Phone" value={q.customerPhone ?? ''} onChange={(e) => set({ customerPhone: e.target.value })} className="h-11" />
            <Textarea placeholder="Address" value={q.customerAddress ?? ''} onChange={(e) => set({ customerAddress: e.target.value })} />
          </Panel>
          <Panel className="space-y-3">
            <h2 className="font-bold text-primary">Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-semibold">Date</label><Input type="date" value={q.date} onChange={(e) => set({ date: e.target.value })} className="h-11" /></div>
              <div><label className="text-xs font-semibold">Valid for (days)</label><Input type="number" min={1} value={q.validDays} onChange={(e) => set({ validDays: Number(e.target.value) || 30 })} className="h-11" /></div>
            </div>
            <Select value={q.status} onValueChange={(v) => set({ status: v as Quote['status'] })}>
              <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
              <SelectContent>{quoteStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            <label className="flex items-center gap-2 text-sm"><Checkbox checked={q.includeVat} onCheckedChange={(v) => set({ includeVat: v === true })} />Add VAT ({VAT_RATE * 100}%)</label>
          </Panel>
          <Panel className="space-y-3">
            <h2 className="font-bold text-primary">Items</h2>
            {q.items.map((it, i) => (
              <div key={i} className="space-y-2 rounded-brand-btn border p-3">
                <Input placeholder="What are you quoting for?" value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} className="h-10" />
                <div className="flex items-center gap-2">
                  <Input type="number" min={0} aria-label="Quantity" value={it.qty} onChange={(e) => setItem(i, { qty: Number(e.target.value) })} className="h-10 w-20" />
                  <span className="text-xs">×</span>
                  <Input type="number" min={0} aria-label="Unit price" value={it.unitPrice} onChange={(e) => setItem(i, { unitPrice: Number(e.target.value) })} className="h-10" />
                  <Button size="icon" variant="ghost" aria-label="Remove item" onClick={() => set({ items: q.items.filter((_, n) => n !== i) })}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => set({ items: [...q.items, { description: '', qty: 1, unitPrice: 0 }] })}><Plus className="mr-1 h-4 w-4" />Add item</Button>
          </Panel>
          <Panel className="space-y-2">
            <h2 className="font-bold text-primary">Notes and terms</h2>
            <Textarea className="min-h-[100px]" value={q.notes ?? ''} onChange={(e) => set({ notes: e.target.value })} />
          </Panel>
        </div>

        <div className="overflow-x-auto">
          <div className="preview-zoom origin-top-left" style={{ '--z': 0.85 } as React.CSSProperties}>
            <div className="print-area" style={{ width: '210mm', minHeight: '297mm', background: '#fff', padding: '16mm 18mm', color: '#14233f', fontFamily: 'var(--font-montserrat)', boxShadow: '0 4px 24px rgba(0,0,0,.12)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <img src="/images/logo.png" alt="Oynamak Sports Group" style={{ height: '22mm' }} />
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '26pt', fontWeight: 800, color: '#0B2D61', lineHeight: 1 }}>QUOTE</div>
                  <div style={{ fontSize: '10pt', marginTop: '2mm', fontWeight: 600 }}>{q.number}</div>
                  <div style={{ fontSize: '9pt', color: '#5b6b8c' }}>Date: {longDate(q.date)}</div>
                  <div style={{ fontSize: '9pt', color: '#5b6b8c' }}>Valid until: {addDays(q.date, q.validDays)}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12mm', fontSize: '9.5pt', lineHeight: 1.6 }}>
                <div>
                  <div style={{ fontSize: '8pt', fontWeight: 700, letterSpacing: '.12em', color: '#D93846' }}>QUOTE FOR</div>
                  <div style={{ fontWeight: 700 }}>{q.customerName || 'Customer name'}</div>
                  {q.customerOrg && <div>{q.customerOrg}</div>}
                  {q.customerAddress && <div style={{ whiteSpace: 'pre-line' }}>{q.customerAddress}</div>}
                  {q.customerEmail && <div>{q.customerEmail}</div>}
                  {q.customerPhone && <div>{q.customerPhone}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '8pt', fontWeight: 700, letterSpacing: '.12em', color: '#D93846' }}>FROM</div>
                  <div style={{ fontWeight: 700 }}>{siteConfig.fullName}</div>
                  <div>{siteConfig.address}</div><div>{siteConfig.email}</div>
                </div>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10mm', fontSize: '9.5pt' }}>
                <thead><tr style={{ background: '#0B2D61', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '3mm' }}>Description</th><th style={{ padding: '3mm', textAlign: 'right' }}>Qty</th><th style={{ padding: '3mm', textAlign: 'right' }}>Unit price</th><th style={{ padding: '3mm', textAlign: 'right' }}>Amount</th>
                </tr></thead>
                <tbody>
                  {q.items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: '.3mm solid #dfe6f3' }}>
                      <td style={{ padding: '3mm' }}>{it.description || '-'}</td>
                      <td style={{ padding: '3mm', textAlign: 'right' }}>{it.qty}</td>
                      <td style={{ padding: '3mm', textAlign: 'right' }}>{money(it.unitPrice)}</td>
                      <td style={{ padding: '3mm', textAlign: 'right' }}>{money((it.qty || 0) * (it.unitPrice || 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginLeft: 'auto', width: '75mm', marginTop: '6mm', fontSize: '10pt', lineHeight: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{money(t.subtotal)}</span></div>
                {q.includeVat && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>VAT ({VAT_RATE * 100}%)</span><span>{money(t.vat)}</span></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', background: '#EBF1FA', padding: '1mm 3mm', fontWeight: 800, color: '#0B2D61', fontSize: '12pt' }}><span>Total</span><span>{money(t.total)}</span></div>
              </div>
              {q.notes && <div style={{ marginTop: '12mm', fontSize: '9pt', lineHeight: 1.6, whiteSpace: 'pre-line' }}><div style={{ fontWeight: 700, color: '#0B2D61' }}>Notes and terms</div>{q.notes}</div>}
              <div style={{ position: 'absolute', left: '18mm', right: '18mm', bottom: '12mm', borderTop: '.3mm solid #dfe6f3', paddingTop: '3mm', fontSize: '8pt', color: '#5b6b8c', display: 'flex', justifyContent: 'space-between' }}>
                <span>{siteConfig.fullName} · {siteConfig.address}</span><span>{siteConfig.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
