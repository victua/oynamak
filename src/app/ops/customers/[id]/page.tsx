'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, DollarSign, User, Briefcase, TrendingUp, FileText, CreditCard } from "lucide-react";
import { mockCustomers } from "@/lib/mock-data";

const serviceIcons: Record<string, typeof Briefcase> = {
    'Investments': TrendingUp,
    'Real Estate': MapPin,
    'Insurance': FileText,
    'Consulting': Briefcase,
};

const portfolioStatusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Matured': 'bg-blue-100 text-blue-700 border-blue-200',
    'Closed': 'bg-gray-100 text-gray-700 border-gray-200',
};

const customerStatusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Inactive': 'bg-gray-100 text-gray-700 border-gray-200',
    'Suspended': 'bg-red-100 text-red-700 border-red-200',
};

export default function CustomerDetailPage() {
    const params = useParams();
    const customer = mockCustomers.find(c => c.id === params.id);

    if (!customer) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 pb-8">
                <h1 className="text-2xl font-bold text-primary">Customer Not Found</h1>
                <Button asChild><Link href="/ops/customers">Back to Customers</Link></Button>
            </main>
        );
    }

    const portfolioByService = customer.portfolioItems.reduce((acc, item) => {
        acc[item.service] = (acc[item.service] || 0) + item.value;
        return acc;
    }, {} as Record<string, number>);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                        <Link href="/ops/customers"><ArrowLeft className="h-5 w-5" /></Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-2xl md:text-3xl text-primary">{customer.name}</h1>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${customerStatusColors[customer.status]}`}>{customer.status}</span>
                        </div>
                        <p className="text-muted-foreground">Customer #{String(customer.customerNumber).padStart(3, '0')} · Since {new Date(customer.joinDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Portfolio Summary */}
            <Card className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl">
                <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Total Portfolio</span><div className="p-2 bg-primary/10 rounded-full"><DollarSign className="h-4 w-4 text-primary" /></div></div>
                            <div><div className="text-2xl font-bold">KES {customer.totalPortfolioValue.toLocaleString()}</div><p className="text-xs text-muted-foreground mt-1">Total value</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Active Products</span><div className="p-2 bg-primary/10 rounded-full"><Briefcase className="h-4 w-4 text-primary" /></div></div>
                            <div><div className="text-2xl font-bold">{customer.portfolioItems.filter(p => p.status === 'Active').length}</div><p className="text-xs text-muted-foreground mt-1">Of {customer.portfolioItems.length} total</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Source</span><div className="p-2 bg-primary/10 rounded-full"><User className="h-4 w-4 text-primary" /></div></div>
                            <div><div className="text-2xl font-bold text-sm">{customer.source}</div><p className="text-xs text-muted-foreground mt-1">{customer.leadId ? `From Lead #${customer.leadId}` : 'Direct client'}</p></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row items-center justify-between"><span className="text-sm font-medium text-muted-foreground">Advisor</span><div className="p-2 bg-primary/10 rounded-full"><User className="h-4 w-4 text-primary" /></div></div>
                            <div><div className="text-2xl font-bold text-sm">{customer.assignedAdvisor || '—'}</div><p className="text-xs text-muted-foreground mt-1">Relationship manager</p></div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Portfolio & Contact */}
                <div className="md:col-span-2 space-y-6">
                    {/* Portfolio Holdings */}
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Portfolio Holdings</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b hover:bg-transparent">
                                        <TableHead className="text-primary font-semibold pl-0">Product</TableHead>
                                        <TableHead className="text-primary font-semibold">Type</TableHead>
                                        <TableHead className="text-primary font-semibold">Status</TableHead>
                                        <TableHead className="text-primary font-semibold text-right">Value (KES)</TableHead>
                                        <TableHead className="hidden md:table-cell text-primary font-semibold text-right pr-0">Returns</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customer.portfolioItems.map((item) => (
                                        <TableRow key={item.id} className="border-b hover:bg-muted/50">
                                            <TableCell className="pl-0 py-4"><div className="font-medium">{item.productName}</div>{item.maturityDate && <div className="text-xs text-muted-foreground">Matures: {new Date(item.maturityDate).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' })}</div>}</TableCell>
                                            <TableCell className="py-4 text-sm">{item.service}</TableCell>
                                            <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${portfolioStatusColors[item.status]}`}>{item.status}</span></TableCell>
                                            <TableCell className="py-4 text-right font-medium">{item.value.toLocaleString()}</TableCell>
                                            <TableCell className="hidden md:table-cell py-4 text-right pr-0">{item.returns ? <span className="text-green-600 font-medium">{item.returns}%</span> : '—'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Contact */}
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Contact Information</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"><div className="p-2 bg-primary/10 rounded-full"><Mail className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium text-sm">{customer.email}</p></div></div>
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"><div className="p-2 bg-primary/10 rounded-full"><Phone className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium text-sm">{customer.phone}</p></div></div>
                                {customer.address && <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"><div className="p-2 bg-primary/10 rounded-full"><MapPin className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">Address</p><p className="font-medium text-sm">{customer.address}</p></div></div>}
                                {customer.idNumber && <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"><div className="p-2 bg-primary/10 rounded-full"><CreditCard className="h-4 w-4 text-primary" /></div><div><p className="text-xs text-muted-foreground">ID Number</p><p className="font-medium text-sm">{customer.idNumber}</p></div></div>}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Allocation & Notes */}
                <div className="space-y-6">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Portfolio Allocation</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            {Object.entries(portfolioByService).map(([service, value]) => {
                                const pct = Math.round((value / customer.totalPortfolioValue) * 100);
                                const Icon = serviceIcons[service] || Briefcase;
                                return (
                                    <div key={service} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-primary" /><span className="font-medium">{service}</span></div>
                                            <span className="text-muted-foreground">{pct}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                                        <p className="text-xs text-muted-foreground">KES {value.toLocaleString()}</p>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {customer.notes && (
                        <Card className="shadow-lg border-none bg-card rounded-xl">
                            <CardHeader><CardTitle className="text-lg font-bold text-primary">Notes</CardTitle></CardHeader>
                            <CardContent>
                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed border-l-4 border-primary/30">{customer.notes}</div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
