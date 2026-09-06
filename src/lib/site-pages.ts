// The public website's page inventory, as the admin console reports it.
//
// Why a registry rather than scanning the filesystem at request time: this app
// builds with `output: "standalone"`, so the compiled bundle has no
// src/app/**/page.tsx to walk in production. The registry is the source of
// truth, and `npm run check:pages` fails if it drifts from the actual routes —
// so a page added or removed without updating this file is caught in CI, not
// discovered by someone staring at a stale admin screen.
//
// Titles below are the real <h1> of each page, not invented labels.

export type SitePageKind = 'page' | 'redirect' | 'dynamic';

export type SitePage = {
    path: string;
    title: string;
    section: 'Main' | 'Solutions' | 'Legacy';
    kind: SitePageKind;
    /** Where a legacy path sends visitors. Only set when kind is 'redirect'. */
    redirectsTo?: string;
    /** For 'dynamic': what fills the segment, and where the list of them lives. */
    generatedFrom?: string;
    /** Whether the route is reachable from the site's own navigation. */
    inNav: boolean;
    /**
     * The `content/{pageId}` document backing this page's copy, when the page
     * is wired for in-place editing (an admin opens it and hits "Edit page").
     * Absent means the page's text still lives only in its component.
     * See src/lib/content/ContentEdit.tsx.
     */
    contentId?: string;
};

export const SITE_PAGES: SitePage[] = [
    { path: '/', title: 'Oynamak Sports Group Ltd', section: 'Main', kind: 'page', inNav: true, contentId: 'home' },
    { path: '/about', title: 'Oynamak Sports Group Ltd', section: 'Main', kind: 'page', inNav: true, contentId: 'about' },
    { path: '/solutions', title: 'Sports Ecosystem Solutions', section: 'Main', kind: 'page', inNav: true, contentId: 'solutions' },
    { path: '/contact', title: 'Get in Touch', section: 'Main', kind: 'page', inNav: true, contentId: 'contact' },
    { path: '/get-started', title: 'Partner With Us', section: 'Main', kind: 'page', inNav: true, contentId: 'get-started' },

    // Live and fully manageable, but not linked from the site's nav while there
    // is nothing published — see the note in src/components/public-header.tsx.
    { path: '/blog', title: 'Perspectives on the sports ecosystem', section: 'Main', kind: 'page', inNav: false },
    // One URL per published post, so this row is a template rather than a page.
    { path: '/blog/[slug]', title: 'Blog post', section: 'Main', kind: 'dynamic', generatedFrom: 'Published posts in the blog collection', inNav: false },

    { path: '/solutions/products-equipment', title: 'Sports Products & Equipment Solutions', section: 'Solutions', kind: 'page', inNav: true, contentId: 'solutions-products-equipment' },
    { path: '/solutions/strategic-partnerships', title: 'Strategic Partnerships & Ecosystem Development', section: 'Solutions', kind: 'page', inNav: true, contentId: 'solutions-strategic-partnerships' },
    { path: '/solutions/international-exchange', title: 'International Exchange & Capacity Building', section: 'Solutions', kind: 'page', inNav: true, contentId: 'solutions-international-exchange' },
    { path: '/solutions/sports-tourism', title: 'Sports Tourism & International Hosting', section: 'Solutions', kind: 'page', inNav: true, contentId: 'solutions-sports-tourism' },
    { path: '/solutions/sports-innovation', title: 'Sports Innovation & Technology Solutions', section: 'Solutions', kind: 'page', inNav: true, contentId: 'solutions-sports-innovation' },

    // Left over from the previous financial-services site. They are 17-line
    // client-side redirects, kept so old inbound links and search results still
    // land somewhere sensible. Not content, and not linked from the site.
    { path: '/solutions/investment-services', title: 'Investment Services (legacy)', section: 'Legacy', kind: 'redirect', redirectsTo: '/solutions/products-equipment', inNav: false },
    { path: '/solutions/real-estate-services', title: 'Real Estate Services (legacy)', section: 'Legacy', kind: 'redirect', redirectsTo: '/solutions/sports-tourism', inNav: false },
    { path: '/solutions/consulting-advisory', title: 'Consulting & Advisory (legacy)', section: 'Legacy', kind: 'redirect', redirectsTo: '/solutions/strategic-partnerships', inNav: false },
    { path: '/solutions/insurance-pension', title: 'Insurance & Pension (legacy)', section: 'Legacy', kind: 'redirect', redirectsTo: '/solutions/sports-innovation', inNav: false },
];

export const contentPages = () => SITE_PAGES.filter(p => p.kind === 'page');
/** Pages an admin can edit in place on the live site. */
export const editablePages = () => SITE_PAGES.filter(p => !!p.contentId);
export const dynamicPages = () => SITE_PAGES.filter(p => p.kind === 'dynamic');
export const redirectPages = () => SITE_PAGES.filter(p => p.kind === 'redirect');
