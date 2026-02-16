'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Megaphone, TrendingUp, Users, MousePointerClick, Eye, DollarSign, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCampaigns } from "@/lib/mock-data";
import { useState } from "react";

const statusColors: Record<string, string> = { 'Active': 'bg-green-100 text-green-700 border-green-200', 'Scheduled': 'bg-blue-100 text-blue-700 border-blue-200', 'Completed': 'bg-gray-100 text-gray-600 border-gray-200', 'Draft': 'bg-yellow-100 text-yellow-700 border-yellow-200' };
const typeColors: Record<string, string> = { 'Email': 'bg-blue-100 text-blue-700 border-blue-200', 'Social Media': 'bg-purple-100 text-purple-700 border-purple-200', 'Content': 'bg-green-100 text-green-700 border-green-200', 'Paid Ads': 'bg-orange-100 text-orange-700 border-orange-200' };

export default function MarketingPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const filtered = mockCampaigns.filter(c => statusFilter === 'all' || c.status === statusFilter);

    const totalLeads = mockCampaigns.reduce((s, c) => s + c.leads, 0);
    const totalSpent = mockCampaigns.reduce((s, c) => s + c.spent, 0);
    const totalImpressions = mockCampaigns.reduce((s, c) => s + c.impressions, 0);
    const totalConversions = mockCampaigns.reduce((s, c) => s + c.conversions, 0);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Marketing</h1><p className="text-muted-foreground mt-1">Campaigns, lead generation, and brand reach.</p></div>
                <Button size="sm" className="h-8 gap-1"><Plus className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Campaign</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Leads Generated', value: String(totalLeads), sub: 'From all campaigns', icon: Users },
                    { label: 'Total Impressions', value: `${(totalImpressions / 1000).toFixed(1)}K`, sub: 'Brand visibility', icon: Eye },
                    { label: 'Conversions', value: String(totalConversions), sub: `${((totalConversions / totalLeads) * 100).toFixed(0)}% rate`, icon: TrendingUp },
                    { label: 'Total Spent', value: `KES ${(totalSpent / 1000).toFixed(0)}K`, sub: `Of KES ${(mockCampaigns.reduce((s, c) => s + c.budget, 0) / 1000).toFixed(0)}K budget`, icon: DollarSign },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Scheduled">Scheduled</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Draft">Draft</SelectItem></SelectContent></Select>
            </div>

            <Card className="shadow-lg border-none bg-card rounded-xl">
                <CardHeader><CardTitle className="text-xl font-bold text-primary">All Campaigns</CardTitle><CardDescription>Showing {filtered.length} of {mockCampaigns.length} campaigns</CardDescription></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow className="border-b hover:bg-transparent">
                            <TableHead className="text-primary font-semibold pl-0">Campaign</TableHead>
                            <TableHead className="text-primary font-semibold">Type</TableHead>
                            <TableHead className="text-primary font-semibold">Status</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold">Channel</TableHead>
                            <TableHead className="hidden md:table-cell text-primary font-semibold text-right">Leads</TableHead>
                            <TableHead className="hidden lg:table-cell text-primary font-semibold text-right">Clicks</TableHead>
                            <TableHead className="text-primary font-semibold text-right">Spent</TableHead>
                            <TableHead className="hidden lg:table-cell text-primary font-semibold text-right pr-0">Conv.</TableHead>
                        </TableRow></TableHeader>
                        <TableBody>
                            {filtered.map(c => (
                                <TableRow key={c.id} className="border-b hover:bg-muted/50">
                                    <TableCell className="pl-0 py-4"><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{new Date(c.startDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}{c.endDate ? ` — ${new Date(c.endDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}` : ' — Ongoing'}</div></TableCell>
                                    <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[c.type]}`}>{c.type}</span></TableCell>
                                    <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[c.status]}`}>{c.status}</span></TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-sm">{c.channel}</TableCell>
                                    <TableCell className="hidden md:table-cell py-4 text-right font-medium">{c.leads}</TableCell>
                                    <TableCell className="hidden lg:table-cell py-4 text-right text-sm">{c.clicks.toLocaleString()}</TableCell>
                                    <TableCell className="py-4 text-right text-sm font-medium">KES {(c.spent / 1000).toFixed(0)}K</TableCell>
                                    <TableCell className="hidden lg:table-cell py-4 text-right pr-0 font-medium">{c.conversions}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    );
}
