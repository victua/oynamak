// The site's own public origin, used to build absolute URLs (sitemap entries,
// robots.txt, canonical and Open Graph tags).
//
// Cloud Run knows its URL only at runtime, so this is an env var rather than a
// constant. It is read at request time — never baked into the client bundle —
// so the same image can move between the run.app URL and a custom domain
// without a rebuild. Set NEXT_PUBLIC_SITE_URL on the service (see
// cloudbuild.yaml) when the domain changes.

const FALLBACK = 'https://oynamak-uurxypxfoa-uc.a.run.app';

export function siteUrl(): string {
    const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    if (!raw) return FALLBACK;
    // A trailing slash would double up against the paths appended to this.
    return raw.replace(/\/+$/, '');
}

/** An absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
    return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}
