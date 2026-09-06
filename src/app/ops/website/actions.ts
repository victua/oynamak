'use server';

// Blog authoring. Ops roles may write and edit; publishing is the same
// permission — the gate that matters is that this all runs server-side with
// requireUser, since the Admin SDK bypasses Firestore rules.

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
import { requireUser } from '@/lib/auth-server';
import { BLOG_COLLECTION, BLOG_STATUSES, slugify } from '@/lib/blog-server';
import type { BlogStatus } from '@/lib/types';

export type BlogActionResult =
    | { ok: true; message: string; slug?: string }
    | { ok: false; error: string };

function fail(error: unknown): BlogActionResult {
    return { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' };
}

/** Public blog pages are cached; every write has to bust them. */
function refresh(slug?: string) {
    revalidatePath('/ops/website');
    revalidatePath('/blog');
    if (slug) revalidatePath(`/blog/${slug}`);
}

export type PostInput = {
    title: string;
    excerpt: string;
    body: string;
    category: string;
    status: BlogStatus;
};

function validate(input: PostInput) {
    const title = input.title.trim();
    const excerpt = input.excerpt.trim();
    const body = input.body.trim();
    const category = input.category.trim() || 'General';

    if (title.length < 3) throw new Error('Give the post a title.');
    if (!excerpt) throw new Error('Write a short excerpt — it appears on the blog index.');
    if (!body) throw new Error('The post has no content.');
    if (!BLOG_STATUSES.includes(input.status)) throw new Error('Unknown status.');

    return { title, excerpt, body, category };
}

export async function createPost(input: PostInput): Promise<BlogActionResult> {
    try {
        const actor = await requireUser();
        const { title, excerpt, body, category } = validate(input);

        const slug = slugify(title);
        if (!slug) throw new Error('That title cannot be turned into a URL. Use some letters or numbers.');

        const ref = adminDb.collection(BLOG_COLLECTION).doc(slug);
        if ((await ref.get()).exists) {
            throw new Error(`A post already lives at /blog/${slug}. Change the title.`);
        }

        const now = new Date().toISOString();
        await ref.set({
            title, excerpt, body, category,
            author: actor.displayName,
            status: input.status,
            createdAt: now,
            updatedAt: now,
            ...(input.status === 'Published' ? { publishedAt: now } : {}),
        });

        refresh(slug);
        return {
            ok: true,
            slug,
            message: input.status === 'Published' ? `Published at /blog/${slug}.` : 'Draft saved.',
        };
    } catch (error) {
        return fail(error);
    }
}

export async function updatePost(slug: string, input: PostInput): Promise<BlogActionResult> {
    try {
        await requireUser();
        const { title, excerpt, body, category } = validate(input);

        const ref = adminDb.collection(BLOG_COLLECTION).doc(slug);
        const snap = await ref.get();
        if (!snap.exists) throw new Error('That post no longer exists.');

        // The slug is the document id and therefore the public URL. Changing it
        // would break every existing link, so a retitled post keeps its URL.
        const wasPublished = snap.data()?.publishedAt;
        await ref.update({
            title, excerpt, body, category,
            status: input.status,
            updatedAt: new Date().toISOString(),
            ...(input.status === 'Published' && !wasPublished
                ? { publishedAt: new Date().toISOString() }
                : {}),
        });

        refresh(slug);
        return { ok: true, slug, message: 'Post updated.' };
    } catch (error) {
        return fail(error);
    }
}

export async function setPostStatus(slug: string, status: BlogStatus): Promise<BlogActionResult> {
    try {
        await requireUser();
        if (!BLOG_STATUSES.includes(status)) throw new Error('Unknown status.');

        const ref = adminDb.collection(BLOG_COLLECTION).doc(slug);
        const snap = await ref.get();
        if (!snap.exists) throw new Error('That post no longer exists.');

        await ref.update({
            status,
            updatedAt: new Date().toISOString(),
            ...(status === 'Published' && !snap.data()?.publishedAt
                ? { publishedAt: new Date().toISOString() }
                : {}),
        });

        refresh(slug);
        return { ok: true, slug, message: status === 'Published' ? 'Post published.' : 'Post unpublished.' };
    } catch (error) {
        return fail(error);
    }
}

export async function deletePost(slug: string): Promise<BlogActionResult> {
    try {
        // Deletion is permanent and breaks any live URL, so admins only.
        await requireUser();

        const ref = adminDb.collection(BLOG_COLLECTION).doc(slug);
        if (!(await ref.get()).exists) throw new Error('That post no longer exists.');

        await ref.delete();
        refresh(slug);
        return { ok: true, message: 'Post deleted.' };
    } catch (error) {
        return fail(error);
    }
}
