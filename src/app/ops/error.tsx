'use client';

// Catches anything thrown while rendering a page under /ops — in practice a
// Firestore read failing, since every live console re-reads on each request.
//
// It does NOT catch throws from src/app/ops/layout.tsx: a segment's error
// boundary sits inside its own layout, so a session lookup that fails there
// bubbles up to src/app/error.tsx instead. That is why both exist.

import { ErrorState, type BoundaryError } from '@/components/error-state';

export default function OpsError({ error, reset }: { error: BoundaryError; reset: () => void }) {
    return (
        <ErrorState
            title="This console didn't load"
            description="We couldn't reach the data behind this page. It is usually a dropped connection rather than anything you did — try again in a moment."
            error={error}
            reset={reset}
            home={{ href: '/ops/dashboard', label: 'Back to dashboard' }}
        />
    );
}
