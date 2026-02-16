'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, DollarSign, User, Briefcase, Clock, MessageSquare, UserCheck } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import type { LeadStatus } from "@/lib/types";
import { useState } from "react";

const statusColors: Record<LeadStatus, string> = {
    'New': 'bg-blue-100 text-blue-700 border-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
    'Proposal': 'bg-orange-100 text-orange-700 border-orange-200',
    'Converted': 'bg-green-100 text-green-700 border-green-200',
    'Lost': 'bg-red-100 text-red-700 border-red-200',
};

const statusSteps: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Converted'];

export default function LeadDetailPage() {
    const params = useParams();
    const lead = mockLeads.find(l => l.id === params.id);
    const [newNote, setNewNote] = useState('');

    if (!lead) {
        return (
            <main className="flex flex-1 flex-col items-center justify-center gap-4 pb-8">
                <h1 className="text-2xl font-bold text-primary">Lead Not Found</h1>
                <Button asChild><Link href="/ops/leads">Back to Leads</Link></Button>
            </main>
        );
    }

    const currentStepIndex = statusSteps.indexOf(lead.status);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            {/* Header */}
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
                        </div>
                        <p className="text-muted-foreground">Lead #{String(lead.leadNumber).padStart(3, '0')} · Received {new Date(lead.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {lead.status !== 'Converted' && lead.status !== 'Lost' && (
                        <Button size="sm" className="gap-1">
                            <UserCheck className="h-4 w-4" />
                            Convert to Customer
                        </Button>
                    )}
                </div>
            </div>

            {/* Pipeline Progress */}
            {lead.status !== 'Lost' && (
                <Card className="shadow-lg border-none bg-card rounded-xl">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            {statusSteps.map((step, i) => {
                                const isCompleted = i <= currentStepIndex;
                                const isCurrent = i === currentStepIndex;
                                return (
                                    <div key={step} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center gap-2 flex-1">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                                                {i + 1}
                                            </div>
                                            <span className={`text-xs font-medium ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>{step}</span>
                                        </div>
                                        {i < statusSteps.length - 1 && (
                                            <div className={`h-1 flex-1 rounded-full mx-1 ${i < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Contact Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><Mail className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Email</p><p className="font-medium text-sm">{lead.email}</p></div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><Phone className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Phone</p><p className="font-medium text-sm">{lead.phone}</p></div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><Briefcase className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Service Interest</p><p className="font-medium text-sm">{lead.service}</p></div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><MapPin className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Source</p><p className="font-medium text-sm">{lead.source}</p></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Inquiry Message */}
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

                    {/* Notes */}
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Notes & Activity</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {lead.notes && (
                                <div className="p-4 bg-muted/50 rounded-lg text-sm leading-relaxed border-l-4 border-primary/30">
                                    {lead.notes}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Textarea placeholder="Add a note about this lead..." value={newNote} onChange={e => setNewNote(e.target.value)} className="min-h-[80px]" />
                                <Button size="sm" disabled={!newNote.trim()}>Add Note</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Quick Actions */}
                <div className="space-y-6">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Quick Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Update Status</label>
                                <Select defaultValue={lead.status}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="Contacted">Contacted</SelectItem>
                                        <SelectItem value="Qualified">Qualified</SelectItem>
                                        <SelectItem value="Proposal">Proposal</SelectItem>
                                        <SelectItem value="Converted">Converted</SelectItem>
                                        <SelectItem value="Lost">Lost</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Assign To</label>
                                <Select defaultValue={lead.assignedTo || ''}>
                                    <SelectTrigger><SelectValue placeholder="Select advisor" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mumbi Mbiyu">Mumbi Mbiyu</SelectItem>
                                        <SelectItem value="John Kamau">John Kamau</SelectItem>
                                        <SelectItem value="Sarah Njoroge">Sarah Njoroge</SelectItem>
                                        <SelectItem value="Alexandria Kimathi">Alexandria Kimathi</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-full" size="sm">Save Changes</Button>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">Lead Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {lead.estimatedValue && (
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><DollarSign className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Estimated Value</p><p className="font-bold text-sm">KES {lead.estimatedValue.toLocaleString()}</p></div>
                                </div>
                            )}
                            {lead.assignedTo && (
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><User className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Assigned To</p><p className="font-medium text-sm">{lead.assignedTo}</p></div>
                                </div>
                            )}
                            {lead.lastContactDate && (
                                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                    <div className="p-2 bg-primary/10 rounded-full"><Clock className="h-4 w-4 text-primary" /></div>
                                    <div><p className="text-xs text-muted-foreground">Last Contact</p><p className="font-medium text-sm">{new Date(lead.lastContactDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
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
