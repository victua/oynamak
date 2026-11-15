'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, Inbox, LayoutDashboard, LayoutTemplate, Target, Users, ExternalLink, UserCog, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/site/logo';

const links = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/enquiries', label: 'Enquiries', icon: Inbox },
  { href: '/portal/leads', label: 'Leads', icon: Target },
  { href: '/portal/customers', label: 'Customers', icon: Users },
  { href: '/portal/quotes', label: 'Quotes', icon: FileText },
  { href: '/portal/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/portal/team', label: 'Team', icon: UserCog, admin: true },
];

export function PortalNav({ user }: { user: { email: string; name: string; role: string } }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const items = links.filter((l) => !l.admin || user.role === 'admin');
  const signOut = async () => { await fetch('/api/auth/session', { method: 'DELETE' }); router.replace('/login'); router.refresh(); };
  const active = (href: string) => (href === '/portal' ? pathname === '/portal' : pathname.startsWith(href));
  return (
    <>
      <aside className="no-print fixed inset-y-0 left-0 hidden w-64 flex-col bg-primary bg-pattern-dark p-5 text-white md:flex">
        <Logo light stacked className="[&_img]:w-44" />
        <nav className="mt-10 flex flex-1 flex-col gap-1" aria-label="Portal">
          {items.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn('flex items-center gap-3 rounded-brand-btn px-4 py-3 text-sm font-semibold transition-colors', active(href) ? 'bg-white text-primary' : 'text-white/80 hover:bg-white/10 hover:text-white')}>
              <Icon className="h-4 w-4" />{label}
            </Link>
          ))}
        </nav>
        <div className="mb-4 border-t border-white/15 pt-4 text-xs"><div className="truncate font-semibold">{user.name}</div><div className="truncate text-white/60">{user.email} · {user.role}</div></div>
        <Link href="/" target="_blank" className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white"><ExternalLink className="h-3.5 w-3.5" />View website</Link>
        <button type="button" onClick={signOut} className="flex items-center gap-2 text-left text-xs font-semibold text-white/70 hover:text-white"><LogOut className="h-3.5 w-3.5" />Sign out</button>
      </aside>
      <header className="no-print sticky top-0 z-30 border-b bg-primary text-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3"><Logo light className="[&_img]:h-9" /><button type="button" onClick={signOut} aria-label="Sign out" className="text-white/80"><LogOut className="h-5 w-5" /></button></div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3" aria-label="Portal">
          {items.map(({ href, label }) => (
            <Link key={href} href={href} className={cn('shrink-0 rounded-brand-btn px-3 py-1.5 text-xs font-bold', active(href) ? 'bg-white text-primary' : 'bg-white/10 text-white')}>{label}</Link>
          ))}
        </nav>
      </header>
    </>
  );
}
