"use client";

import {
    LayoutDashboard, Users, UserCheck, Briefcase,
    Globe, CalendarDays, UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { PortalHeader } from "@/components/portal-header";
import { useAuthContext } from "@/contexts/AuthContext";
import { initialsOf } from "@/lib/roles";
import type { UserProfile } from "@/lib/types";

// Nav lives on the client side of the RSC boundary on purpose: the `icon`
// entries are React components, and function components cannot be serialised
// from a server component into a client one. The server layouts pass only
// plain data (the profile and a variant name).
const NAV = {
    ops: {
        title: "Operations Portal",
        showRole: true,
        links: [
            { href: "/ops/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/ops/leads", label: "Clients (Leads)", icon: Users },
            { href: "/ops/customers", label: "Customers", icon: UserCheck },
            { href: "/ops/portfolio", label: "Portfolio", icon: Briefcase },
            { href: "/ops/website", label: "Website (CMS)", icon: Globe },
            { href: "/ops/events", label: "Events", icon: CalendarDays },
            { href: "/ops/users", label: "Users", icon: UserCog },
        ],
    },
    portal: {
        title: "Client Portal",
        showRole: false,
        links: [
            { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
        ],
    },
} as const;

export type PortalVariant = keyof typeof NAV;

/**
 * Chrome for the signed-in portals. `profile` is resolved on the server by the
 * layout, so the header renders correct on first paint with no auth flash.
 */
export function PortalShell({
    variant,
    profile,
    children,
}: {
    variant: PortalVariant;
    profile: UserProfile;
    children: React.ReactNode;
}) {
    const { signOut } = useAuthContext();
    const router = useRouter();
    const [, start] = useTransition();
    const { title, links, showRole } = NAV[variant];

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
                title={title}
                links={[...links]}
                user={{
                    name,
                    avatar: profile.photoURL ?? "",
                    initials: initialsOf(name),
                    subtitle: showRole ? `Signed in as ${profile.role}` : undefined,
                }}
                onSignOut={handleSignOut}
            />
            <main className="pt-28 px-4 w-full mx-auto">{children}</main>
        </div>
    );
}
