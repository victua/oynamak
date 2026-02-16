"use client";

import Link from 'next/link';
import { MountainIcon, Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';


export function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasHeroImage = pathname === '/' || pathname.startsWith('/solutions') || pathname === '/about' || pathname === '/events' || pathname === '/contact';

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-colors duration-300",
      (scrolled || !hasHeroImage)
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="w-full flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <span className={cn("text-2xl font-bold tracking-tight", (scrolled || !hasHeroImage) ? "text-primary" : "text-white")}>Oaktree</span>
        </Link>
        <nav>
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={cn(
                "gap-2 text-base font-semibold",
                (scrolled || !hasHeroImage) ? "text-primary hover:bg-accent" : "text-white hover:bg-white/10"
              )}>
                Menu
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 mt-2 bg-card/90 backdrop-blur-sm rounded-b-xl rounded-tl-xl shadow-2xl border-transparent overflow-hidden"
            >
              <Link href="/" className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors">
                <span className="text-xl font-bold tracking-wide">HOME</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/about" className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors">
                <span className="text-xl font-bold tracking-wide">ABOUT</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/solutions" className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors">
                <span className="text-xl font-bold tracking-wide">SOLUTIONS</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/events" className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors">
                <span className="text-xl font-bold tracking-wide">EVENTS</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
              <Link href="/contact" className="group flex justify-between items-center py-4 px-2 hover:bg-muted/50 rounded-lg transition-colors">
                <span className="text-xl font-bold tracking-wide">CONTACT</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>


            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
