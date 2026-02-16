"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from 'react';

interface NavLink {
    href: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface PortalHeaderProps {
    title: string;
    links: NavLink[];
    user: {
        name: string;
        avatar: string;
        initials: string;
    };
    backLink?: string;
}

export function PortalHeader({ title, links, user, backLink = "/" }: PortalHeaderProps) {
    const pathname = usePathname();
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-[1920px] mx-auto w-full">

                <nav className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2 text-base font-semibold hover:bg-accent">
                                <Menu className="h-5 w-5" />
                                Menu
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="w-80 mt-2 bg-card/90 backdrop-blur-sm rounded-b-xl rounded-tr-xl shadow-2xl border-transparent overflow-hidden p-2"
                        >
                            <div className="flex items-center gap-3 p-4 mb-2 bg-muted/50 rounded-lg">
                                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{user.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold leading-none">{user.name}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">Online</p>
                                </div>
                            </div>

                            <DropdownMenuSeparator className="my-1 bg-border/50" />

                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <DropdownMenuItem key={link.href} asChild>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer",
                                                isActive && "bg-muted/50"
                                            )}
                                        >
                                            <span className={cn(
                                                "text-lg font-bold tracking-wide uppercase",
                                                isActive ? "text-primary" : "text-foreground"
                                            )}>
                                                {link.label}
                                            </span>
                                            <span className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity",
                                                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                            )}>
                                                <ArrowUpRight className="h-4 w-4" />
                                            </span>
                                        </Link>
                                    </DropdownMenuItem>
                                );
                            })}

                            <DropdownMenuSeparator className="my-2 bg-border/50" />

                            <DropdownMenuItem asChild>
                                <Link
                                    href={backLink}
                                    className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
                                >
                                    <span className="text-lg font-bold tracking-wide uppercase">
                                        Back to Website
                                    </span>
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground font-medium">
                    <span className="text-foreground">Welcome back, {user.name}</span>
                    <span className="h-4 w-px bg-border" />
                    <span>{time}</span>
                    <span className="h-4 w-px bg-border" />
                    <span className="uppercase tracking-wide text-xs">{title}</span>
                </div>

                <Link href={links[0]?.href || "#"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-lg font-bold leading-none">Oaktree</span>
                </Link>
            </div>
        </header>
    );
}
