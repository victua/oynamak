"use client";

import Link from 'next/link';
import { Home, Info, Trophy, Calendar, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Solutions', href: '/solutions', icon: Trophy },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Get Started', href: '/get-started', icon: Sparkles },
];

export function PublicHeader() {
  const pathname = usePathname();
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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Header Bar for Brand Identity */}
      <header
        className={cn(
          "fixed top-0 z-40 w-full transition-all duration-300",
          (scrolled || !hasHeroImage)
            ? "bg-background/90 backdrop-blur-md shadow-sm border-b"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
            <span
              className={cn(
                "text-2xl md:text-3xl font-black tracking-tight transition-colors",
                (scrolled || !hasHeroImage) ? "text-primary" : "text-white"
              )}
            >
              Oynamak
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-4">
            <Button size="sm" asChild className="rounded-full shadow-md px-5 font-semibold">
              <Link href="/get-started">
                Inquire <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Fixed Vertical Navigation Dock */}
      <aside
        aria-label="Vertical Navigation"
        className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end pointer-events-auto"
      >
        <nav
          className="flex flex-col gap-1.5 p-2 md:p-2.5 rounded-2xl bg-card/85 backdrop-blur-md border border-border/60 shadow-2xl transition-all duration-300"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-md font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    active ? "text-primary-foreground" : "text-foreground/70 group-hover:text-primary"
                  )}
                />
                <span className="hidden md:inline whitespace-nowrap text-xs uppercase tracking-wider">
                  {item.label}
                </span>

                {/* Mobile Floating Label Tooltip on Hover */}
                <span
                  className="md:hidden absolute right-full mr-2 hidden group-hover:flex items-center px-2 py-1 bg-foreground text-background text-xs font-semibold rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                >
                  {item.label}
                </span>

                {/* Active Indicator Dot */}
                {active && (
                  <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary md:hidden" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
