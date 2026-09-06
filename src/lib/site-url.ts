// The site's own public origin, used to build absolute URLs (sitemap entries,
// robots.txt, canonical and Open Graph tags).
//
// Cloud Run knows its URL only at runtime, so this is an env var rather than a
// constant, letting the same image move to a custom domain without a rebuild.
//
// SITE_URL is deliberately un-prefixed: everything here is server-only
// (sitemap, robots, metadata), and Next inlines NEXT_PUBLIC_* at build time,
// which would freeze the value into the image and defeat the point.
// NEXT_PUBLIC_SITE_URL is still read as a fallback because the sibling
// services on this project set that name.

const FALLBACK = 'https://oynamak-488826928406.us-central1.run.app';

export function siteUrl(): string {
    const raw = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL)?.trim();
    if (!raw) return FALLBACK;
    // A trailing slash would double up against the paths appended to this.
    return raw.replace(/\/+$/, '');
}

/** An absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
    return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}
