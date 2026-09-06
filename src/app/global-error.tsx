'use client';

// Last resort: this replaces the root layout, so it runs when the failure is
// the root layout itself — the fonts, the providers, or globals.css. Nothing
// it renders may depend on any of those, which is why the markup below is
// styled inline and imports nothing from the design system.
//
// It must render its own <html> and <body>; Next mounts it in place of them.
// Only reachable in a production build — in development the error overlay
// takes over first.

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f0f0f0',
                    color: '#0f2f33',
                    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                    padding: '1rem',
                }}
            >
                <div style={{ maxWidth: '28rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                        Oynamak is temporarily unavailable
                    </h1>
                    <p style={{ marginTop: '0.75rem', lineHeight: 1.6, color: '#4a4a4a' }}>
                        We hit an unexpected problem loading the site. Please try again in a moment.
                    </p>
                    {error.digest && (
                        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6b6b6b' }}>
                            Reference <code>{error.digest}</code>
                        </p>
                    )}
                    <button
                        onClick={reset}
                        style={{
                            marginTop: '1.75rem',
                            padding: '0.625rem 1.25rem',
                            borderRadius: '9999px',
                            border: 'none',
                            background: '#0f2f33',
                            color: '#fafafa',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
