import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { getPublishedPost, listPublishedPosts } from "@/lib/blog-server";

export const revalidate = 60;

/** Pre-render published posts; anything else falls through to on-demand. */
export async function generateStaticParams() {
    try {
        return (await listPublishedPosts()).map((p) => ({ slug: p.slug }));
    } catch {
        // Never fail the build because Firestore was unreachable.
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPublishedPost(slug);
    if (!post) return { title: "Article not found | Oynamak Sports Group Ltd" };

    return {
        title: `${post.title} | Oynamak Sports Group Ltd`,
        description: post.excerpt,
        openGraph: { title: post.title, description: post.excerpt, type: "article" },
    };
}

const fmt = (v: string) =>
    new Date(v).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // getPublishedPost returns null for drafts, so an unpublished post 404s
    // rather than leaking through a guessed URL.
    const post = await getPublishedPost(slug);
    if (!post) notFound();

    // Body is stored as plain text; blank lines separate paragraphs. Rendering
    // it as text (not HTML) means authored content can never inject markup.
    const paragraphs = post.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            <article className="pt-32 pb-24 px-4 md:px-6">
                <div className="max-w-2xl">
                    <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 gap-1 text-muted-foreground">
                        <Link href="/blog"><ArrowLeft className="h-4 w-4" /> All insights</Link>
                    </Button>

                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                        {post.category}
                    </span>

                    <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-primary">
                        {post.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5" /> {post.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {fmt(post.publishedAt ?? post.createdAt)}
                        </span>
                    </div>

                    <p className="mt-6 border-l-4 border-primary/30 pl-4 text-lg leading-relaxed text-muted-foreground">
                        {post.excerpt}
                    </p>

                    <div className="mt-8 space-y-5">
                        {paragraphs.map((p, i) => (
                            <p key={i} className="text-base leading-relaxed whitespace-pre-wrap">{p}</p>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
