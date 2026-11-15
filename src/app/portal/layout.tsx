import { redirect } from 'next/navigation';
import { PortalNav } from '@/components/portal/portal-nav';
import { PrintCss } from '@/components/portal/print-css';
import { getSessionUser } from '@/lib/auth-server';

export const metadata = { title: 'Portal | Oynamak Sports Group', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  return (
    <div className="min-h-screen bg-secondary/60">
      <PrintCss />
      <PortalNav user={user} />
      <main className="px-4 py-6 md:ml-64 md:px-8 md:py-10">{children}</main>
    </div>
  );
}
