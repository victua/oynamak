// Server component. The page inventory comes from src/lib/site-pages.ts, kept
// in step with reality by `npm run check:pages`; blog posts come from Firestore.

import { SITE_PAGES } from "@/lib/site-pages";
import { listAllPosts } from "@/lib/blog-server";
import { WebsiteConsole } from "@/components/ops/website-console";

export const dynamic = "force-dynamic";

export default async function CMSPage() {
    const posts = await listAllPosts();

    return <WebsiteConsole pages={SITE_PAGES} posts={posts} />;
}
