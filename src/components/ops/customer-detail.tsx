'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
    ArrowLeft, Mail, Phone, Calendar, DollarSign, User, Briefcase,
    Loader2, Plus, Trash2, Link2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    setCustomerStatus, setCustomerAdvisor, addCustomerNote,
    addPortfolioItem, removePortfolioItem,
} from "@/app/ops/customers/actions";
import type { Customer, CustomerStatus, PortfolioItem } from "@/lib/types";

const statusColors: Record<CustomerStatus, string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Inactive': 'bg-gray-100 text-gray-700 border-gray-200',
    'Suspended': 'bg-red-100 text-red-700 border-red-200',
};

const itemStatusColors: Record<PortfolioItem['status'], string> = {
    'Active': 'bg-green-100 text-green-700 border-green-200',
    'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Matured': 'bg-blue-100 text-blue-700 border-blue-200',
    'Closed': 'bg-gray-100 text-gray-700 border-gray-200',
};

const SERVICES: PortfolioItem['service'][] = ['Investments', 'Real Estate', 'Insurance', 'Consulting'];
const ITEM_STATUSES: PortfolioItem['status'][] = ['Active', 'Pending', 'Matured', 'Closed'];
const CUSTOMER_STATUSES: CustomerStatus[] = ['Active', 'Inactive', 'Suspended'];

const fmtDate = (v: string) =>
    v ? new Date(v).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

function AddPortfolioDialog({ customerId, onDone }: { customerId: string; onDone: () => void }) {
    const [open, setOpen] = useState(false);
    const [service, setService] = useState<PortfolioItem['service']>('Consulting');
    const [status, setStatus] = useState<PortfolioItem['status']>('Active');
    const [productName, setProductName] = useState('');
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [pending, start] = useTransition();
    const { toast } = useToast();

    const submit = () => start(async () => {
        const result = await addPortfolioItem(customerId, {
            service, status, productName, value: Number(value), startDate,
        });
        if (!result.ok) {
            toast({ title: 'Could not add item', description: result.error, variant: 'destructive' });
            return;
        }
        toast({ title: 'Added', description: result.message });
        setProductName(''); setValue('');
        setOpen(false);
        onDone();
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="gap-1"><Plus className="h-3.5 w-3.5" /> Add Item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add portfolio item</DialogTitle>
                    <DialogDescription>The customer&apos;s total updates automatically.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="pf-name">Product name</Label>
                        <Input id="pf-name" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Academy Partnership Retainer" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="pf-service">Service</Label>
                            <Select value={service} onValueChange={v => setService(v as PortfolioItem['service'])}>
                                <SelectTrigger id="pf-service"><SelectValue /></SelectTrigger>
                                <SelectContent>{SERVICES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pf-status">Status</Label>
                            <Select value={status} onValueChange={v => setStatus(v as PortfolioItem['status'])}>
                                <SelectTrigger id="pf-status"><SelectValue /></SelectTrigger>
                                <SelectContent>{ITEM_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="pf-value">Value (KES)</Label>
                            <Input id="pf-value" type="number" min={0} value={value} onChange={e => setValue(e.target.value)} placeholder="0" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pf-start">Start date</Label>
                            <Input id="pf-start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={submit} disabled={pending || !productName.trim() || value === ''}>
                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add item
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function CustomerDetail({ customer, advisors }: { customer: Customer; advisors: string[] }) {
    const [newNote, setNewNote] = useState('');
    const [pending, start] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const run = (action: () => Promise<{ ok: boolean } & Record<string, any>>, after?: () => void) =>
        start(async () => {
            const result = await action();
            if (!result.ok) {
                toast({ title: 'Could not save', description: result.error, variant: 'destructive' });
                return;
            }
            toast({ title: 'Saved', description: result.message });
            after?.();
            router.refresh();
        });

    const activeItems = customer.portfolioItems.filter(p => p.status === 'Active').length;

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                        <Link href="/ops/customers"><ArrowLeft className="h-5 w-5" /></Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-2xl md:text-3xl text-primary">{customer.name}</h1>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[customer.status]}`}>
                                {customer.status}
                            </span>
                            {pending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>
                        <p className="text-muted-foreground">
                            Customer #{String(customer.customerNumber).padStart(3, '0')} · Joined {fmtDate(customer.joinDate)} · {customer.source}
                        </p>
                    </div>
                </div>
                {customer.leadId && (
                    <Button size="sm" variant="outline" asChild className="gap-1">
                        <Link href={`/ops/leads/${customer.leadId}`}><Link2 className="h-3.5 w-3.5" /> Original lead</Link>
                    </Button>
                )}
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { label: 'Portfolio Value', value: `KES ${customer.totalPortfolioValue.toLocaleString()}`, sub: 'Sum of all items', icon: DollarSign },
                            { label: 'Active Items', value: String(activeItems), sub: `Of ${customer.portfolioItems.length} total`, icon: Briefcase },
                            { label: 'Advisor', value: customer.assignedAdvisor || '—', sub: 'Relationship owner', icon: User },
                        ].map((kpi, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
                                    <div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold truncate">{kpi.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0">
                            <div>
                                <CardTitle className="text-lg font-bold text-primary">Portfolio</CardTitle>
                                <CardDescription>Holdings and engagements</CardDescription>
                            </div>
                            <AddPortfolioDialog customerId={customer.id} onDone={() => router.refresh()} />
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b hover:bg-transparent">
                                            <TableHead className="text-primary font-semibold pl-0">Product</TableHead>
                                            <TableHead className="text-primary font-semibold">Service</TableHead>
                                            <TableHead className="text-primary font-semibold">Status</TableHead>
                                            <TableHead className="text-primary font-semibold text-right">Value</TableHead>
                                            <TableHead className="hidden md:table-cell text-primary font-semibold">Start</TableHead>
                                            <TableHead className="text-primary font-semibold text-right pr-0"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {customer.portfolioItems.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                                                    No portfolio items yet.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {customer.portfolioItems.map(item => (
                                            <TableRow key={item.id} className="border-b hover:bg-muted/50">
                                                <TableCell className="pl-0 py-4 font-medium">{item.productName}</TableCell>
                                                <TableCell className="py-4 text-sm">{item.service}</TableCell>
                                                <TableCell className="py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${itemStatusColors[item.status]}`}>
                                                        {item.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="py-4 text-right font-medium">KES {item.value.toLocaleString()}</TableCell>
                                                <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">{fmtDate(item.startDate)}</TableCell>
                                                <TableCell className="py-4 text-right pr-0">
                                                    <Button
                                                        size="sm" variant="ghost" disabled={pending}
                                                        className="h-7 px-2 hover:bg-red-100 hover:text-red-700"
                                                        title="Remove item"
                                                        onClick={() => run(() => removePortfolioItem(customer.id, item.id))}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Notes &amp; Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {customer.notes && (
                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed border-l-4 border-primary/30 whitespace-pre-wrap">
                                    {customer.notes}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Add a note about this customer..."
                                    value={newNote}
                                    onChange={e => setNewNote(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                <Button
                                    size="sm"
                                    disabled={!newNote.trim() || pending}
                                    onClick={() => run(() => addCustomerNote(customer.id, newNote), () => setNewNote(''))}
                                >
                                    Add Note
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Quick Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <Select
                                    value={customer.status}
                                    disabled={pending}
                                    onValueChange={v => run(() => setCustomerStatus(customer.id, v as CustomerStatus))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {CUSTOMER_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Assigned Advisor</label>
                                <Select
                                    value={customer.assignedAdvisor || ''}
                                    disabled={pending || advisors.length === 0}
                                    onValueChange={v => run(() => setCustomerAdvisor(customer.id, v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={advisors.length ? 'Select advisor' : 'No ops users yet'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {advisors.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Contact</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email', value: customer.email },
                                { icon: Phone, label: 'Phone', value: customer.phone },
                                { icon: Calendar, label: 'Joined', value: fmtDate(customer.joinDate) },
                            ].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><f.icon className="h-4 w-4 text-primary" /></div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-muted-foreground">{f.label}</p>
                                        <p className="font-medium text-sm break-words">{f.value || '—'}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
