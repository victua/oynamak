'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { HOME_PATH, safeNextPath } from '@/lib/roles';

/**
 * Authenticated, but nobody has given this account access. Firebase Auth will
 * mint an account for any email — a `users/{uid}` profile is what the console
 * actually gates on, and only an existing user can create one.
 */
function NoAccess({ email, onSignOut }: { email: string; onSignOut: () => void }) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>No access yet</CardTitle>
                <CardDescription>
                    You are signed in as {email}, but this account has not been given
                    access to the Operations Portal. Ask someone on the team to add you.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full" onClick={onSignOut}>
                    Sign out
                </Button>
            </CardContent>
        </Card>
    );
}

function LoginView() {
    const { user, profile, profileError, loading, syncSession, signOut } = useAuthContext();
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
            router.replace(next ?? HOME_PATH);
        })();
    }, [user, profile, next, router, syncSession, signOut, toast]);

    if (loading || checking) {
        return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
    }

    // Signed in with no profile: say so, rather than leaving them on a form
    // they have already satisfied. `profileError` is the different case where
    // the check itself failed, and AuthForm surfaces that.
    if (user && !profile && !profileError) {
        return <NoAccess email={user.email ?? 'this account'} onSignOut={() => { void signOut(); }} />;
    }

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <Link href="/" className="text-2xl font-bold text-primary">Oynamak</Link>
                <p className="mt-1 text-sm text-muted-foreground">
                    Sign in to the Operations Portal
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
