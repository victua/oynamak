import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ArrowUpRight, PenLine } from "lucide-react";
import { listPublishedPosts } from "@/lib/blog-server";

// Posts change rarely; the authoring actions call revalidatePath so a publish
// shows up immediately rather than waiting out this window.
export const revalidate = 60;

export const metadata: Metadata = {
    title: "Insights | Oynamak Sports Group Ltd",
    description:
        "Perspectives on the African sports ecosystem — equipment, partnerships, tourism, innovation and capacity building.",
};

const fmt = (v: string) =>
    new Date(v).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" });

export default async function BlogIndexPage() {
    const posts = await listPublishedPosts();

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            <section className="pt-32 pb-12 px-4 md:px-6">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                        <PenLine className="h-3.5 w-3.5" />
                        Insights
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">
                        Perspectives on the sports ecosystem
                    </h1>
                    <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
                        Notes from our work across equipment, partnerships, tourism, innovation
                        and capacity building.
                    </p>
                </div>
            </section>

            <section className="px-4 md:px-6 pb-24">
                {posts.length === 0 ? (
                    <Card className="max-w-2xl border-dashed shadow-none">
                        <CardContent className="py-12 text-center">
                            <p className="font-medium">No articles published yet</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Come back shortly — we&apos;re working on the first pieces.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                <Card className="h-full rounded-xl border-none bg-card shadow-lg transition-shadow hover:shadow-xl">
                                    <CardContent className="flex h-full flex-col p-6">
                                        <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                                            {post.category}
                                        </span>
                                        <h2 className="text-lg font-bold text-primary group-hover:underline underline-offset-4">
                                            {post.title}
                                        </h2>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="inline-flex items-center gap-1.5">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                {fmt(post.publishedAt ?? post.createdAt)}
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
