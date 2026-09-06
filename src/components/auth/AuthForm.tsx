'use client';

import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { lookupLoginAccount, createPassword } from '@/app/login/actions';

/**
 * Sign-in in two steps: the address first, then whatever that address needs.
 *
 * Someone already in the console adds you from /ops/users; you then come here
 * and set your own password. Nothing is emailed, so there is no link to wait
 * for — the first screen works out whether you are setting a password or
 * entering one you already have.
 */
type Stage = 'email' | 'password' | 'create' | 'no-password';

const MIN_PASSWORD_LENGTH = 8;

/** A password field with a show/hide toggle. */
function PasswordInput({
    id, value, onChange, placeholder, autoFocus,
}: {
    id: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <Input
                id={id}
                type={visible ? 'text' : 'password'}
                placeholder={placeholder ?? '••••••••'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoFocus={autoFocus}
                className="pr-10"
                required
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                aria-label={visible ? 'Hide password' : 'Show password'}
            >
                {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    );
}

export function AuthForm() {
    const { signIn, resetPassword } = useAuthContext();
    const { toast } = useToast();

    const [stage, setStage] = useState<Stage>('email');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sentReset, setSentReset] = useState(false);

    // "Use a different email" has to clear the address too, or the next one
    // typed is appended to the old one.
    const reset = () => {
        setStage('email');
        setEmail('');
        setFirstName('');
        setPassword('');
        setConfirm('');
        setError('');
        setSentReset(false);
    };

    // ── Step 1: what does this address need? ──────────────────────
    const handleEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await lookupLoginAccount(email);
            if (result.state === 'unknown') {
                setError('That email has no account here. Ask someone on the team to add you.');
                return;
            }
            if (result.state === 'locked') {
                setError('That account is locked. Ask someone on the team to unlock it.');
                return;
            }
            setFirstName(result.firstName);
            setStage(result.state);
        } catch {
            setError('Could not check that email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2a: returning user ───────────────────────────────────
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await signIn(email, password);
            if (result.error) setError(result.error);
            // On success the login page redirects; leave the spinner up.
        } catch {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // ── Step 2b: first time in — set a password ───────────────────
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password.length < MIN_PASSWORD_LENGTH) {
            setError(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
            return;
        }
        if (password !== confirm) {
            setError('Those passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            const created = await createPassword(email, password);
            if (!created.ok) {
                setError(created.error);
                return;
            }
            // Straight in — no second trip through the form.
            const result = await signIn(email, password);
            if (result.error) {
                toast({
                    title: 'Password set',
                    description: 'Your password is saved, but signing in failed. Try again.',
                });
                setStage('password');
                setConfirm('');
                return;
            }
        } catch {
            setError('Could not set your password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // For someone invited on an address that already had a password elsewhere
    // on this shared Firebase project, this is the way in when they do not know
    // it. Firebase sends the mail; nothing here does.
    const handleReset = async () => {
        setError('');
        setLoading(true);
        try {
            const result = await resetPassword(email);
            if (result.error) setError(result.error);
            else setSentReset(true);
        } finally {
            setLoading(false);
        }
    };

    const Back = () => (
        <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
            <ArrowLeft className="h-3.5 w-3.5" /> Use a different email
        </button>
    );

    const Error = () =>
        error ? <p className="text-sm text-destructive">{error}</p> : null;

    if (stage === 'email') {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter the email you were added with.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleEmail} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <Error />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Continue
                        </Button>
                    </form>


                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Accounts are created by the Oynamak team. If you need access, ask
                        someone who already has it.
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (stage === 'no-password') {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Password needed</CardTitle>
                    <CardDescription>
                        {email} has access, but no password set for it yet.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Ask someone already in the console to open the Users page and send
                        you a set-up link from your row. Opening it lets you choose a
                        password, and you sign in with it here from then on.
                    </p>
                    <Error />
                    <div className="flex justify-center"><Back /></div>
                </CardContent>
            </Card>
        );
    }

    if (stage === 'create') {
        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome{firstName ? `, ${firstName}` : ''}</CardTitle>
                    <CardDescription>
                        Choose a password to finish setting up your account. You will use it
                        to sign in from now on.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New password</Label>
                            <PasswordInput
                                id="new-password"
                                value={password}
                                onChange={setPassword}
                                autoFocus
                            />
                            <p className="text-xs text-muted-foreground">
                                At least {MIN_PASSWORD_LENGTH} characters.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm password</Label>
                            <PasswordInput
                                id="confirm-password"
                                value={confirm}
                                onChange={setConfirm}
                            />
                        </div>
                        <Error />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Set password and sign in
                        </Button>
                    </form>
                    <div className="mt-4 flex justify-center"><Back /></div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Welcome back{firstName ? `, ${firstName}` : ''}</CardTitle>
                <CardDescription>{email}</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            value={password}
                            onChange={setPassword}
                            autoFocus
                        />
                    </div>
                    <Error />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>
                </form>

                {sentReset ? (
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        A reset link is on its way to {email}. Follow it to choose a new
                        password, then sign in here.
                    </p>
                ) : (
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={loading}
                            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                            Forgot your password?
                        </button>
                    </div>
                )}

                <div className="mt-4 flex justify-center"><Back /></div>
            </CardContent>
        </Card>
    );
}
