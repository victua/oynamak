'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, CheckCircle2, MapPin, Plus, Eye, UserPlus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEvents } from "@/lib/mock-data";
import { useState } from "react";

const statusColors: Record<string, string> = { 'Upcoming': 'bg-blue-100 text-blue-700 border-blue-200', 'Ongoing': 'bg-green-100 text-green-700 border-green-200', 'Completed': 'bg-gray-100 text-gray-600 border-gray-200', 'Cancelled': 'bg-red-100 text-red-700 border-red-200' };
const typeColors: Record<string, string> = { 'Seminar': 'bg-purple-100 text-purple-700 border-purple-200', 'Webinar': 'bg-blue-100 text-blue-700 border-blue-200', 'Workshop': 'bg-orange-100 text-orange-700 border-orange-200', 'Client Dinner': 'bg-green-100 text-green-700 border-green-200' };

export default function EventsPage() {
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const filtered = mockEvents.filter(e => statusFilter === 'all' || e.status === statusFilter);
    const selected = mockEvents.find(e => e.id === selectedEvent);

    const totalRegistrations = mockEvents.reduce((s, e) => s + e.registrations, 0);
    const totalAttendees = mockEvents.filter(e => e.status === 'Completed').reduce((s, e) => s + e.attendees, 0);
    const warmLeads = mockEvents.flatMap(e => e.registeredContacts.filter(c => c.attended && c.isLead)).length;

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Events</h1><p className="text-muted-foreground mt-1">Seminars, webinars, and client workshops.</p></div>
                <Button size="sm" className="h-8 gap-1"><Plus className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Event</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Events', value: String(mockEvents.length), sub: `${mockEvents.filter(e => e.status === 'Upcoming').length} upcoming`, icon: CalendarDays },
                    { label: 'Registrations', value: String(totalRegistrations), sub: 'All events combined', icon: Users },
                    { label: 'Attended', value: String(totalAttendees), sub: 'From completed events', icon: CheckCircle2 },
                    { label: 'Warm Leads', value: String(warmLeads), sub: 'Attendees flagged as leads', icon: UserPlus },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="Upcoming">Upcoming</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem></SelectContent></Select>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader><CardTitle className="text-lg font-bold text-primary">All Events</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {filtered.map(evt => (
                                <div key={evt.id} onClick={() => setSelectedEvent(evt.id)} className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedEvent === evt.id ? 'border-primary bg-primary/5' : 'border-muted bg-muted/30 hover:border-primary/30'}`}>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-lg">{evt.title}</h3>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(evt.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{evt.venue}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${typeColors[evt.type]}`}>{evt.type}</span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[evt.status]}`}>{evt.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 mt-3 text-sm">
                                        <span><strong>{evt.registrations}</strong> / {evt.capacity} registered</span>
                                        {evt.status === 'Completed' && <span><strong>{evt.attendees}</strong> attended</span>}
                                    </div>
                                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${(evt.registrations / evt.capacity) * 100}%` }} /></div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Event Detail / Registrations */}
                <div>
                    {selected ? (
                        <Card className="shadow-lg border-none bg-card rounded-xl sticky top-28">
                            <CardHeader><CardTitle className="text-lg font-bold text-primary">Registrations</CardTitle><CardDescription>{selected.title}</CardDescription></CardHeader>
                            <CardContent className="space-y-3">
                                {selected.registeredContacts.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                        <div><p className="font-medium text-sm">{c.name}</p><p className="text-xs text-muted-foreground">{c.email}</p></div>
                                        <div className="flex items-center gap-2">
                                            {c.isLead && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">Lead</span>}
                                            {selected.status === 'Completed' && (
                                                c.attended
                                                    ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Attended</span>
                                                    : <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">No Show</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <p className="text-xs text-muted-foreground text-center">Showing {selected.registeredContacts.length} of {selected.registrations} registrations</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="shadow-lg border-none bg-card rounded-xl">
                            <CardContent className="p-8 text-center text-muted-foreground"><CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-30" /><p>Select an event to view registrations</p></CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    );
}
