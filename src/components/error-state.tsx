'use client';

// The body of every error.tsx in the app. Kept in one place so a failure in
// the ops console, the client portal and the public site all say the same
// kind of thing, and so the reporting rules below are written once.

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export type BoundaryError = Error & { digest?: string };

export function ErrorState({
    title,
    description,
    error,
    reset,
    home,
}: {
    title: string;
    /** What the reader can do about it, in their terms — not the stack. */
    description: string;
    error: BoundaryError;
    reset: () => void;
    home?: { href: string; label: string };
}) {
    // Next logs server-side throws on the server; this is the client half, and
    // it is what makes a failure visible in the browser console during
    // development instead of only as a blank panel.
    useEffect(() => {
        console.error(error);
    }, [error]);

    // In production Next replaces a server error's message with a generic
    // string and gives it a digest, so there is nothing sensitive to leak
    // here — but there is also nothing useful to read, so only the digest is
    // worth showing. In development the real message is the whole point.
    const detail = process.env.NODE_ENV === 'development' ? error.message : null;

    return (
        <div className="flex flex-1 items-center justify-center px-4 py-16">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <AlertTriangle className="h-7 w-7 text-primary" />
                </div>

                <h1 className="text-2xl font-bold text-primary">{title}</h1>
                <p className="mt-3 text-muted-foreground">{description}</p>

                {detail && (
                    <pre className="mt-6 max-h-40 overflow-auto rounded-lg bg-muted/60 p-4 text-left text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {detail}
                    </pre>
                )}

                {error.digest && (
                    <p className="mt-4 text-xs text-muted-foreground">
                        Reference <code className="font-mono">{error.digest}</code>
                    </p>
                )}

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button onClick={reset} className="gap-2">
                        <RefreshCw className="h-4 w-4" /> Try again
                    </Button>
                    {home && (
                        <Button variant="outline" asChild>
                            <Link href={home.href}>{home.label}</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
