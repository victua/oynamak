import Link from 'next/link';
import { navItems, siteConfig } from '@/lib/site-config';
import { Logo } from './logo';
import { ProfileButton } from './profile-download';

export function SiteFooter() {
  return (
    <footer className="bg-primary bg-pattern-dark text-primary-foreground">
      <div className="mx-auto flex w-[96%] flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <Logo light stacked className="[&_img]:w-44 md:[&_img]:w-52" />
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold uppercase tracking-wider text-white/80">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white hover:underline">{n.label}</Link>
          ))}
          <ProfileButton variant="link" className="h-auto p-0 text-sm font-semibold uppercase tracking-wider text-accent hover:text-white">Download profile</ProfileButton>
        </nav>
        <p className="text-xs text-white/60">© {new Date().getFullYear()} {siteConfig.fullName} · <Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link> · <Link href="/terms" className="hover:text-white hover:underline">Terms</Link></p>
      </div>
    </footer>
  );
}
