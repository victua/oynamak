import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In | Oynamak Sports Group Ltd',
    description: 'Sign in to the Oynamak Operations and Client portals.',
    robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
