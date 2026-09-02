'use client';

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Globe, Eye, FileText, PenLine, ExternalLink, BarChart3, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cmsPages, blogPosts } from "@/lib/mock-data";
import { useState } from "react";

export default function CMSPage() {
    const [tab, setTab] = useState<'pages' | 'blog'>('pages');
    const totalViews = cmsPages.reduce((s, p) => s + p.views, 0);
    const blogViews = blogPosts.filter(b => b.status === 'Published').reduce((s, b) => s + b.views, 0);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div><h1 className="font-bold text-3xl md:text-4xl text-primary">Website (CMS)</h1><p className="text-muted-foreground mt-1">Manage the Oynamak Sports Group public website content.</p></div>
                <Button size="sm" className="h-8 gap-1"><PenLine className="h-3.5 w-3.5" /><span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Blog Post</span></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Published Pages', value: String(cmsPages.filter(p => p.status === 'Published').length), sub: 'Active on site', icon: Globe },
                    { label: 'Total Page Views', value: totalViews.toLocaleString(), sub: 'All-time visitors', icon: Eye },
                    { label: 'Blog Posts', value: String(blogPosts.length), sub: `${blogPosts.filter(b => b.status === 'Published').length} published`, icon: FileText },
                    { label: 'Blog Views', value: blogViews.toLocaleString(), sub: 'Content engagement', icon: BarChart3 },
                ].map((kpi, i) => (
                    <Card key={i} className="shadow-lg border-none bg-card hover:shadow-xl transition-shadow rounded-xl"><CardContent className="p-5"><div className="flex flex-row items-center justify-between mb-2"><span className="text-sm font-medium text-muted-foreground">{kpi.label}</span><div className="p-2 bg-primary/10 rounded-full"><kpi.icon className="h-4 w-4 text-primary" /></div></div><div className="text-2xl font-bold">{kpi.value}</div><p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p></CardContent></Card>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                <button onClick={() => setTab('pages')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'pages' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>Site Pages</button>
                <button onClick={() => setTab('blog')} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === 'blog' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>Blog Posts</button>
            </div>

            {tab === 'pages' && (
                <Card className="shadow-lg border-none bg-card rounded-xl">
                    <CardHeader><CardTitle className="text-lg font-bold text-primary">Site Pages</CardTitle><CardDescription>All public-facing pages</CardDescription></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow className="border-b hover:bg-transparent">
                                <TableHead className="text-primary font-semibold pl-0">Page Title</TableHead>
                                <TableHead className="text-primary font-semibold">Path</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Status</TableHead>
                                <TableHead className="text-primary font-semibold text-right">Views</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Updated</TableHead>
                                <TableHead className="text-primary font-semibold text-right pr-0">Actions</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {cmsPages.map(p => (
                                    <TableRow key={p.id} className="border-b hover:bg-muted/50">
                                        <TableCell className="pl-0 py-4 font-medium">{p.title}</TableCell>
                                        <TableCell className="py-4 text-sm text-muted-foreground font-mono">{p.path}</TableCell>
                                        <TableCell className="hidden md:table-cell py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${p.status === 'Published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{p.status}</span></TableCell>
                                        <TableCell className="py-4 text-right font-medium text-sm">{p.views.toLocaleString()}</TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">{new Date(p.lastUpdated).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</TableCell>
                                        <TableCell className="py-4 text-right pr-0 space-x-1">
                                            <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary h-7 px-2"><PenLine className="h-3.5 w-3.5" /></Button>
                                            <Button size="sm" variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary h-7 px-2"><Link href={p.path} target="_blank"><ExternalLink className="h-3.5 w-3.5" /></Link></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {tab === 'blog' && (
                <Card className="shadow-lg border-none bg-card rounded-xl">
                    <CardHeader><CardTitle className="text-lg font-bold text-primary">Blog Posts</CardTitle><CardDescription>Market insights & educational content</CardDescription></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow className="border-b hover:bg-transparent">
                                <TableHead className="text-primary font-semibold pl-0">Title</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Category</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Author</TableHead>
                                <TableHead className="text-primary font-semibold">Status</TableHead>
                                <TableHead className="text-primary font-semibold text-right">Views</TableHead>
                                <TableHead className="hidden lg:table-cell text-primary font-semibold pr-0">Date</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {blogPosts.map(b => (
                                    <TableRow key={b.id} className="border-b hover:bg-muted/50">
                                        <TableCell className="pl-0 py-4"><div className="font-medium">{b.title}</div><div className="text-xs text-muted-foreground mt-0.5 max-w-md truncate">{b.excerpt}</div></TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm">{b.category}</TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm">{b.author}</TableCell>
                                        <TableCell className="py-4"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${b.status === 'Published' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}>{b.status}</span></TableCell>
                                        <TableCell className="py-4 text-right font-medium text-sm">{b.views > 0 ? b.views.toLocaleString() : '—'}</TableCell>
                                        <TableCell className="hidden lg:table-cell py-4 text-sm text-muted-foreground pr-0">{new Date(b.date).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
