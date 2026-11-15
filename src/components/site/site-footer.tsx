import Link from 'next/link';
import { navItems, siteConfig } from '@/lib/site-config';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex w-[96%] flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <Logo light />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white hover:underline">{n.label}</Link>
          ))}
        </nav>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} {siteConfig.fullName}</p>
      </div>
    </footer>
  );
}
