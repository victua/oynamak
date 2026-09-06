// Server-side access to the `blog` collection.
//
// Public blog pages render on the server and read through the Admin SDK, so
// the collection needs no Firestore rule — it stays denied by default like
// `leads` and `customers`, and drafts are never reachable from the browser.

import 'server-only';
import { adminDb } from './firebase-admin';
import type { BlogPost, BlogStatus } from './types';

export const BLOG_COLLECTION = 'blog';

export const BLOG_STATUSES: BlogStatus[] = ['Draft', 'Published'];

/**
 * True while `next build` is prerendering.
 *
 * The build runs in a Docker container with no Google credentials, where the
 * Admin SDK does not fail — it blocks on the GCE metadata server until the TCP
 * connection times out, well past the 60s Next allows a page to render. A
 * try/catch cannot save a caller from that, because a hang throws nothing.
 *
 * So the public readers below return empty during the build and fetch for real
 * at request time, where the Cloud Run service account is present. Nothing is
 * lost: /blog revalidates a minute after deploy, a post URL renders on demand,
 * and the sitemap is force-dynamic.
 */
function isPrerender(): boolean {
    return process.env.NEXT_PHASE === 'phase-production-build';
}

/** Turns a title into a URL-safe slug. */
export function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
}

function toPost(slug: string, d: FirebaseFirestore.DocumentData): BlogPost {
    return {
        slug,
        title: d.title ?? '',
        excerpt: d.excerpt ?? '',
        body: d.body ?? '',
        category: d.category ?? 'General',
        author: d.author ?? '',
        status: d.status === 'Published' ? 'Published' : 'Draft',
        createdAt: typeof d.createdAt === 'string' ? d.createdAt : new Date(0).toISOString(),
        updatedAt: typeof d.updatedAt === 'string' ? d.updatedAt : new Date(0).toISOString(),
        publishedAt: typeof d.publishedAt === 'string' ? d.publishedAt : undefined,
    };
}

/** Every post, drafts included. Admin console only. */
export async function listAllPosts(): Promise<BlogPost[]> {
    const snap = await adminDb.collection(BLOG_COLLECTION).get();
    return snap.docs
        .map(doc => toPost(doc.id, doc.data()))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Published posts only, newest first. Safe for the public site. */
export async function listPublishedPosts(): Promise<BlogPost[]> {
    if (isPrerender()) return [];
    const snap = await adminDb
        .collection(BLOG_COLLECTION)
        .where('status', '==', 'Published')
        .get();
    return snap.docs
        .map(doc => toPost(doc.id, doc.data()))
        .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
    if (isPrerender()) return null;
    const snap = await adminDb.collection(BLOG_COLLECTION).doc(slug).get();
    return snap.exists ? toPost(snap.id, snap.data()!) : null;
}

/** A published post by slug — what the public page asks for. Drafts return null. */
export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
    const post = await getPost(slug);
    return post?.status === 'Published' ? post : null;
}

/** Distinct categories across published posts, for the public index. */
export async function publishedCategories(): Promise<string[]> {
    const posts = await listPublishedPosts();
    return [...new Set(posts.map(p => p.category))].sort();
}
