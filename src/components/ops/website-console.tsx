'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, FileText, CornerUpRight, Search, ExternalLink, Layers, Pencil } from "lucide-react";
import { BlogManager } from "@/components/ops/blog-manager";
import type { SitePage } from "@/lib/site-pages";
import type { BlogPost } from "@/lib/types";

const sectionOrder: SitePage['section'][] = ['Main', 'Solutions', 'Legacy'];

const kindColors: Record<SitePage['kind'], string> = {
    page: 'bg-green-100 text-green-700 border-green-200',
    dynamic: 'bg-blue-100 text-blue-700 border-blue-200',
    redirect: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const kindLabels: Record<SitePage['kind'], string> = {
    page: 'Page',
    dynamic: 'Template',
    redirect: 'Redirect',
};

export function WebsiteConsole({
    pages,
    posts,
}: {
    pages: SitePage[];
    posts: BlogPost[];
}) {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState<'pages' | 'blog'>('pages');

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return pages
            .filter(p => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q))
            .sort((a, b) =>
                sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section) ||
                a.path.localeCompare(b.path));
    }, [pages, search]);

    const counts = useMemo(() => ({
        total: pages.length,
        content: pages.filter(p => p.kind === 'page').length,
        templates: pages.filter(p => p.kind === 'dynamic').length,
        solutions: pages.filter(p => p.section === 'Solutions').length,
        redirects: pages.filter(p => p.kind === 'redirect').length,
        editable: pages.filter(p => !!p.contentId).length,
    }), [pages]);

    return (
        <main className="flex flex-1 flex-col gap-8 pb-8 bg-background">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-3xl md:text-4xl text-primary">Website</h1>
                    <p className="text-muted-foreground mt-1">
                        Every route on the public site, kept in step with the codebase.
                    </p>
                </div>
                <Button size="sm" variant="outline" className="h-8 gap-1" asChild>
                    <Link href="/" target="_blank">
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">View Site</span>
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Total Routes', value: counts.total, sub: 'Public URLs', icon: Globe },
                    { label: 'Editable Pages', value: counts.editable, sub: 'Edit on the live page', icon: Pencil },
                    { label: 'Solution Pages', value: counts.solutions, sub: 'Under /solutions', icon: Layers },
                    { label: 'Legacy Redirects', value: counts.redirects, sub: 'Old paths kept alive', icon: CornerUpRight },
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

            <div className="flex gap-2 border-b">
                {(['pages', 'blog'] as const).map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        {t === 'pages' ? 'Site Pages' : 'Blog Posts'}
                    </button>
                ))}
            </div>

            {tab === 'pages' && (
                <>
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search pages..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>

                    <Card className="shadow-lg border-none bg-card rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-primary">Site Pages</CardTitle>
                            <CardDescription>
                                Showing {filtered.length} of {pages.length} routes. Pages marked
                                &ldquo;Edit&rdquo; are edited on the live page itself: open one, hit
                                &ldquo;Edit page&rdquo; at the bottom right, then click any text or image.
                                Edits save as you go and are visible to everyone straight away.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b hover:bg-transparent">
                                            <TableHead className="text-primary font-semibold pl-0">Page Title</TableHead>
                                            <TableHead className="text-primary font-semibold">Path</TableHead>
                                            <TableHead className="hidden md:table-cell text-primary font-semibold">Section</TableHead>
                                            <TableHead className="text-primary font-semibold">Type</TableHead>
                                            <TableHead className="hidden lg:table-cell text-primary font-semibold">In Nav</TableHead>
                                            <TableHead className="text-primary font-semibold text-right pr-0">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filtered.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                                                    No pages match that search.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {filtered.map(p => (
                                            <TableRow key={p.path} className="border-b hover:bg-muted/50">
                                                <TableCell className="pl-0 py-4">
                                                    <div className="font-medium">{p.title}</div>
                                                    {p.redirectsTo && (
                                                        <div className="text-xs text-muted-foreground">
                                                            redirects to {p.redirectsTo}
                                                        </div>
                                                    )}
                                                    {p.generatedFrom && (
                                                        <div className="text-xs text-muted-foreground">
                                                            {p.generatedFrom}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 font-mono text-sm text-muted-foreground">{p.path}</TableCell>
                                                <TableCell className="hidden md:table-cell py-4 text-sm">{p.section}</TableCell>
                                                <TableCell className="py-4">
                                                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${kindColors[p.kind]}`}>
                                                        {kindLabels[p.kind]}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell py-4 text-sm text-muted-foreground">
                                                    {p.inNav ? 'Yes' : 'No'}
                                                </TableCell>
                                                <TableCell className="py-4 text-right pr-0">
                                                    {p.kind === 'dynamic' ? (
                                                        <span className="text-xs text-muted-foreground pr-2">No single URL</span>
                                                    ) : (
                                                        // Same link either way — the "Edit page" toolbar lives on
                                                        // the page and only appears for admins, so the label just
                                                        // says which pages will actually offer it.
                                                        <Button size="sm" variant="ghost" asChild className="hover:bg-primary/10 hover:text-primary">
                                                            <Link href={p.path} target="_blank">
                                                                {p.contentId ? (
                                                                    <><Pencil className="h-3.5 w-3.5 mr-1" /> Edit</>
                                                                ) : (
                                                                    <><ExternalLink className="h-3.5 w-3.5 mr-1" /> View</>
                                                                )}
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}

            {tab === 'blog' && <BlogManager posts={posts} />}

        </main>
    );
}
