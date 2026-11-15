'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/site/logo';
import { clientAuth } from '@/lib/firebase-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const start = () => { setBusy(true); setError(''); setNote(''); };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault(); start();
    try {
      const { user } = await signInWithEmailAndPassword(clientAuth(), email.trim(), password);
      if (!user.emailVerified) {
        await sendEmailVerification(user).catch(() => {});
        await signOut(clientAuth());
        throw new Error('Please verify your email first. We have just sent you a link.');
      }
      const res = await fetch('/api/auth/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: await user.getIdToken() }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.replace('/portal'); router.refresh();
    } catch (x) {
      const m = x instanceof Error ? x.message : '';
      setError(m && !m.startsWith('Firebase') ? m : 'That email or password is not right. First time here? Choose "Create or reset my password".');
    } finally { setBusy(false); }
  };

  /** First time: create the password. Already has an account: send a reset link. */
  const createOrReset = async () => {
    if (!email.trim()) return setError('Type your email first.');
    start();
    try {
      const { allowed } = await fetch('/api/auth/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).then((r) => r.json());
      if (!allowed) throw new Error('This email has not been added to the team yet. Ask an admin to add you.');
      try {
        if (password.length < 8) throw new Error('Type a new password of at least 8 characters, then choose this again.');
        const { user } = await createUserWithEmailAndPassword(clientAuth(), email.trim(), password);
        await sendEmailVerification(user);
        await signOut(clientAuth());
        setNote('Almost there. We sent a link to your email. Click it, then sign in.');
      } catch (inner) {
        const code = (inner as { code?: string }).code;
        if (code === 'auth/email-already-in-use') {
          await sendPasswordResetEmail(clientAuth(), email.trim());
          setNote('You already have an account. We sent a link to set a new password.');
        } else throw inner;
      }
    } catch (x) {
      const m = x instanceof Error ? x.message : '';
      setError(m && !m.startsWith('Firebase') ? m : 'Something went wrong. Please try again.');
    } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary bg-pattern-dark px-4">
      <div className="w-full max-w-md rounded-brand bg-white p-8 shadow-2xl md:p-10">
        <Logo className="[&_img]:h-12" />
        <h1 className="mt-6 text-2xl font-extrabold text-primary">Team sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enquiries, leads, customers, quotes and templates.</p>
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <div className="space-y-1.5"><label htmlFor="l-email" className="text-sm font-medium">Email</label><Input id="l-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 px-5" /></div>
          <div className="space-y-1.5"><label htmlFor="l-pass" className="text-sm font-medium">Password</label><Input id="l-pass" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 px-5" /></div>
          {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
          {note && <p className="text-sm font-medium text-green-700">{note}</p>}
          <Button type="submit" disabled={busy} size="lg" className="h-12 w-full">{busy ? 'Please wait...' : 'Sign in'}</Button>
          <button type="button" onClick={createOrReset} disabled={busy} className="w-full text-center text-sm font-semibold text-accent hover:underline">Create or reset my password</button>
          <p className="text-center text-xs text-muted-foreground">First time? Type your email and a new password above, then choose "Create or reset my password".</p>
        </form>
      </div>
    </div>
  );
}
