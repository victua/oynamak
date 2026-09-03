'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { roleHome, safeNextPath } from '@/lib/roles';

function LoginView() {
    const { user, profile, loading, syncSession, signOut } = useAuthContext();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const next = safeNextPath(searchParams.get('next'));

    // 'idle' until we know the server agrees the user is signed in.
    const [checking, setChecking] = useState(false);
    const reconciled = useRef(false);

    useEffect(() => {
        if (!user || !profile || reconciled.current) return;
        reconciled.current = true;
        setChecking(true);

        (async () => {
            const error = await syncSession();
            if (error) {
                // The client thinks it's signed in but the server won't issue a
                // session — usually an expired cookie plus a stale sign-in.
                // Drop the client state so the form is usable again.
                await signOut();
                reconciled.current = false;
                setChecking(false);
                toast({
                    title: 'Please sign in again',
                    description: 'Your session expired.',
                    variant: 'destructive',
                });
                return;
            }
            router.replace(next ?? roleHome(profile.role));
        })();
    }, [user, profile, next, router, syncSession, signOut, toast]);

    if (loading || checking) {
        return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <Link href="/" className="text-2xl font-bold text-primary">Oynamak</Link>
                <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to the Operations and Client portals
                </p>
            </div>
            <AuthForm />
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-4">
            <Suspense fallback={<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />}>
                <LoginView />
            </Suspense>
        </main>
    );
}
