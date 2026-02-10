import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { MountainIcon, LayoutDashboard, Users, FolderKanban, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function OpsLayout({ children }: { children: React.ReactNode }) {
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
                <Link href="/ops/dashboard"><LayoutDashboard /> <span>Dashboard</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Pipeline">
                <Link href="#"><FolderKanban /> <span>Pipeline</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Clients">
                <Link href="#"><Users /> <span>Clients</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Documents">
                <Link href="#"><FileText /> <span>Documents</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Reports">
                <Link href="/ops/reports"><FileText /> <span>Reports</span></Link>
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
                  <AvatarImage src="https://picsum.photos/seed/avatar1/32/32" data-ai-hint="person face" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span>Alex Doe</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold hidden md:block">Operations Portal</h1>
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
