'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCollection } from '@/components/portal/use-collection';
import { createDraftQuote } from '@/components/portal/new-quote';
import { Empty, PageTitle, Panel, fmtDate } from '@/components/portal/bits';
import { money, quoteStatuses, quoteTotals, type Quote } from '@/lib/portal-types';

export default function QuotesPage() {
  const { items, loading, error, update, remove } = useCollection<Quote>('quotes');
  const router = useRouter();
  const start = async () => { const q = await createDraftQuote(); router.push(`/portal/quotes/${q.id}`); };

  return (
    <>
      <PageTitle title="Quotes" sub="Build a quote, print it or save it as a PDF, and track where it stands.">
        <Button onClick={start}><Plus className="mr-1 h-4 w-4" />New quote</Button>
      </PageTitle>
      <Panel className="overflow-x-auto p-0 md:p-0">
        {items.length === 0 ? <Empty loading={loading} error={error} text="No quotes yet." /> : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-secondary/60 text-xs font-bold uppercase tracking-wider text-primary">
              <tr><th className="p-4">Quote</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr>
            </thead>
            <tbody>
              {items.map((q) => (
                <tr key={q.id} className="border-b last:border-0">
                  <td className="p-4 font-mono font-semibold">{q.number}</td>
                  <td className="p-4">{q.customerName || <span className="text-muted-foreground">No customer yet</span>}{q.customerOrg && <div className="text-xs text-muted-foreground">{q.customerOrg}</div>}</td>
                  <td className="p-4 font-semibold">{money(quoteTotals(q).total)}</td>
                  <td className="p-4">
                    <Select value={q.status} onValueChange={(v) => update(q.id, { status: v })}>
                      <SelectTrigger className="h-9 w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>{quoteStatuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 whitespace-nowrap">{fmtDate(q.date)}</td>
                  <td className="p-4"><div className="flex justify-end gap-1">
                    <Button size="sm" asChild><Link href={`/portal/quotes/${q.id}`}>Open</Link></Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => confirm(`Delete ${q.number}?`) && remove(q.id)}>Delete</Button>
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
