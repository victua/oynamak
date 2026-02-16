"use client";

import { PortalHeader } from "@/components/portal-header";
import {
  LayoutDashboard, Users, UserCheck, Briefcase, DollarSign,
  Globe, Megaphone, CalendarDays, UsersRound, UserCog,
} from "lucide-react";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/ops/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ops/leads", label: "Clients (Leads)", icon: Users },
    { href: "/ops/customers", label: "Customers", icon: UserCheck },
    { href: "/ops/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/ops/finance", label: "Finance", icon: DollarSign },
    { href: "/ops/website", label: "Website (CMS)", icon: Globe },
    { href: "/ops/marketing", label: "Marketing", icon: Megaphone },
    { href: "/ops/events", label: "Events", icon: CalendarDays },
    { href: "/ops/staff", label: "Staff", icon: UsersRound },
    { href: "/ops/users", label: "Users", icon: UserCog },
  ];

  const user = {
    name: "Mumbi Mbiyu",
    avatar: "https://picsum.photos/seed/avatar1/32/32",
    initials: "MM"
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader
        title="Operations Portal"
        links={links}
        user={user}
      />
      <main className="pt-28 px-4 w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
