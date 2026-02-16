'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus, LineChart, DollarSign, ArrowUpRight, TrendingUp, CalendarDays, Users, CheckCircle2, Clock, Briefcase } from "lucide-react";
import { mockLeads, mockCustomers, mockTransactions, mockEvents, staffMembers, mockCampaigns } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200', 'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Qualified': 'bg-purple-100 text-purple-700 border-purple-200', 'Proposal': 'bg-orange-100 text-orange-700 border-orange-200',
  'Converted': 'bg-green-100 text-green-700 border-green-200', 'Lost': 'bg-red-100 text-red-700 border-red-200',
};

export default function OpsDashboard() {
  const totalAUM = mockCustomers.reduce((s, c) => s + c.totalPortfolioValue, 0);
  const newLeads = mockLeads.filter(l => l.status === 'New').length;
  const conversionRate = Math.round((mockLeads.filter(l => l.status === 'Converted').length / mockLeads.length) * 100);
  const monthRevenue = mockTransactions.filter(t => t.type === 'Fee' || t.type === 'Commission').reduce((s, t) => s + t.amount, 0);
  const upcomingEvents = mockEvents.filter(e => e.status === 'Upcoming').length;
  const recentLeads = [...mockLeads].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  // Team tasks
  const taskFeed = [
    { assignee: 'Collet', task: 'Follow up with Amina Hassan — Insurance proposal', priority: 'High', due: 'Today' },
    { assignee: 'Debbie', task: 'Verify KYC for James Kipchumba — Land purchase', priority: 'High', due: 'Today' },
    { assignee: 'Alexandria', task: 'Publish March seminar page on website', priority: 'Medium', due: 'Tomorrow' },
    { assignee: 'Denzel', task: 'Generate Q4 performance reports for Catherine Wambui', priority: 'Medium', due: 'Feb 14' },
    { assignee: 'Mumbi', task: 'Review and approve commission payout — KES 35,000', priority: 'Low', due: 'Feb 15' },
  ];

  return (
    <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl text-primary">Operations Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Mumbi. Here's your firm snapshot.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1" asChild><Link href="/ops/leads">View Leads</Link></Button>
          <Button size="sm" className="h-8 gap-1" asChild><Link href="/ops/customers"><UserCheck className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Customers</span></Link></Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: 'Total AUM', value: `KES ${(totalAUM / 1000000).toFixed(1)}M`, sub: 'Assets under management', icon: DollarSign },
          { label: 'Active Customers', value: String(mockCustomers.filter(c => c.status === 'Active').length), sub: 'Managed portfolios', icon: UserCheck },
          { label: 'New Leads', value: String(newLeads), sub: 'Awaiting first contact', icon: UserPlus },
          { label: 'Month Revenue', value: `KES ${(monthRevenue / 1000).toFixed(0)}K`, sub: 'Fees & commissions', icon: TrendingUp },
          { label: 'Upcoming Events', value: String(upcomingEvents), sub: 'Seminars & webinars', icon: CalendarDays },
        ].map((kpi, i) => (
          <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
            <CardContent className="p-5">
              <div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Task Feed */}
        <Card className="md:col-span-1 shadow-lg border-none bg-card rounded-xl">
          <CardHeader><CardTitle className="text-lg font-bold text-primary">Team Task Feed</CardTitle><CardDescription>Today's priorities</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {taskFeed.map((t, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`p-1.5 rounded-full mt-0.5 ${t.priority === 'High' ? 'bg-red-100' : t.priority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                  <Clock className={`h-3.5 w-3.5 ${t.priority === 'High' ? 'text-red-600' : t.priority === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{t.task}</p>
                  <div className="flex items-center gap-2 mt-1"><span className="text-xs text-muted-foreground">{t.assignee}</span><span className="text-xs text-muted-foreground">· Due: {t.due}</span></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="md:col-span-2 shadow-lg border-none bg-card rounded-xl">
          <CardHeader>
            <div className="flex items-center justify-between"><div><CardTitle className="text-lg font-bold text-primary">Recent Leads</CardTitle><CardDescription>Latest inquiries</CardDescription></div><Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary"><Link href="/ops/leads">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link></Button></div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow className="border-b hover:bg-transparent"><TableHead className="text-primary font-semibold pl-0">#</TableHead><TableHead className="text-primary font-semibold">Name</TableHead><TableHead className="hidden md:table-cell text-primary font-semibold">Service</TableHead><TableHead className="text-primary font-semibold">Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {recentLeads.map((lead) => (
                  <TableRow key={lead.id} className="border-b hover:bg-muted/50">
                    <TableCell className="pl-0 py-3 font-mono text-sm font-bold text-muted-foreground">{String(lead.leadNumber).padStart(3, '0')}</TableCell>
                    <TableCell className="py-3"><Link href={`/ops/leads/${lead.id}`} className="font-medium hover:text-primary">{lead.name}</Link></TableCell>
                    <TableCell className="hidden md:table-cell py-3 text-sm">{lead.service}</TableCell>
                    <TableCell className="py-3"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>{lead.status}</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
