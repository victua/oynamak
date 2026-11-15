"use client";

import { PortalHeader } from "@/components/portal-header";
import { LayoutDashboard, FileText, CalendarDays, Settings } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "#", label: "Documents", icon: FileText },
    { href: "#", label: "Events", icon: CalendarDays },
    { href: "#", label: "Settings", icon: Settings },
  ];

  const user = {
    name: "Sarah Miller",
    avatar: "",
    initials: "SM"
  };

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader
        title="Client Portal"
        links={links}
        user={user}
      />
      <main className="pt-28 px-4 w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
