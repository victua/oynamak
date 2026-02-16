'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserCog, Shield, Eye, FileText, Users, Lock, Unlock, KeyRound, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { portalUsers, mockCustomers } from "@/lib/mock-data";
import { useState } from "react";

const statusColors: Record<string, string> = { 'Active': 'bg-green-100 text-green-700 border-green-200', 'Locked': 'bg-red-100 text-red-700 border-red-200', 'Pending Activation': 'bg-yellow-100 text-yellow-700 border-yellow-200' };

export default function UsersPage() {
    const [search, setSearch] = useState('');
    const filtered = portalUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

    const activeUsers = portalUsers.filter(u => u.status === 'Active').length;
    const totalLogins = portalUsers.reduce((s, u) => s + u.loginCount, 0);
    const totalDocs = portalUsers.reduce((s, u) => s + u.documentsUploaded, 0);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Users (Client Portal)</h1><p className="text-muted-foreground mt-1">Manage client access to the Wealth Sanctuary portal.</p></div>
                <Button size="sm" className="h-8 gap-1"><UserCog className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Invite User</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Portal Users', value: String(portalUsers.length), sub: `${activeUsers} active`, icon: Users },
                    { label: 'Total Logins', value: String(totalLogins), sub: 'Lifetime sessions', icon: KeyRound },
                    { label: 'Docs Uploaded', value: String(totalDocs), sub: 'KYC & statements', icon: FileText },
                    { label: 'Statements Viewed', value: String(portalUsers.reduce((s, u) => s + u.statementsViewed, 0)), sub: 'Client engagement', icon: Eye },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search users..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} /></div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader><CardTitle className="text-xl font-bold text-primary">All Portal Users</CardTitle><CardDescription>Client access to Wealth Sanctuary</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow className="border-b hover:bg-transparent">
                            <TableHead className="text-primary font-semibold pl-0">Client</TableHead>
                            <TableHead className="text-primary font-semibold">Status</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold text-right">Logins</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold text-right">Docs</TableHead>
                            <TableHead className="hidden lg:table-cell text-primary font-semibold text-right">Statements</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold">Last Login</TableHead>
                            <TableHead className="text-primary font-semibold text-right pr-0">Actions</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {filtered.map(u => (
                                <TableRow key={u.id} className="border-b hover:bg-muted/50">
                                    <TableCell className="pl-0 py-4"><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></TableCell>
                                    <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[u.status]}`}>{u.status}</span></TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-right font-medium">{u.loginCount}</TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-right">{u.documentsUploaded}</TableCell>
                                    <TableCell className="hidden lg:table-cell py-4 text-right">{u.statementsViewed}</TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">{new Date(u.lastLogin).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</TableCell>
                                    <TableCell className="py-4 text-right pr-0 space-x-1">
                                        <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary h-7 px-2" title="Reset Password"><KeyRound className="h-3.5 w-3.5" /></Button>
                                        {u.status === 'Locked' ? (
                                            <Button size="sm" variant="ghost" className="hover:bg-green-100 hover:text-green-700 h-7 px-2" title="Unlock"><Unlock className="h-3.5 w-3.5" /></Button>
                                        ) : (
                                            <Button size="sm" variant="ghost" className="hover:bg-red-100 hover:text-red-700 h-7 px-2" title="Lock"><Lock className="h-3.5 w-3.5" /></Button>
                                        )}
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
