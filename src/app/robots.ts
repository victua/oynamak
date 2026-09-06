import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';

// Without this, crawlers get no steer at all and will happily index /login and
// the console routes. /ops is already behind an auth gate, but a gated URL in
// search results is still noise, and the login page competes with the real
// pages for the brand query.

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/ops/', '/login', '/api/'],
            },
        ],
        sitemap: absoluteUrl('/sitemap.xml'),
    };
}
