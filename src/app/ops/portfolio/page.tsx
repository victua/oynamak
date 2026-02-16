'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, TrendingDown, PieChart, BarChart3, Briefcase, Building2, Shield, Users } from "lucide-react";
import { mockCustomers } from "@/lib/mock-data";

export default function PortfolioPage() {
    const allPortfolioItems = mockCustomers.flatMap(c => c.portfolioItems);
    const totalAUM = mockCustomers.reduce((s, c) => s + c.totalPortfolioValue, 0);

    const byService: Record<string, { value: number; count: number; avgReturn: number; returns: number[] }> = {};
    allPortfolioItems.forEach(p => {
        if (!byService[p.service]) byService[p.service] = { value: 0, count: 0, avgReturn: 0, returns: [] };
        byService[p.service].value += p.value;
        byService[p.service].count += 1;
        if (p.returns) byService[p.service].returns.push(p.returns);
    });
    Object.keys(byService).forEach(k => { const r = byService[k].returns; byService[k].avgReturn = r.length ? Math.round((r.reduce((a, b) => a + b, 0) / r.length) * 10) / 10 : 0; });

    const serviceIcons: Record<string, typeof Briefcase> = { Investments: TrendingUp, 'Real Estate': Building2, Insurance: Shield, Consulting: Briefcase };
    const serviceColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];

    const topHoldings = allPortfolioItems.filter(p => p.status === 'Active').sort((a, b) => b.value - a.value).slice(0, 8);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Portfolio Overview</h1><p className="text-muted-foreground mt-1">Organizational asset allocation and performance.</p></div>
            </div>

            {/* Totals */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total AUM', value: `KES ${(totalAUM / 1000000).toFixed(1)}M`, sub: 'All client portfolios', icon: DollarSign },
                    { label: 'Active Products', value: String(allPortfolioItems.filter(p => p.status === 'Active').length), sub: `Of ${allPortfolioItems.length} total`, icon: Briefcase },
                    { label: 'Avg Return', value: `${(allPortfolioItems.filter(p => p.returns).reduce((s, p) => s + (p.returns || 0), 0) / allPortfolioItems.filter(p => p.returns).length).toFixed(1)}%`, sub: 'Across investment products', icon: TrendingUp },
                    { label: 'Clients Invested', value: String(mockCustomers.length), sub: 'Individual & entity accounts', icon: Users },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Allocation Breakdown */}
                <Card className="shadow-lg border-none bg-card rounded-xl">
                    <CardHeader><CardTitle className="text-lg font-bold text-primary">Asset Allocation</CardTitle><CardDescription>Distribution by service line</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(byService).map(([service, data], i) => {
                            const pct = Math.round((data.value / totalAUM) * 100);
                            const Icon = serviceIcons[service] || Briefcase;
                            return (
                                <div key={service} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /><span className="font-medium">{service}</span></div>
                                        <div className="text-right"><span className="font-bold">{pct}%</span>{data.avgReturn > 0 && <span className="text-green-600 text-xs ml-2">↑{data.avgReturn}%</span>}</div>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden"><div className={`h-full ${serviceColors[i % serviceColors.length]} rounded-full transition-all`} style={{ width: `${pct}%` }} /></div>
                                    <div className="flex justify-between text-xs text-muted-foreground"><span>KES {(data.value / 1000000).toFixed(1)}M</span><span>{data.count} products</span></div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                {/* Top Holdings */}
                <Card className="md:col-span-2 shadow-lg border-none bg-card rounded-xl">
                    <CardHeader><CardTitle className="text-lg font-bold text-primary">Top Holdings</CardTitle><CardDescription>Largest active positions across all clients</CardDescription></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow className="border-b hover:bg-transparent">
                                <TableHead className="text-primary font-semibold pl-0">Product</TableHead>
                                <TableHead className="text-primary font-semibold">Type</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Client</TableHead>
                                <TableHead className="text-primary font-semibold text-right">Value (KES)</TableHead>
                                <TableHead className="text-primary font-semibold text-right pr-0">Return</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {topHoldings.map(h => {
                                    const client = mockCustomers.find(c => c.portfolioItems.some(p => p.id === h.id));
                                    return (
                                        <TableRow key={h.id} className="border-b hover:bg-muted/50">
                                            <TableCell className="pl-0 py-3"><div className="font-medium text-sm">{h.productName}</div>{h.maturityDate && <div className="text-xs text-muted-foreground">Mat: {new Date(h.maturityDate).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}</div>}</TableCell>
                                            <TableCell className="py-3 text-sm">{h.service}</TableCell>
                                            <TableCell className="hidden md:table-cell py-3 text-sm">{client?.name || '—'}</TableCell>
                                            <TableCell className="py-3 text-right font-medium text-sm">{h.value.toLocaleString()}</TableCell>
                                            <TableCell className="py-3 text-right pr-0">{h.returns ? <span className="text-green-600 font-medium">{h.returns}%</span> : <span className="text-muted-foreground">—</span>}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
