'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LogoMark } from './logo';

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useProfileDownload = () => useContext(Ctx);

const SEEN_KEY = 'oynamak-profile-prompt';
const quiet = ['/get-started', '/privacy', '/terms'];

export function ProfileDownloadProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '', website: '' });

  // Pop up once, a few seconds after a first visit.
  useEffect(() => {
    if (quiet.some((p) => pathname.startsWith(p))) return;
    try { if (localStorage.getItem(SEEN_KEY)) return; } catch { return; }
    const t = setTimeout(() => setIsOpen(true), 9000);
    return () => clearTimeout(t);
  }, [pathname]);

  const onOpenChange = useCallback((v: boolean) => {
    setIsOpen(v);
    if (!v) {
      try { localStorage.setItem(SEEN_KEY, '1'); } catch {}
      setTimeout(() => { setToken(null); setError(''); }, 200);
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, channel: 'Company Profile' }),
      });
      const data = await res.json();
      if (!res.ok || !data.token) throw new Error(data.error || 'Something went wrong. Please try again.');
      setToken(data.token);
      window.location.href = `/api/profile?t=${encodeURIComponent(data.token)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally { setBusy(false); }
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Ctx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-0 p-0">
          <div className="grid md:grid-cols-2">
            <div className="relative hidden flex-col items-center justify-center gap-6 bg-primary bg-pattern-dark p-8 md:flex">
              <Image src="/images/profile-cover.jpg" alt="Oynamak company profile cover" width={600} height={849} className="w-44 rounded-brand-sm shadow-2xl" />
              <p className="text-center text-sm font-semibold text-white/90">Company Profile 2026<br /><span className="font-normal text-white/70">4 pages · PDF</span></p>
            </div>
            {token ? (
              <div className="flex flex-col items-center justify-center px-8 py-14 text-center">
                <LogoMark className="mb-4 h-16 w-auto" />
                <DialogTitle className="text-2xl font-bold text-primary">Thank you, {form.name.split(' ')[0]}</DialogTitle>
                <DialogDescription className="mt-2">Your download should start now. We will also be in touch.</DialogDescription>
                <Button className="mt-6 px-8" onClick={() => { window.location.href = `/api/profile?t=${encodeURIComponent(token)}`; }}>
                  <Download className="mr-2 h-4 w-4" />Download again
                </Button>
                <Button variant="ghost" className="mt-2" onClick={() => onOpenChange(false)}>Close</Button>
              </div>
            ) : (
              <form className="space-y-4 p-8 md:p-10" onSubmit={submit}>
                <DialogTitle className="text-2xl font-bold text-primary">Download our company profile</DialogTitle>
                <DialogDescription>See who we are, what we do and how we can work together. Pop in your details and it is yours.</DialogDescription>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} className="hidden" aria-hidden />
                <div className="space-y-1.5">
                  <label htmlFor="p-name" className="text-sm font-medium">Your name</label>
                  <Input id="p-name" required value={form.name} onChange={set('name')} placeholder="Your name" className="h-12 px-5" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="p-email" className="text-sm font-medium">Email</label>
                  <Input id="p-email" required type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className="h-12 px-5" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="p-phone" className="text-sm font-medium">Phone</label>
                  <Input id="p-phone" required type="tel" value={form.phone} onChange={set('phone')} placeholder="+254 7__ ___ ___" className="h-12 px-5" />
                </div>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox checked={agree} onCheckedChange={(v) => setAgree(v === true)} />
                  I agree to the privacy policy
                </label>
                {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
                <Button type="submit" disabled={!agree || busy} size="lg" className="h-12 w-full">
                  <Download className="mr-2 h-4 w-4" />{busy ? 'Please wait...' : 'Download the profile'}
                </Button>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function ProfileButton({ children, ...props }: ButtonProps) {
  const { open } = useProfileDownload();
  return <Button {...props} onClick={open}>{children}</Button>;
}
