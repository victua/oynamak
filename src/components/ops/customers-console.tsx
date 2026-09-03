'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, DollarSign, TrendingUp, Search, Eye, Users } from "lucide-react";
import type { Customer, CustomerStatus } from "@/lib/types";

const statusColors: Record<CustomerStatus, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Inactive': 'bg-gray-100 text-gray-700 border-gray-200',
    'Suspended': 'bg-red-100 text-red-700 border-red-200',
};

/** KES in millions, or a dash when there is nothing to divide. */
function millions(value: number, divisor = 1) {
    if (!divisor) return '—';
    return `KES ${(value / divisor / 1_000_000).toFixed(1)}M`;
}

export function CustomersConsole({ customers }: { customers: Customer[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filtered = useMemo(() => {
        const q = searchTerm.toLowerCase();
        return customers.filter(c => {
            const matchesSearch =
                c.name.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q) ||
                c.phone.includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [customers, searchTerm, statusFilter]);

    const totalAUM = useMemo(
        () => customers.reduce((s, c) => s + c.totalPortfolioValue, 0),
        [customers],
    );
    const activeCount = customers.filter(c => c.status === 'Active').length;

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-3xl md:text-4xl text-primary">Customers</h1>
            </div>

            <Card className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
                <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: 'Total Customers', value: String(customers.length), sub: 'Whole base', icon: Users },
                            { label: 'Active Clients', value: String(activeCount), sub: 'Currently managed', icon: UserCheck },
                            { label: 'Total AUM', value: millions(totalAUM), sub: 'Assets under management', icon: DollarSign },
                            { label: 'Avg Portfolio', value: millions(totalAUM, customers.length), sub: 'Per customer', icon: TrendingUp },
                        ].map((kpi, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                                    <div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{kpi.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or phone..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {(Object.keys(statusColors) as CustomerStatus[]).map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-primary">All Customers</CardTitle>
                    <CardDescription>Showing {filtered.length} of {customers.length} customers</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b hover:bg-transparent">
                                    <TableHead className="text-primary font-semibold pl-0 w-[60px]">#</TableHead>
                                    <TableHead className="text-primary font-semibold">Name</TableHead>
                                    <TableHead className="hidden md:table-cell text-primary font-semibold">Advisor</TableHead>
                                    <TableHead className="text-primary font-semibold">Status</TableHead>
                                    <TableHead className="hidden lg:table-cell text-primary font-semibold text-right">Portfolio</TableHead>
                                    <TableHead className="hidden md:table-cell text-primary font-semibold">Joined</TableHead>
                                    <TableHead className="text-primary font-semibold text-right pr-0">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                                            {customers.length === 0 ? (
                                                <>
                                                    No customers yet. Convert a lead from{' '}
                                                    <Link href="/ops/leads" className="text-primary underline underline-offset-4">Leads</Link>
                                                    {' '}to create the first one.
                                                </>
                                            ) : 'No customers match those filters.'}
                                        </TableCell>
                                    </TableRow>
                                )}
                                {filtered.map((c) => (
                                    <TableRow key={c.id} className="border-b hover:bg-muted/50">
                                        <TableCell className="pl-0 py-4 font-mono text-sm font-bold text-muted-foreground">
                                            {String(c.customerNumber).padStart(3, '0')}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="font-medium text-foreground">{c.name}</div>
                                            <div className="text-sm text-muted-foreground">{c.email}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm">{c.assignedAdvisor || '—'}</TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[c.status]}`}>
                                                {c.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell py-4 text-right font-medium">
                                            KES {c.totalPortfolioValue.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">
                                            {new Date(c.joinDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-0">
                                            <Button size="sm" variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary">
                                                <Link href={`/ops/customers/${c.id}`}><Eye className="h-4 w-4 mr-1" /> View</Link>
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
