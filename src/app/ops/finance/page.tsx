'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, ArrowUpRight, FileText, Search, CreditCard, Receipt } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTransactions, mockCustomers } from "@/lib/mock-data";
import { useState } from "react";

const typeColors: Record<string, string> = {
    'Deposit': 'bg-green-100 text-green-700 border-green-200',
    'Withdrawal': 'bg-red-100 text-red-700 border-red-200',
    'Fee': 'bg-blue-100 text-blue-700 border-blue-200',
    'Commission': 'bg-purple-100 text-purple-700 border-purple-200',
    'Invoice': 'bg-orange-100 text-orange-700 border-orange-200',
};
const statusColors: Record<string, string> = { 'Completed': 'bg-green-100 text-green-700 border-green-200', 'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200', 'Failed': 'bg-red-100 text-red-700 border-red-200' };

export default function FinancePage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const filtered = mockTransactions.filter(t => {
        const s = t.description.toLowerCase().includes(search.toLowerCase()) || (t.customer || '').toLowerCase().includes(search.toLowerCase()) || t.reference.toLowerCase().includes(search.toLowerCase());
        const f = typeFilter === 'all' || t.type === typeFilter;
        return s && f;
    });

    const totalDeposits = mockTransactions.filter(t => t.type === 'Deposit' && t.status === 'Completed').reduce((s, t) => s + t.amount, 0);
    const totalFees = mockTransactions.filter(t => t.type === 'Fee' && t.status === 'Completed').reduce((s, t) => s + t.amount, 0);
    const totalCommissions = mockTransactions.filter(t => t.type === 'Commission').reduce((s, t) => s + t.amount, 0);
    const pendingAmount = mockTransactions.filter(t => t.status === 'Pending').reduce((s, t) => s + t.amount, 0);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Finance</h1><p className="text-muted-foreground mt-1">Transaction ledger, fees, and commissions.</p></div>
                <Button size="sm" className="h-8 gap-1"><Receipt className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Invoice</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Client Deposits', value: `KES ${(totalDeposits / 1000000).toFixed(1)}M`, sub: 'Total received', icon: DollarSign },
                    { label: 'Service Fees', value: `KES ${(totalFees / 1000).toFixed(0)}K`, sub: 'Advisory & mgmt fees', icon: FileText },
                    { label: 'Commissions', value: `KES ${(totalCommissions / 1000).toFixed(0)}K`, sub: 'Product commissions', icon: TrendingUp },
                    { label: 'Pending', value: `KES ${(pendingAmount / 1000).toFixed(0)}K`, sub: 'Awaiting clearance', icon: CreditCard },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search transactions..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} /></div>
                <Select value={typeFilter} onValueChange={setTypeFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Types" /></SelectTrigger><SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="Deposit">Deposits</SelectItem><SelectItem value="Withdrawal">Withdrawals</SelectItem><SelectItem value="Fee">Fees</SelectItem><SelectItem value="Commission">Commissions</SelectItem><SelectItem value="Invoice">Invoices</SelectItem></SelectContent></Select>
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader><CardTitle className="text-xl font-bold text-primary">Transaction Ledger</CardTitle><CardDescription>Showing {filtered.length} of {mockTransactions.length} transactions</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow className="border-b hover:bg-transparent">
                            <TableHead className="text-primary font-semibold pl-0">Reference</TableHead>
                            <TableHead className="text-primary font-semibold">Description</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold">Client</TableHead>
                            <TableHead className="text-primary font-semibold">Type</TableHead>
                            <TableHead className="text-primary font-semibold text-right">Amount (KES)</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold">Status</TableHead>
                            <TableHead className="hidden lg:table-cell text-primary font-semibold pr-0">Date</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {filtered.map(t => (
                                <TableRow key={t.id} className="border-b hover:bg-muted/50">
                                    <TableCell className="pl-0 py-4 font-mono text-xs font-bold text-muted-foreground">{t.reference}</TableCell>
                                    <TableCell className="py-4 text-sm">{t.description}</TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-sm">{t.customer || '—'}</TableCell>
                                    <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[t.type]}`}>{t.type}</span></TableCell>
                                    <TableCell className={`py-4 text-right font-medium ${t.type === 'Withdrawal' ? 'text-red-600' : ''}`}>{t.type === 'Withdrawal' ? '-' : ''}{t.amount.toLocaleString()}</TableCell>
                                    <TableCell className="hidden md:table-cell py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[t.status]}`}>{t.status}</span></TableCell>
                                    <TableCell className="hidden lg:table-cell py-4 text-sm text-muted-foreground pr-0">{new Date(t.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
