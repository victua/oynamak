'use client';

// The outermost boundary inside the root layout. It covers the public pages
// that read live data (/blog renders from Firestore), and it
// is also where a throw from the /ops or /portal layout lands — those run
// above their own segment's boundary.

import { ErrorState, type BoundaryError } from '@/components/error-state';

export default function SiteError({ error, reset }: { error: BoundaryError; reset: () => void }) {
    return (
        <main className="flex min-h-screen flex-col bg-background">
            <ErrorState
                title="Something went wrong"
                description="This page didn't load properly. Try again, or head back to the homepage."
                error={error}
                reset={reset}
                home={{ href: '/', label: 'Go home' }}
            />
        </main>
    );
}
