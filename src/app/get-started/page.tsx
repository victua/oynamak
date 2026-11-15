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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: 'Inquiry submitted', description: 'An Oynamak advisor will reach out to you within 24 hours.' });
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
    <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-6 md:pb-24">
      <Breadcrumb trail={[{ label: 'Get started' }]} />
      <div className="mt-8 grid items-start gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl">Partner with Oynamak</h1>
          <p className="mt-6 text-lg text-foreground/85">Whether you need certified match equipment, international tournament hosting, coach training exchange, or sports analytics, our specialists are here to help.</p>
          <ul className="mt-8 space-y-5">
            {[
              ['Tailored sports solutions', 'Customized for clubs, academies, federations, and corporate partners.'],
              ['International quality standards', 'FIFA-grade match footballs, certified apparel, and elite host protocols.'],
              ['Fast, dedicated response', 'Our advisory team will reach out within 24 hours of your inquiry.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <div><h3 className="font-bold text-primary">{t}</h3><p className="text-foreground/75">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-brand bg-secondary p-6 md:p-10">
          <SectionTitle className="!text-2xl md:!text-3xl">Tell us about your needs</SectionTitle>
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
              <SelectTrigger id="lead-service" className="h-12 bg-white px-5"><SelectValue placeholder="Select a solution" /></SelectTrigger>
              <SelectContent>{services.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="lead-message" className="text-sm font-medium">Details</label>
            <Textarea id="lead-message" placeholder="Describe your organization, tournament, equipment needs, or partnership goals..." value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[110px] bg-white px-5" />
          </div>
          <Button type="submit" size="lg" className="h-12 w-full">Submit inquiry <Send className="ml-2 h-4 w-4" /></Button>
          <p className="text-center text-xs text-muted-foreground">Your information is confidential and used only to discuss your inquiry.</p>
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
