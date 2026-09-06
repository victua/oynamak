"use client";

import { LayoutDashboard, Users, Globe, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PortalHeader } from "@/components/portal-header";
import { useAuthContext } from "@/contexts/AuthContext";
import { initialsOf } from "@/lib/roles";
import type { UserProfile } from "@/lib/types";

// Nav lives on the client side of the RSC boundary on purpose: the `icon`
// entries are React components, and function components cannot be serialised
// from a server component into a client one. The server layout passes only
// plain data (the profile).
const NAV = [
    { href: "/ops/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ops/leads", label: "Clients (Leads)", icon: Users },
    { href: "/ops/website", label: "Website (CMS)", icon: Globe },
    { href: "/ops/users", label: "Users", icon: UserCog },
] as const;

/**
 * Chrome for the signed-in console. `profile` is resolved on the server by the
 * layout, so the header renders correct on first paint with no auth flash.
 */
export function PortalShell({
    profile,
    children,
}: {
    profile: UserProfile;
    children: React.ReactNode;
}) {
    const { signOut } = useAuthContext();
    const router = useRouter();
    const [, start] = useTransition();

    // Signing out has to navigate as well as clear state: this page was already
    // rendered by the server, so dropping the cookie alone leaves the user
    // sitting on a console they no longer have access to. Land on the public
    // homepage rather than the login form — signing out is usually "I'm done",
    // not "let me sign in as someone else".
    const handleSignOut = () => start(async () => {
        await signOut();
        router.replace("/");
        router.refresh();
    });
    const name = profile.displayName || profile.email || "";

    return (
        <div className="min-h-screen bg-background">
            <PortalHeader
                title="Operations Portal"
                links={[...NAV]}
                user={{
                    name,
                    avatar: profile.photoURL ?? "",
                    initials: initialsOf(name),
                }}
                onSignOut={handleSignOut}
            />
            <main className="pt-28 px-4 w-full mx-auto">{children}</main>
        </div>
    );
}
