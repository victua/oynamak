"use client";

import Link from 'next/link';
import { Home, Info, Trophy, Mail, Sparkles, ArrowRight, LogIn, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { HOME_PATH } from '@/lib/roles';

// /blog is deliberately absent: the blog works end to end (write and publish
// it from /ops/website), but nothing is published yet, so linking it would send
// visitors to an empty page. Add { label: 'Insights', href: '/blog', icon:
// PenLine } back — and set inNav on its src/lib/site-pages.ts row — once there
// is a post to read.
const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Solutions', href: '/solutions', icon: Trophy },
  { label: 'Contact', href: '/contact', icon: Mail },
  { label: 'Get Started', href: '/get-started', icon: Sparkles },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { profile, loading } = useAuthContext();

  // Point staff straight at their console rather than a login form they don't
  // need. Signed-out visitors get the sign-in link; the portals are gated
  // server-side either way, so exposing the link costs nothing.
  const portal = profile
    ? { href: HOME_PATH, label: 'Portal', Icon: LayoutDashboard }
    : { href: '/login', label: 'Sign In', Icon: LogIn };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hasHeroImage = pathname === '/' || pathname.startsWith('/solutions') || pathname === '/about' || pathname === '/contact';

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
            {!loading && (
              <Link
                href={portal.href}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-semibold transition-colors",
                  (scrolled || !hasHeroImage)
                    ? "text-muted-foreground hover:text-primary"
                    : "text-white/80 hover:text-white"
                )}
              >
                <portal.Icon className="h-3.5 w-3.5" />
                {portal.label}
              </Link>
            )}
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

          {/* Portal access. Separated from the marketing nav — it is a different
              kind of destination, and on mobile this dock is the only route in
              since the top bar's link is hidden below the sm breakpoint. */}
          {!loading && (
            <>
              <span className="my-0.5 h-px w-full bg-border/60" />
              <Link
                href={portal.href}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(portal.href)
                    ? "bg-primary text-primary-foreground shadow-md font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                <portal.Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive(portal.href) ? "text-primary-foreground" : "text-foreground/70 group-hover:text-primary"
                  )}
                />
                <span className="hidden md:inline whitespace-nowrap text-xs uppercase tracking-wider">
                  {portal.label}
                </span>
                <span className="md:hidden absolute right-full mr-2 hidden group-hover:flex items-center px-2 py-1 bg-foreground text-background text-xs font-semibold rounded-md shadow-lg whitespace-nowrap pointer-events-none">
                  {portal.label}
                </span>
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
