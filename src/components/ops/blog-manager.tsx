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
    PenLine, ExternalLink, Loader2, Trash2, Eye, EyeOff, Pencil,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPost, updatePost, setPostStatus, deletePost } from "@/app/ops/website/actions";
import type { BlogPost, BlogStatus } from "@/lib/types";

const statusColors: Record<BlogStatus, string> = {
    Published: 'bg-green-100 text-green-700 border-green-200',
    Draft: 'bg-gray-100 text-gray-700 border-gray-200',
};

const fmt = (v: string) =>
    new Date(v).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });

/** Create or edit. `post` present means edit, and the slug/URL is then fixed. */
function PostDialog({
    post,
    trigger,
    onDone,
}: {
    post?: BlogPost;
    trigger: React.ReactNode;
    onDone: () => void;
}) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(post?.title ?? '');
    const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
    const [body, setBody] = useState(post?.body ?? '');
    const [category, setCategory] = useState(post?.category ?? 'Ecosystem');
    const [status, setStatus] = useState<BlogStatus>(post?.status ?? 'Draft');
    const [pending, start] = useTransition();
    const { toast } = useToast();

    const submit = () => start(async () => {
        const input = { title, excerpt, body, category, status };
        const result = post
            ? await updatePost(post.slug, input)
            : await createPost(input);

        if (!result.ok) {
            toast({ title: 'Could not save', description: result.error, variant: 'destructive' });
            return;
        }
        toast({ title: 'Saved', description: result.message });
        setOpen(false);
        if (!post) { setTitle(''); setExcerpt(''); setBody(''); }
        onDone();
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{post ? 'Edit post' : 'New post'}</DialogTitle>
                    <DialogDescription>
                        {post
                            ? `Lives at /blog/${post.slug} — the URL stays fixed even if you retitle it, so existing links keep working.`
                            : 'The URL is generated from the title.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="post-title">Title</Label>
                        <Input id="post-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Advancing African sports" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-excerpt">Excerpt</Label>
                        <Textarea id="post-excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="One or two sentences shown on the blog index." className="min-h-[60px]" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-body">Body</Label>
                        <Textarea id="post-body" value={body} onChange={e => setBody(e.target.value)} placeholder="Write the article. Leave a blank line between paragraphs." className="min-h-[220px]" />
                        <p className="text-xs text-muted-foreground">
                            Plain text — a blank line starts a new paragraph. No formatting or links yet.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="post-category">Category</Label>
                            <Input id="post-category" value={category} onChange={e => setCategory(e.target.value)} placeholder="Ecosystem" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="post-status">Status</Label>
                            <Select value={status} onValueChange={v => setStatus(v as BlogStatus)}>
                                <SelectTrigger id="post-status"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={submit} disabled={pending}>
                        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {post ? 'Save changes' : status === 'Published' ? 'Publish' : 'Save draft'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function BlogManager({ posts }: { posts: BlogPost[] }) {
    const [busy, setBusy] = useState<string | null>(null);
    const [, start] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const run = (slug: string, action: () => Promise<{ ok: boolean } & Record<string, any>>) => {
        setBusy(slug);
        start(async () => {
            const result = await action();
            setBusy(null);
            if (!result.ok) {
                toast({ title: 'Action failed', description: result.error, variant: 'destructive' });
                return;
            }
            toast({ title: 'Done', description: result.message });
            router.refresh();
        });
    };

    return (
        <Card className="shadow-lg border-none bg-card rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle className="text-lg font-bold text-primary">Blog Posts</CardTitle>
                    <CardDescription>
                        {posts.filter(p => p.status === 'Published').length} published,{' '}
                        {posts.filter(p => p.status === 'Draft').length} draft. Published posts appear at{' '}
                        <Link href="/blog" target="_blank" className="text-primary underline underline-offset-4">/blog</Link>.
                    </CardDescription>
                </div>
                <PostDialog
                    onDone={() => router.refresh()}
                    trigger={
                        <Button size="sm" className="h-8 gap-1">
                            <PenLine className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Post</span>
                        </Button>
                    }
                />
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b hover:bg-transparent">
                                <TableHead className="text-primary font-semibold pl-0">Title</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Category</TableHead>
                                <TableHead className="text-primary font-semibold">Status</TableHead>
                                <TableHead className="hidden lg:table-cell text-primary font-semibold">Author</TableHead>
                                <TableHead className="hidden md:table-cell text-primary font-semibold">Updated</TableHead>
                                <TableHead className="text-primary font-semibold text-right pr-0">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                                        No posts yet. Use <span className="font-medium">New Post</span> to write the first one.
                                    </TableCell>
                                </TableRow>
                            )}
                            {posts.map(post => {
                                const isBusy = busy === post.slug;
                                const published = post.status === 'Published';
                                return (
                                    <TableRow key={post.slug} className="border-b hover:bg-muted/50">
                                        <TableCell className="pl-0 py-4">
                                            <div className="font-medium">{post.title}</div>
                                            <div className="font-mono text-xs text-muted-foreground">/blog/{post.slug}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm">{post.category}</TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[post.status]}`}>
                                                {post.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell py-4 text-sm text-muted-foreground">{post.author}</TableCell>
                                        <TableCell className="hidden md:table-cell py-4 text-sm text-muted-foreground">{fmt(post.updatedAt)}</TableCell>
                                        <TableCell className="py-4 text-right pr-0 space-x-1 whitespace-nowrap">
                                            {isBusy && <Loader2 className="inline h-3.5 w-3.5 animate-spin text-muted-foreground" />}

                                            {published && (
                                                <Button size="sm" variant="ghost" asChild className="h-7 px-2 hover:bg-primary/10 hover:text-primary" title="View live">
                                                    <Link href={`/blog/${post.slug}`} target="_blank"><ExternalLink className="h-3.5 w-3.5" /></Link>
                                                </Button>
                                            )}

                                            <PostDialog
                                                post={post}
                                                onDone={() => router.refresh()}
                                                trigger={
                                                    <Button size="sm" variant="ghost" className="h-7 px-2 hover:bg-primary/10 hover:text-primary" title="Edit">
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                }
                                            />

                                            <Button
                                                size="sm" variant="ghost" disabled={isBusy}
                                                className="h-7 px-2 hover:bg-primary/10 hover:text-primary"
                                                title={published ? 'Unpublish' : 'Publish'}
                                                onClick={() => run(post.slug, () =>
                                                    setPostStatus(post.slug, published ? 'Draft' : 'Published'))}
                                            >
                                                {published ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                            </Button>

                                            <Button
                                                size="sm" variant="ghost" disabled={isBusy}
                                                className="h-7 px-2 hover:bg-red-100 hover:text-red-700"
                                                title="Delete permanently"
                                                onClick={() => run(post.slug, () => deletePost(post.slug))}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
