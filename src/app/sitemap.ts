import type { MetadataRoute } from 'next';
import { contentPages } from '@/lib/site-pages';
import { listPublishedPosts } from '@/lib/blog-server';
import { absoluteUrl } from '@/lib/site-url';

// Built from the SITE_PAGES registry rather than a hand-kept list, so a page
// added without a sitemap entry is impossible — `npm run check:pages` already
// fails when the registry drifts from the real routes.
//
// Legacy paths are deliberately left out: they answer 308 (see the redirects in
// next.config.ts), and listing a redirect in a sitemap is a crawl error.

// Rendered per request, not at build time. The build container has no
// Firestore credentials, and listing posts there would hang on the metadata
// server rather than fail — which is precisely what broke the first deploy.
// On Cloud Run the runtime credentials are present, so this reads live.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    const pages: MetadataRoute.Sitemap = contentPages().map((page) => ({
        url: absoluteUrl(page.path),
        lastModified: now,
        changeFrequency: 'monthly',
        // The home page outranks the rest; the solutions hub and its children
        // sit above the transactional pages.
        priority: page.path === '/' ? 1 : page.section === 'Solutions' ? 0.8 : 0.7,
    }));

    // One entry per published post. A draft is never listed — getPublishedPost
    // would 404 it anyway, and a sitemap URL that 404s is a crawl error.
    let posts: MetadataRoute.Sitemap = [];
    try {
        posts = (await listPublishedPosts()).map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: new Date(post.publishedAt ?? post.updatedAt),
            changeFrequency: 'yearly',
            priority: 0.5,
        }));
    } catch (error) {
        // Never let a Firestore blip return a 500 for the sitemap; the static
        // pages are the part that matters and they need no network at all.
        console.error('[sitemap] could not list published posts:', error);
    }

    return [...pages, ...posts];
}
