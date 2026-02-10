"use client";

import Link from 'next/link';
import { MountainIcon, Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const solutions = [
  { name: 'Investment Services', href: '/solutions/investment-services' },
  { name: 'Real Estate Services', href: '/solutions/real-estate-services' },
  { name: 'Consulting & Advisory', href: '/solutions/consulting-advisory' },
  { name: 'Insurance & Pension', href: '/solutions/insurance-pension' },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-primary">Oaktree Edge</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className={cn("hover:text-primary transition-colors", pathname === "/" ? "text-primary" : "text-foreground/60")} prefetch={false}>
            Home
          </Link>
          <Link href="/about" className={cn("hover:text-primary transition-colors", pathname === "/about" ? "text-primary" : "text-foreground/60")} prefetch={false}>
            About
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary outline-none transition-colors text-foreground/60">
              Solutions <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {solutions.map((s) => (
                <DropdownMenuItem key={s.name} asChild>
                  <Link href={s.href} prefetch={false}>{s.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/events" className={cn("hover:text-primary transition-colors", pathname === "/events" ? "text-primary" : "text-foreground/60")} prefetch={false}>
            Events
          </Link>
          <Link href="/contact" className={cn("hover:text-primary transition-colors", pathname === "/contact" ? "text-primary" : "text-foreground/60")} prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/ops/dashboard">Staff Login</Link>
          </Button>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/portal/dashboard">Client Portal</Link>
          </Button>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="p-6">
                <Link href="/" className="flex items-center gap-2 mb-8" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                  <MountainIcon className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold text-primary">Oaktree Edge</span>
                </Link>
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/" className="hover:text-primary" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                  <Link href="/about" className="hover:text-primary" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                  <div className="grid gap-4">
                    <p className="font-medium">Solutions</p>
                    {solutions.map((s) => (
                       <Link key={s.name} href={s.href} className="text-muted-foreground hover:text-primary" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                        {s.name}
                      </Link>
                    ))}
                  </div>
                  <Link href="/events" className="hover:text-primary" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    Events
                  </Link>
                  <Link href="/contact" className="hover:text-primary" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    Contact
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
