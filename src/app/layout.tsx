import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { SiteChrome } from '@/components/site/site-chrome';

// Montserrat (variable, 100-900), self-hosted. No fallback fonts: the page waits for Montserrat.
const montserrat = localFont({
  src: './fonts/Montserrat-Variable.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-montserrat',
  display: 'block',
  fallback: [],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Oynamak Sports Group | Built for greatness. Made to win.',
  description: 'Oynamak helps clubs, academies and athletes in Kenya and Africa with sports kit, partnerships, training and exchange programmes, sports tourism and sports tech.',
  openGraph: { title: 'Oynamak Sports Group', description: 'Built for greatness. Made to win.', images: ['/images/logo.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-body antialiased`}>
          <SiteChrome>{children}</SiteChrome>
          <Toaster />
      </body>
    </html>
  );
}
