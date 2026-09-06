'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Star, Search, Eye, ExternalLink, TrendingUp, MessageSquare } from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types";

const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-green-100 text-green-700 border-green-200',
};

const fmtDate = (v?: string) =>
    v ? new Date(v).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';


export function LeadsConsole({ leads }: { leads: Lead[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredLeads = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return leads.filter(lead => {
            // Search every stored text field, so a term that is only visible
            // in the message or on the detail page still finds its lead.
            const matchesSearch =
                lead.name.toLowerCase().includes(q) ||
                lead.email.toLowerCase().includes(q) ||
                lead.phone.includes(searchTerm) ||
                lead.service.toLowerCase().includes(q) ||
                (lead.assignedTo ?? '').toLowerCase().includes(q) ||
                (lead.message ?? '').toLowerCase().includes(q) ||
                (lead.notes ?? '').toLowerCase().includes(q);
            const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [leads, searchTerm, statusFilter]);

    const stats = useMemo(() => {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
        return {
            total: leads.length,
            new: leads.filter(l => l.status === 'New').length,
            contacted: leads.filter(l => l.status === 'Contacted').length,
            recent: leads.filter(l => l.date.slice(0, 10) >= thirtyDaysAgo).length,
        };
    }, [leads]);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-3xl md:text-4xl text-primary">Leads Management</h1>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 gap-1" asChild>
                        <Link href="/get-started" target="_blank">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Lead Form</span>
                        </Link>
                    </Button>
                </div>
            </div>

            <Card className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
                <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total Leads', value: stats.total, sub: 'All time', icon: Users },
                            { label: 'Last 30 Days', value: stats.recent, sub: 'Newly received', icon: TrendingUp },
                            { label: 'Awaiting Reply', value: stats.new, sub: 'Nobody has responded yet', icon: UserPlus },
                            { label: 'Contacted', value: stats.contacted, sub: 'Someone has replied', icon: Star },
                        ].map((kpi, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                                    <div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or phone..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {(Object.keys(statusColors) as LeadStatus[]).map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">All Leads</CardTitle>
                    <CardDescription>Showing {filteredLeads.length} of {leads.length} leads</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b hover:bg-transparent">
                                    <TableHead className="text-primary font-semibold pl-0 w-[60px]">#</TableHead>
                                    <TableHead className="text-primary font-semibold">Name</TableHead>
                                    <TableHead className="hidden xl:table-cell text-primary font-semibold">Phone</TableHead>
                                    <TableHead className="hidden md:table-cell text-primary font-semibold">Service</TableHead>
                                    <TableHead className="text-primary font-semibold">Status</TableHead>
                                    <TableHead className="hidden lg:table-cell text-primary font-semibold">Assigned To</TableHead>
                                    <TableHead className="hidden xl:table-cell text-primary font-semibold">Last Contact</TableHead>
                                    <TableHead className="hidden md:table-cell text-primary font-semibold">Received</TableHead>
                                    <TableHead className="text-primary font-semibold text-right pr-0">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLeads.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-12 text-center text-muted-foreground">
                                            {leads.length === 0 ? (
                                                <>
                                                    No leads yet. Inquiries submitted through{' '}
                                                    <Link href="/get-started" target="_blank" className="text-primary underline underline-offset-4">
                                                        the lead form
                                                    </Link>{' '}
                                                    will appear here.
                                                </>
                                            ) : 'No leads match those filters.'}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filteredLeads.map((lead) => (
                                    <TableRow key={lead.id} className="border-b hover:bg-muted/50">
                                        <TableCell className="pl-0 py-4 font-mono text-sm font-bold text-muted-foreground">
                                            {String(lead.leadNumber).padStart(3, '0')}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-medium text-foreground">{lead.name}</span>
                                                {(lead.message || lead.notes) && (
                                                    // The message and notes are too long for a column of
                                                    // their own; flag that they exist and put them in reach.
                                                    <span title={[lead.message, lead.notes].filter(Boolean).join('\n\n')}>
                                                        <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell py-4 text-sm">{lead.phone || '—'}</TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm">{lead.service}</TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                                                {lead.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell py-4 text-sm">{lead.assignedTo || '—'}</TableCell>
                                        <TableCell className="hidden xl:table-cell py-4 text-sm text-muted-foreground">
                                            {fmtDate(lead.lastContactDate)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">
                                            {fmtDate(lead.date)}
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-0">
                                            <Button size="sm" variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary">
                                                <Link href={`/ops/leads/${lead.id}`}>
                                                    <Eye className="h-4 w-4 mr-1" /> View
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
