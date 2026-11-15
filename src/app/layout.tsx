import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext';
import { SiteChrome } from '@/components/site/site-chrome';

// Inter (variable, 100-900), self-hosted. No fallback fonts: the page waits for Inter.
const inter = localFont({
  src: './fonts/Inter-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'block',
  fallback: [],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Oynamak Sports Group Ltd | Sports Ecosystem Strategies & Solutions',
  description: 'Oynamak Sports Group Ltd is a sports enterprise dedicated to providing innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange programs, sports tourism, and technology-driven initiatives.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <AuthProvider>
          <SiteChrome>{children}</SiteChrome>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
