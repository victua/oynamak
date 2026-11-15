'use client';

import Link from 'next/link';
import { FileText, Inbox, Target, Users } from 'lucide-react';
import { useCollection } from '@/components/portal/use-collection';
import { Empty, PageTitle, Panel, StatusBadge, fmtDate } from '@/components/portal/bits';
import { money, quoteTotals, type Customer, type Enquiry, type Lead, type Quote } from '@/lib/portal-types';

export default function PortalHome() {
  const enq = useCollection<Enquiry>('enquiries');
  const leads = useCollection<Lead>('leads');
  const customers = useCollection<Customer>('customers');
  const quotes = useCollection<Quote>('quotes');
  const open = quotes.items.filter((q) => q.status === 'Draft' || q.status === 'Sent');
  const openValue = open.reduce((s, q) => s + quoteTotals(q).total, 0);

  const cards = [
    { href: '/portal/enquiries', icon: Inbox, label: 'New enquiries', value: enq.items.filter((e) => e.status === 'New').length },
    { href: '/portal/leads', icon: Target, label: 'Open leads', value: leads.items.filter((l) => l.status !== 'Won' && l.status !== 'Lost').length },
    { href: '/portal/customers', icon: Users, label: 'Customers', value: customers.items.length },
    { href: '/portal/quotes', icon: FileText, label: 'Open quotes', value: open.length, sub: money(openValue) },
  ];
  const err = enq.error || leads.error || customers.error || quotes.error;

  return (
    <>
      <PageTitle title="Dashboard" sub="Everything coming in and going out, in one place." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ href, icon: Icon, label, value, sub }) => (
          <Link key={href} href={href}>
            <Panel className="transition hover:shadow-lg">
              <div className="flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">{label}</span><Icon className="h-5 w-5 text-accent" /></div>
              <div className="mt-3 text-4xl font-extrabold text-primary">{value}</div>
              {sub && <div className="mt-1 text-sm text-muted-foreground">{sub}</div>}
            </Panel>
          </Link>
        ))}
      </div>
      <Panel className="mt-6">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold text-primary">Latest enquiries</h2><Link href="/portal/enquiries" className="text-sm font-semibold text-accent">See all</Link></div>
        {enq.items.length === 0 ? <Empty loading={enq.loading} error={err} text="No enquiries yet. They land here as soon as someone fills in a form on the website." /> : (
          <ul className="divide-y">
            {enq.items.slice(0, 6).map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div><div className="font-semibold">{e.name}</div><div className="text-sm text-muted-foreground">{e.channel} · {fmtDate(e.createdAt)}</div></div>
                <StatusBadge status={e.status} />
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  );
}
