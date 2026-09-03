// Server component. The page inventory comes from src/lib/site-pages.ts, kept
// in step with reality by `npm run check:pages`; blog posts come from Firestore.

import { SITE_PAGES } from "@/lib/site-pages";
import { listAllPosts } from "@/lib/blog-server";
import { getSession } from "@/lib/auth-server";
import { WebsiteConsole } from "@/components/ops/website-console";

export const dynamic = "force-dynamic";

export default async function CMSPage() {
    const [posts, session] = await Promise.all([listAllPosts(), getSession()]);
    const isAdmin = session.status === "ok" && session.profile.role === "admin";

    return <WebsiteConsole pages={SITE_PAGES} posts={posts} canDelete={isAdmin} />;
}
