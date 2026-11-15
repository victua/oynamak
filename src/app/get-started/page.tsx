'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Send } from 'lucide-react';
import { Breadcrumb, SectionTitle } from '@/components/site/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { solutions } from '@/lib/site-config';

const services = [...solutions.map((s) => s.title), 'Corporate & Institutional Advisory', 'General Partnership Inquiry'];

function LeadForm() {
  const preselected = useSearchParams().get('service') || '';
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(preselected);
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, message, interest: service, channel: 'Get started form' }) });
      if (!res.ok) throw new Error((await res.json()).error || 'Something went wrong.');
      setSubmitted(true);
      toast({ title: 'Inquiry submitted', description: 'An Oynamak advisor will reach out to you within 24 hours.' });
    } catch (x) {
      toast({ title: 'Could not send', description: x instanceof Error ? x.message : 'Please try again.', variant: 'destructive' });
    }
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center md:px-6">
        <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
        <h1 className="mt-6 text-3xl font-bold text-primary">Thank you, {name}!</h1>
        <p className="mt-3 text-foreground/80">We have received your inquiry. An Oynamak advisor will contact you within 24 hours.</p>
        <Button asChild className="mt-8 h-12 px-8"><Link href="/">Back to home</Link></Button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-[96%] pb-16 pt-6 md:pb-24">
      <Breadcrumb trail={[{ label: 'Get started' }]} />
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl">Let&apos;s work together</h1>
          <p className="mt-6 text-lg text-foreground/85">Kit, camps, partnerships or tech: tell us what you need and we will come back with a plan.</p>
          <ul className="mt-8 space-y-5">
            {[
              ['Made for you', 'Plans for clubs, academies, federations and brands.'],
              ['World-class standards', 'Match-quality gear and properly run programmes.'],
              ['A quick reply', 'We will get back to you within 24 hours.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div><h3 className="font-bold text-primary">{t}</h3><p className="text-foreground/75">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-brand bg-secondary p-6 md:p-10">
          <SectionTitle className="!text-2xl md:!text-3xl">Tell us what you need</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="lead-name" className="text-sm font-medium">Full name</label>
              <Input id="lead-name" required placeholder="e.g. John Kamau" value={name} onChange={(e) => setName(e.target.value)} className="h-12 bg-white px-5" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="lead-phone" className="text-sm font-medium">Phone</label>
              <Input id="lead-phone" required type="tel" placeholder="+254 7XX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12 bg-white px-5" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lead-email" className="text-sm font-medium">Email</label>
            <Input id="lead-email" required type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-white px-5" />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lead-service" className="text-sm font-medium">Area of interest</label>
            <Select value={service} onValueChange={setService} required>
              <SelectTrigger id="lead-service" className="h-12 bg-white px-5"><SelectValue placeholder="Pick one" /></SelectTrigger>
              <SelectContent>{services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lead-message" className="text-sm font-medium">Anything else?</label>
            <Textarea id="lead-message" placeholder="Tell us about your team, event or plan..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[110px] bg-white px-5" />
          </div>
          <Button type="submit" size="lg" className="h-12 w-full">Send <Send className="ml-2 h-4 w-4" /></Button>
          <p className="text-center text-xs text-muted-foreground">We only use your details to get back to you.</p>
        </form>
      </div>
    </section>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={null}>
      <LeadForm />
    </Suspense>
  );
}
