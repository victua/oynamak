'use client';

import Link from "next/link";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, TrendingUp, Star, Search, Eye, ArrowUpRight, ExternalLink } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import type { Lead, LeadStatus } from "@/lib/types";

const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
    'Proposal': 'bg-orange-100 text-orange-700 border-orange-200',
    'Converted': 'bg-green-100 text-green-700 border-green-200',
    'Lost': 'bg-red-100 text-red-700 border-red-200',
};

export default function LeadsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredLeads = mockLeads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: mockLeads.length,
        new: mockLeads.filter(l => l.status === 'New').length,
        qualified: mockLeads.filter(l => l.status === 'Qualified' || l.status === 'Proposal').length,
        converted: mockLeads.filter(l => l.status === 'Converted').length,
    };

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
                    <Button size="sm" className="h-8 gap-1">
                        <UserPlus className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Lead</span>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <Card className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
                <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Total Leads</span>
                                <div className="p-2 bg-primary/10 rounded-full"><Users className="h-4 w-4 text-primary" /></div>
                            </div>
                            <div><div className="text-2xl font-bold text-foreground">{stats.total}</div><p className="text-xs text-muted-foreground mt-1">All time</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">New Leads</span>
                                <div className="p-2 bg-primary/10 rounded-full"><UserPlus className="h-4 w-4 text-primary" /></div>
                            </div>
                            <div><div className="text-2xl font-bold text-foreground">{stats.new}</div><p className="text-xs text-muted-foreground mt-1">Awaiting contact</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Qualified / Proposal</span>
                                <div className="p-2 bg-primary/10 rounded-full"><Star className="h-4 w-4 text-primary" /></div>
                            </div>
                            <div><div className="text-2xl font-bold text-foreground">{stats.qualified}</div><p className="text-xs text-muted-foreground mt-1">In pipeline</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Converted</span>
                                <div className="p-2 bg-primary/10 rounded-full"><TrendingUp className="h-4 w-4 text-primary" /></div>
                            </div>
                            <div><div className="text-2xl font-bold text-foreground">{stats.converted}</div><p className="text-xs text-muted-foreground mt-1">Became customers</p></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or phone..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Proposal">Proposal</SelectItem>
                        <SelectItem value="Converted">Converted</SelectItem>
                        <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Leads Table */}
            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">All Leads</CardTitle>
                    <CardDescription>Showing {filteredLeads.length} of {mockLeads.length} leads</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b hover:bg-transparent">
                                <TableHead className="text-primary font-semibold pl-0 w-[60px]">#</TableHead>
                                <TableHead className="text-primary font-semibold">Name</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Service</TableHead>
                                <TableHead className="hidden lg:table-cell text-primary font-semibold">Source</TableHead>
                                <TableHead className="text-primary font-semibold">Status</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Date</TableHead>
                                <TableHead className="text-primary font-semibold text-right pr-0">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className="border-b hover:bg-muted/50">
                                    <TableCell className="pl-0 py-4 font-mono text-sm font-bold text-muted-foreground">
                                        {String(lead.leadNumber).padStart(3, '0')}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        <div className="font-medium text-foreground">{lead.name}</div>
                                        <div className="text-sm text-muted-foreground">{lead.phone}</div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-sm">{lead.service}</TableCell>
                                    <TableCell className="hidden lg:table-cell py-4 text-sm">{lead.source}</TableCell>
                                    <TableCell className="py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                                            {lead.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">
                                        {new Date(lead.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
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
                </CardContent>
            </Card>
        </main>
    );
}
