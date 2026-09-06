// Server component: the firm snapshot, read through the Admin SDK.
//
// Every figure here is derived from stored leads, customers and events. The
// page previously ran on src/lib/mock-data.ts and showed invented AUM, revenue
// and a hardcoded task feed with staff names; the same reasoning as the client
// portal applies to the console, so those are gone rather than faked. There is
// no revenue KPI because nothing records transactions, and no task feed
// because nothing records tasks.

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  UserCheck, UserPlus, DollarSign, ArrowUpRight,
  TrendingUp, CalendarDays, Clock,
} from "lucide-react";
import { getSession } from "@/lib/auth-server";
import { listLeads } from "@/lib/leads-server";
import { listCustomers } from "@/lib/customers-server";
import { listAllEvents } from "@/lib/events-server";
import type { Lead, LeadStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const statusColors: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
  'Proposal': 'bg-orange-100 text-orange-700 border-orange-200',
  'Converted': 'bg-green-100 text-green-700 border-green-200',
  'Lost': 'bg-red-100 text-red-700 border-red-200',
};

/** Leads in these states are still owed a move by someone. */
const OPEN_STATUSES: LeadStatus[] = ['New', 'Contacted'];

/**
 * Compact money for a KPI tile. Scales the unit so an empty database reads
 * "KES 0" rather than "KES 0.0M".
 */
function money(v: number): string {
  if (v >= 1_000_000) return `KES ${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `KES ${Math.round(v / 1_000)}K`;
  return `KES ${v.toLocaleString()}`;
}

/**
 * Today in Nairobi as yyyy-mm-dd, so it compares directly against the stored
 * event date strings. `toISOString()` would give the UTC day, which flips a
 * few hours early every evening in a UTC+3 office.
 */
function todayInNairobi(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' });
}

/**
 * Whole days waited, floored at 0. Both sides are cut back to their yyyy-mm-dd
 * prefix first: lead dates are stored as full ISO timestamps, and diffing one
 * against today's midnight otherwise loses a day to the clock time.
 */
function daysSince(date: string, today: string): number {
  const from = Date.parse(date.slice(0, 10));
  const to = Date.parse(today);
  if (Number.isNaN(from) || Number.isNaN(to)) return 0;
  return Math.max(0, Math.round((to - from) / 86_400_000));
}

const waitedLabel = (days: number) =>
  days === 0 ? 'Today' : days === 1 ? '1 day' : `${days} days`;

export default async function OpsDashboard() {
  const [session, leads, customers, events] = await Promise.all([
    getSession(),
    listLeads(),
    listCustomers(),
    listAllEvents(),
  ]);

  const today = todayInNairobi();
  const firstName =
    (session.status === "ok" ? session.profile.displayName || session.profile.email || "" : "")
      .split(/[\s@]/)[0];

  const totalAUM = customers.reduce((s, c) => s + (c.totalPortfolioValue || 0), 0);
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const converted = leads.filter(l => l.status === 'Converted').length;
  // No leads means no rate to state — "0%" would read as a failure rather than
  // an absence.
  const conversionRate = leads.length > 0 ? `${Math.round((converted / leads.length) * 100)}%` : '—';
  const upcomingEvents = events.filter(e => e.status === 'Published' && e.date >= today).length;

  const recentLeads = [...leads]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 5);

  // The work queue that replaced the invented task feed: open leads, longest
  // wait since the last touch first.
  const lastTouch = (l: Lead) => l.lastContactDate || l.date;
  const needsAttention = leads
    .filter(l => OPEN_STATUSES.includes(l.status))
    .sort((a, b) => Date.parse(lastTouch(a)) - Date.parse(lastTouch(b)))
    .slice(0, 5);

  const kpis = [
    { label: 'Total AUM', value: money(totalAUM), sub: 'Assets under management', icon: DollarSign },
    { label: 'Active Customers', value: String(activeCustomers), sub: 'Managed portfolios', icon: UserCheck },
    { label: 'New Leads', value: String(newLeads), sub: 'Awaiting first contact', icon: UserPlus },
    { label: 'Conversion Rate', value: conversionRate, sub: `${converted} of ${leads.length} leads`, icon: TrendingUp },
    { label: 'Upcoming Events', value: String(upcomingEvents), sub: 'Published, still ahead', icon: CalendarDays },
  ];

  return (
    <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl text-primary">Operations Overview</h1>
          <p className="text-muted-foreground mt-1">
            {firstName ? `Welcome back, ${firstName}. Here's your firm snapshot.` : "Here's your firm snapshot."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" asChild><Link href="/ops/leads">View Leads</Link></Button>
          <Button size="sm" className="h-8 gap-1" asChild><Link href="/ops/customers"><UserCheck className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Customers</span></Link></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
            <CardContent className="p-5">
              <div className="flex flex-row items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                <div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div>
              </div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Needs Attention */}
        <Card className="md:col-span-1 shadow-lg border-none bg-card rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-primary">Needs Attention</CardTitle>
            <CardDescription>Open leads, longest wait first</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {needsAttention.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">Nothing is waiting — every lead has been moved on.</p>
            ) : needsAttention.map((lead) => {
              const days = daysSince(lastTouch(lead), today);
              const tone = days >= 7 ? 'red' : days >= 3 ? 'yellow' : 'green';
              return (
                <Link
                  key={lead.id}
                  href={`/ops/leads/${lead.id}`}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className={`p-1.5 rounded-full mt-0.5 ${tone === 'red' ? 'bg-red-100' : tone === 'yellow' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                    <Clock className={`h-3.5 w-3.5 ${tone === 'red' ? 'text-red-600' : tone === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lead.service}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{lead.status}</span>
                      <span className="text-xs text-muted-foreground">· Waiting: {waitedLabel(days)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="md:col-span-2 shadow-lg border-none bg-card rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-primary">Recent Leads</CardTitle>
                <CardDescription>Latest inquiries</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                <Link href="/ops/leads">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No leads yet. New website inquiries land here.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-b hover:bg-transparent">
                    <TableHead className="text-primary font-semibold pl-0">#</TableHead>
                    <TableHead className="text-primary font-semibold">Name</TableHead>
                    <TableHead className="hidden md:table-cell text-primary font-semibold">Service</TableHead>
                    <TableHead className="text-primary font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-b hover:bg-muted/50">
                      <TableCell className="pl-0 py-3 font-mono text-sm font-bold text-muted-foreground">{String(lead.leadNumber).padStart(3, '0')}</TableCell>
                      <TableCell className="py-3"><Link href={`/ops/leads/${lead.id}`} className="font-medium hover:text-primary">{lead.name}</Link></TableCell>
                      <TableCell className="hidden md:table-cell py-3 text-sm">{lead.service}</TableCell>
                      <TableCell className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>{lead.status}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
