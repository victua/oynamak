'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, Shield, Clock, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { staffMembers } from "@/lib/mock-data";
import { useState } from "react";

const permissionLabels: Record<string, string> = {
    admin: 'Admin', finance: 'Finance', portfolio: 'Portfolio', staff: 'Staff Mgmt',
    marketing: 'Marketing', cms: 'Website CMS', leads: 'Leads', customers: 'Customers',
    events: 'Events', users: 'User Mgmt',
};
const statusColors: Record<string, string> = { 'Active': 'bg-green-100 text-green-700 border-green-200', 'On Leave': 'bg-yellow-100 text-yellow-700 border-yellow-200', 'Deactivated': 'bg-red-100 text-red-700 border-red-200' };

export default function StaffPage() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Staff</h1><p className="text-muted-foreground mt-1">Team members, roles, and activity audit trail.</p></div>
                <Button size="sm" className="h-8 gap-1"><UsersRound className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Member</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                    { label: 'Team Size', value: String(staffMembers.length), sub: `${staffMembers.filter(s => s.status === 'Active').length} active`, icon: UsersRound },
                    { label: 'Departments', value: String(new Set(staffMembers.map(s => s.department)).size), sub: 'Across the firm', icon: Shield },
                    { label: 'Active Today', value: String(staffMembers.filter(s => { const d = new Date(s.lastActive); const t = new Date(); return d.toDateString() === t.toDateString(); }).length), sub: 'Members logged in', icon: Clock },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <div className="space-y-4">
                {staffMembers.map(member => {
                    const isExpanded = expandedId === member.id;
                    return (
                        <Card key={member.id} className="shadow-lg border-none bg-card rounded-xl overflow-hidden">
                            <div className="p-6 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setExpandedId(isExpanded ? null : member.id)}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{member.initials}</div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg">{member.name}</h3>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[member.status]}`}>{member.status}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{member.role} · {member.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="hidden md:block text-right"><p className="text-xs text-muted-foreground">Last active</p><p className="text-sm font-medium">{new Date(member.lastActive).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}</p></div>
                                        {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                                    </div>
                                </div>
                            </div>

                            {isExpanded && (
                                <div className="border-t px-6 pb-6 pt-4 space-y-6 bg-muted/10">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Contact & Permissions */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-primary">Contact</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary" />{member.email}</div>
                                                <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary" />{member.phone}</div>
                                                <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" />Joined {new Date(member.joinDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                                            </div>
                                            <h4 className="text-sm font-bold text-primary mt-4">Permissions</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {member.permissions.map(p => (
                                                    <span key={p} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">{permissionLabels[p] || p}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Activity Log */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold text-primary">Recent Activity</h4>
                                            <div className="space-y-3">
                                                {member.activityLog.map((log, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium">{log.action}</p>
                                                            <p className="text-xs text-muted-foreground">{log.target}</p>
                                                            <p className="text-xs text-muted-foreground">{new Date(log.date).toLocaleString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}
