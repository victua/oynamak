"use client";

import Link from 'next/link';
import { MountainIcon, Menu, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const solutions = [
  { name: 'Investment Services', href: '/solutions/investment-services' },
  { name: 'Real Estate Services', href: '/solutions/real-estate-services' },
  { name: 'Consulting & Advisory', href: '/solutions/consulting-advisory' },
  { name: 'Insurance & Pension', href: '/solutions/insurance-pension' },
];

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

  const hasHeroImage = pathname === '/' || pathname.startsWith('/solutions');

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-colors duration-300",
      (scrolled || !hasHeroImage) 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" 
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className={cn("h-6 w-6", (scrolled || !hasHeroImage) ? "text-primary" : "text-white")} />
          <span className={cn("text-lg font-bold", (scrolled || !hasHeroImage) ? "text-primary" : "text-white")}>Oaktree Edge</span>
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
                <DropdownMenuItem asChild>
                    <Link href="/" className="group justify-between">
                        Home
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/about" className="group justify-between">
                        About
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/events" className="group justify-between">
                        Events
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/contact" className="group justify-between">
                        Contact
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
                <p className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Solutions</p>
                {solutions.map((s) => (
                    <DropdownMenuItem key={s.name} asChild>
                        <Link href={s.href} className="group justify-between">
                            {s.name}
                            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </DropdownMenuItem>
                ))}
              <DropdownMenuSeparator />
              <div className="p-2 space-y-2">
                 <Button variant="outline" size="sm" asChild className="w-full justify-center">
                    <Link href="/ops/dashboard">Staff Login</Link>
                  </Button>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full justify-center" asChild>
                    <Link href="/portal/dashboard">Client Portal</Link>
                  </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
