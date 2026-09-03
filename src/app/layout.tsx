import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/contexts/AuthContext';
import { EditModeProvider } from '@/lib/content/ContentEdit';
import { EditToolbar } from '@/components/site/EditToolbar';

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
