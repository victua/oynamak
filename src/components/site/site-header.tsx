'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Clock, MapPin, Menu, Phone, X } from 'lucide-react';
import { navItems, siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { ConsultButton } from './consultation';
import { Logo } from './logo';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-primary/95 text-primary-foreground md:block">
        <div className="mx-auto flex h-11 w-[96%] items-center justify-between px-6 text-sm">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{siteConfig.address}</span>
          <span className="flex items-center gap-6">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4" />{siteConfig.phone}
            </a>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{siteConfig.hours}</span>
          </span>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="mx-auto flex h-16 w-[96%] items-center justify-between md:h-20">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'border-b-2 py-1 text-sm font-semibold transition-colors',
                  isActive(item.href) ? 'border-accent text-primary' : 'border-transparent text-foreground/80 hover:text-primary'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ConsultButton className="hidden h-12 bg-primary px-6 font-semibold sm:inline-flex">
              Book a consultation
            </ConsultButton>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-md p-2 text-primary lg:hidden"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t bg-white px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn('block border-b py-3 text-base font-semibold', isActive(item.href) ? 'text-accent' : 'text-primary')}
              >
                {item.label}
              </Link>
            ))}
            <ConsultButton className="mt-4 h-12 w-full">Book a consultation</ConsultButton>
          </nav>
        )}
      </div>
    </header>
  );
}
