'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft, Mail, Phone, Calendar, User, Briefcase,
    Clock, MessageSquare, Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { setLeadStatus, assignLead, addLeadNote } from "@/app/ops/leads/actions";
import type { Lead, LeadStatus } from "@/lib/types";

const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-green-100 text-green-700 border-green-200',
};

const allStatuses = Object.keys(statusColors) as LeadStatus[];

const fmt = (v: string) =>
    new Date(v).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });

export function LeadDetail({ lead, assignees }: { lead: Lead; assignees: string[] }) {
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


    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
                        <Link href="/ops/leads"><ArrowLeft className="h-5 w-5" /></Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="font-bold text-2xl md:text-3xl text-primary">{lead.name}</h1>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[lead.status]}`}>
                                {lead.status}
                            </span>
                            {pending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>
                        <p className="text-muted-foreground">
                            Lead #{String(lead.leadNumber).padStart(3, '0')} · Received{' '}
                            {new Date(lead.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Contact Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Mail, label: 'Email', value: lead.email },
                                    { icon: Phone, label: 'Phone', value: lead.phone },
                                    { icon: Briefcase, label: 'Service Interest', value: lead.service },
                                ].map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <div className="p-2 bg-primary/10 rounded-full"><f.icon className="h-4 w-4 text-primary" /></div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">{f.label}</p>
                                            <p className="font-medium text-sm break-words">{f.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {lead.message && (
                        <Card className="shadow-lg border-none bg-card rounded-xl">
                            <CardHeader><CardTitle className="text-lg font-bold text-primary">Inquiry Message</CardTitle></CardHeader>
                            <CardContent>
                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground inline mr-2" />
                                    {lead.message}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Notes &amp; Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {lead.notes && (
                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed border-l-4 border-primary/30 whitespace-pre-wrap">
                                    {lead.notes}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Add a note about this lead..."
                                    value={newNote}
                                    onChange={e => setNewNote(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                <Button
                                    size="sm"
                                    disabled={!newNote.trim() || pending}
                                    onClick={() => run(() => addLeadNote(lead.id, newNote), () => setNewNote(''))}
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
                                <label className="text-sm font-medium">Update Status</label>
                                <Select
                                    value={lead.status}
                                    disabled={pending}
                                    onValueChange={(v) => run(() => setLeadStatus(lead.id, v as LeadStatus))}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {allStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Assign To</label>
                                <Select
                                    value={lead.assignedTo || ''}
                                    disabled={pending || assignees.length === 0}
                                    onValueChange={(v) => run(() => assignLead(lead.id, v))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={assignees.length ? 'Select advisor' : 'No ops users yet'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {assignees.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Lead Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {lead.assignedTo && (
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><User className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Assigned To</p><p className="font-medium text-sm">{lead.assignedTo}</p></div>
                                </div>
                            )}
                            {lead.lastContactDate && (
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><Clock className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Last Contact</p><p className="font-medium text-sm">{fmt(lead.lastContactDate)}</p></div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                <div className="p-2 bg-primary/10 rounded-full"><Calendar className="h-4 w-4 text-primary" /></div>
                                <div><p className="text-xs text-muted-foreground">Received</p><p className="font-medium text-sm">{new Date(lead.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
