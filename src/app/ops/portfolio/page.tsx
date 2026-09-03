// Server component. Portfolio is an aggregate view, not its own collection —
// items live embedded on customer documents, so everything here is derived
// from the live `customers` data.

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Briefcase, DollarSign, TrendingUp, Users, Building2, Shield } from "lucide-react";
import { listCustomers } from "@/lib/customers-server";
import type { Customer, PortfolioItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const serviceIcons: Record<string, typeof Briefcase> = {
    Investments: TrendingUp,
    'Real Estate': Building2,
    Insurance: Shield,
    Consulting: Briefcase,
};

const serviceColors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500'];

const millions = (v: number) => `KES ${(v / 1_000_000).toFixed(1)}M`;

export default async function PortfolioPage() {
    const customers: Customer[] = await listCustomers();

    const allItems: (PortfolioItem & { client: Customer })[] = customers.flatMap(c =>
        c.portfolioItems.map(p => ({ ...p, client: c })),
    );

    const totalAUM = customers.reduce((s, c) => s + c.totalPortfolioValue, 0);
    const activeItems = allItems.filter(p => p.status === 'Active');
    const withReturns = allItems.filter(p => typeof p.returns === 'number');
    const investedClients = customers.filter(c => c.portfolioItems.length > 0).length;

    // Every one of these divides by something that is zero on an empty database,
    // so each guards rather than rendering NaN.
    const avgReturn = withReturns.length
        ? `${(withReturns.reduce((s, p) => s + (p.returns ?? 0), 0) / withReturns.length).toFixed(1)}%`
        : '—';

    const byService = allItems.reduce<Record<string, { value: number; count: number; returns: number[] }>>(
        (acc, p) => {
            const bucket = (acc[p.service] ??= { value: 0, count: 0, returns: [] });
            bucket.value += p.value;
            bucket.count += 1;
            if (typeof p.returns === 'number') bucket.returns.push(p.returns);
            return acc;
        },
        {},
    );

    const allocation = Object.entries(byService)
        .map(([service, d]) => ({
            service,
            value: d.value,
            count: d.count,
            pct: totalAUM ? Math.round((d.value / totalAUM) * 100) : 0,
            avgReturn: d.returns.length
                ? Math.round((d.returns.reduce((a, b) => a + b, 0) / d.returns.length) * 10) / 10
                : 0,
        }))
        .sort((a, b) => b.value - a.value);

    const topHoldings = [...activeItems].sort((a, b) => b.value - a.value).slice(0, 8);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl text-primary">Portfolio Overview</h1>
                    <p className="text-muted-foreground mt-1">Organizational asset allocation and performance.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total AUM', value: millions(totalAUM), sub: 'All client portfolios', icon: DollarSign },
                    { label: 'Active Products', value: String(activeItems.length), sub: `Of ${allItems.length} total`, icon: Briefcase },
                    { label: 'Avg Return', value: avgReturn, sub: withReturns.length ? 'Across products with returns' : 'No returns recorded yet', icon: TrendingUp },
                    { label: 'Clients Invested', value: String(investedClients), sub: `Of ${customers.length} customers`, icon: Users },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
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
                <Card className="shadow-lg border-none bg-card rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary">Asset Allocation</CardTitle>
                        <CardDescription>Distribution by service line</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {allocation.length === 0 && (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                                No portfolio items yet.
                            </p>
                        )}
                        {allocation.map((a, i) => {
                            const Icon = serviceIcons[a.service] || Briefcase;
                            return (
                                <div key={a.service} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-primary" />
                                            <span className="font-medium">{a.service}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold">{a.pct}%</span>
                                            {a.avgReturn > 0 && <span className="text-green-600 text-xs ml-2">↑{a.avgReturn}%</span>}
                                        </div>
                                    </div>
                                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full ${serviceColors[i % serviceColors.length]} rounded-full transition-all`} style={{ width: `${a.pct}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{millions(a.value)}</span>
                                        <span>{a.count} {a.count === 1 ? 'product' : 'products'}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-lg border-none bg-card rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-primary">Top Holdings</CardTitle>
                        <CardDescription>Largest active positions across all clients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b hover:bg-transparent">
                                        <TableHead className="text-primary font-semibold pl-0">Product</TableHead>
                                        <TableHead className="text-primary font-semibold">Type</TableHead>
                                        <TableHead className="hidden md:table-cell text-primary font-semibold">Client</TableHead>
                                        <TableHead className="text-primary font-semibold text-right">Value (KES)</TableHead>
                                        <TableHead className="text-primary font-semibold text-right pr-0">Return</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topHoldings.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                                                No active holdings yet. Add portfolio items from a{' '}
                                                <Link href="/ops/customers" className="text-primary underline underline-offset-4">
                                                    customer
                                                </Link>{' '}
                                                to see them here.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {topHoldings.map(h => (
                                        <TableRow key={h.id} className="border-b hover:bg-muted/50">
                                            <TableCell className="pl-0 py-3">
                                                <div className="font-medium text-sm">{h.productName}</div>
                                                {h.maturityDate && (
                                                    <div className="text-xs text-muted-foreground">
                                                        Mat: {new Date(h.maturityDate).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="py-3 text-sm">{h.service}</TableCell>
                                            <TableCell className="hidden md:table-cell py-3 text-sm">
                                                <Link href={`/ops/customers/${h.client.id}`} className="hover:text-primary hover:underline underline-offset-4">
                                                    {h.client.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="py-3 text-right font-medium text-sm">{h.value.toLocaleString()}</TableCell>
                                            <TableCell className="py-3 text-right pr-0">
                                                {typeof h.returns === 'number'
                                                    ? <span className="text-green-600 font-medium">{h.returns}%</span>
                                                    : <span className="text-muted-foreground">—</span>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
