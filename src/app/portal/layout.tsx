import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { MountainIcon, LayoutDashboard, FileText, CalendarDays, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6 text-sidebar-foreground" />
            <h2 className="text-lg font-semibold text-sidebar-foreground">Oaktree Edge</h2>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/portal/dashboard"><LayoutDashboard /> <span>Dashboard</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Documents">
                <Link href="#"><FileText /> <span>Documents</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Events">
                <Link href="#"><CalendarDays /> <span>Events</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="mt-auto border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link href="#"><Settings /> <span>Settings</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/avatar2/32/32" data-ai-hint="person face" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <span>Sarah Miller</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
             <h1 className="font-semibold text-lg hidden md:block">Client Portal</h1>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back to Website</Link>
          </Button>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
