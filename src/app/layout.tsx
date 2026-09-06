import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext';
import { EditModeProvider } from '@/lib/content/ContentEdit';
import { EditToolbar } from '@/components/site/EditToolbar';
import { siteUrl } from '@/lib/site-url';

const mont = localFont({
  src: [
    {
      path: './fonts/Mont-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Mont-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-mont',
  display: 'swap',
});

const TITLE = 'Oynamak Sports Group Ltd | Sports Ecosystem Strategies & Solutions';
const DESCRIPTION =
  'Oynamak Sports Group Ltd is a sports enterprise dedicated to providing innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange programs, sports tourism, and technology-driven initiatives.';

export const metadata: Metadata = {
  // Without a metadataBase, Next resolves Open Graph and canonical URLs against
  // localhost and warns at build time — so links shared to WhatsApp, LinkedIn
  // or Slack would carry an unreachable origin.
  metadataBase: new URL(siteUrl()),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'Oynamak Sports Group Ltd',
    type: 'website',
    locale: 'en_KE',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mont.variable} font-body antialiased`}>
        <AuthProvider>
          {/* Admins get in-place editing of the public pages; everyone else
              sees the site exactly as it ships. */}
          <EditModeProvider>
            {children}
            <EditToolbar />
          </EditModeProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
