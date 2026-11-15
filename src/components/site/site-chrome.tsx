'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { ConsultationProvider } from './consultation';
import { ProfileDownloadProvider } from './profile-download';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

const internal = ['/portal', '/login'];

/** Wraps public pages with the shared header, footer and consultation popup. */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  if (internal.some((p) => pathname.startsWith(p))) return <>{children}</>;
  return (
    <ConsultationProvider>
      <ProfileDownloadProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </ProfileDownloadProvider>
    </ConsultationProvider>
  );
}
