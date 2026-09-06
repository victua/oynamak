'use client';

import Link from "next/link";
import { useState, useTransition } from 'react';
import { submitLead } from './actions';
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MountainIcon, Send, CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageContent } from "@/lib/content/ContentEdit";
import { EText, EImage } from "@/components/site/Editable";

// Marketing copy is editable in place by an admin ("Edit page" toolbar).
// The form's own field labels and the options below are NOT: an option's
// label is also the value stored on the lead, so editing one would quietly
// change what lands in Firestore.

const BENEFITS = [
    { title: 'Tailored Sports Solutions', desc: 'Customized for clubs, academies, federations, and corporate partners.' },
    { title: 'International Quality Standards', desc: 'FIFA-grade match footballs, certified apparel, and elite host protocols.' },
    { title: 'Fast & Dedicated Response', desc: 'Our advisory team will reach out within 24 hours of your inquiry.' },
];

const services = [
    { value: 'Sports Products & Equipment Solutions', label: 'Sports Products & Equipment Solutions' },
    { value: 'Strategic Partnerships & Ecosystem Development', label: 'Strategic Partnerships & Ecosystem Development' },
    { value: 'International Exchange & Capacity Building', label: 'International Exchange & Capacity Building' },
    { value: 'Sports Tourism & International Hosting', label: 'Sports Tourism & International Hosting' },
    { value: 'Sports Innovation & Technology Solutions', label: 'Sports Innovation & Technology Solutions' },
    { value: 'Corporate & Institutional Advisory', label: 'Corporate & Institutional Advisory' },
    { value: 'General Partnership Inquiry', label: 'General Partnership Inquiry' },
];

function LeadFormContent() {
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service') || '';

    const [submitted, setSubmitted] = useState(false);
    const [leadNumber, setLeadNumber] = useState<number | null>(null);
    const [pending, start] = useTransition();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState(preselectedService);
    const [message, setMessage] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Only confirm to the visitor once the lead is actually stored — this
        // form is the site's sole capture path, so a silent failure loses the
        // inquiry outright.
        start(async () => {
            const result = await submitLead({ name, email, phone, service, message });

            if (!result.ok) {
                toast({
                    title: 'Could not send your inquiry',
                    description: result.error,
                    variant: 'destructive',
                });
                return;
            }

            setLeadNumber(result.leadNumber);
            setSubmitted(true);
            toast({
                title: 'Inquiry Submitted!',
                description: 'An Oynamak Sports Group advisor will reach out to you within 24 hours.',
            });
        });
    };

    if (submitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <PublicHeader />

                <section className="relative w-full h-[50vh] min-h-[400px]">
                    <EImage
                        k="hero.image"
                        fallbackSrc="/oaktree-retirement.jpeg"
                        alt="Partner with Oynamak Sports Group Ltd"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="relative z-10 h-full flex items-end">
                        <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
                            <Card className="relative max-w-xl w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden">
                                <CardContent className="p-8 md:p-10 text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                                        <Trophy className="h-3.5 w-3.5" />
                                        <EText k="thanks.eyebrow" fallback="Inquiry Received" />
                                    </div>
                                    <EText
                                        k="thanks.title"
                                        fallback="Thank You"
                                        as="h1"
                                        className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
                                    />
                                    <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                        <EText k="thanks.tagline" fallback="Your request has been forwarded to our sports strategy team." />
                                        {leadNumber !== null && (
                                            <> Your reference is <span className="font-semibold text-foreground">#{String(leadNumber).padStart(3, '0')}</span>.</>
                                        )}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-background flex-1">
                    <div className="w-full max-w-2xl mx-auto px-4 text-center">
                        <div className="bg-primary/10 p-6 rounded-full inline-block mb-8">
                            <CheckCircle2 className="h-16 w-16 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-4">Thank You, {name}!</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Your inquiry regarding <span className="font-semibold text-foreground">{service || 'Sports Solutions'}</span> has been received.
                            An Oynamak Sports Group specialist will contact you within 24 hours to discuss how we can support your sporting goals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg">
                                <Link href="/">Back to Home</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link href="/solutions">Explore Solutions</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <footer className="bg-primary text-primary-foreground">
                    <div className="w-full py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                                <MountainIcon className="h-6 w-6" />
                                <span className="text-lg font-bold">Oynamak Sports Group Ltd</span>
                            </Link>
                            <p className="text-primary-foreground/80">© {new Date().getFullYear()} Oynamak Sports Group Ltd. All Rights Reserved.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                            <div className="flex flex-wrap gap-4">
                                <Link href="/about" className="hover:underline">About</Link>
                                <Link href="/solutions" className="hover:underline">Solutions</Link>
                                <Link href="/contact" className="hover:underline">Contact Us</Link>
                            </div>
                            <p className="text-primary-foreground/80">Nairobi, Kenya • hi@oynamak.co.ke</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            {/* Hero */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <EImage
                    k="hero.image"
                    fallbackSrc="/oaktree-retirement.jpeg"
                    alt="Partner with Oynamak Sports Group Ltd"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative z-10 h-full flex items-end">
                    <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
                        <Card className="relative max-w-xl w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden">
                            <CardContent className="p-8 md:p-10 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                                    <Trophy className="h-3.5 w-3.5" />
                                    <EText k="hero.eyebrow" fallback="Get Started" />
                                </div>
                                <EText
                                    k="hero.title"
                                    fallback="Partner with Oynamak"
                                    as="h1"
                                    className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
                                />
                                <EText
                                    k="hero.tagline"
                                    fallback="Take the first step toward advancing your sports organization."
                                    as="p"
                                    className="mt-2 text-base md:text-lg text-muted-foreground"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 md:py-24 bg-background flex-1">
                <div className="w-full px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left: Info */}
                        <div>
                            <EText
                                k="pitch.heading"
                                fallback="Let's Strengthen the Sports Ecosystem"
                                as="h2"
                                className="text-3xl md:text-4xl font-bold text-primary mb-6"
                            />
                            <EText
                                k="pitch.intro"
                                fallback="Whether you need certified match equipment, international tournament hosting, coach training exchange, or sports analytics technology, our specialists are here to assist."
                                as="p"
                                className="text-lg text-muted-foreground leading-relaxed mb-8"
                            />
                            <div className="space-y-6">
                                {BENEFITS.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <EText
                                                k={`benefits.${i}.title`}
                                                fallback={item.title}
                                                as="h4"
                                                className="font-semibold text-lg"
                                            />
                                            <EText
                                                k={`benefits.${i}.desc`}
                                                fallback={item.desc}
                                                as="p"
                                                className="text-muted-foreground"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <Card className="shadow-lg border-muted bg-card">
                            <CardContent className="p-8">
                                <EText
                                    k="form.heading"
                                    fallback="Tell Us About Your Requirements"
                                    as="h3"
                                    className="text-2xl font-bold mb-6"
                                />
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="lead-name" className="text-sm font-medium">Full Name</label>
                                            <Input id="lead-name" placeholder="e.g. John Kamau" value={name} onChange={e => setName(e.target.value)} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lead-phone" className="text-sm font-medium">Phone Number</label>
                                            <Input id="lead-phone" placeholder="+254 7XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lead-email" className="text-sm font-medium">Email Address</label>
                                        <Input id="lead-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lead-service" className="text-sm font-medium">Area of Interest</label>
                                        <Select value={service} onValueChange={setService} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an objective / solution" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {services.map(s => (
                                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lead-message" className="text-sm font-medium">Details & Requirements</label>
                                        <Textarea id="lead-message" placeholder="Describe your organization, tournament, equipment needs, or partnership goals..." className="min-h-[100px]" value={message} onChange={e => setMessage(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                                        {pending ? 'Sending...' : 'Submit Inquiry'} <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                    <EText
                                        k="form.privacy"
                                        fallback="Your information is confidential and will only be used to discuss your sports solutions inquiry."
                                        as="p"
                                        className="text-xs text-muted-foreground text-center"
                                    />
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-primary text-primary-foreground">
                <div className="w-full py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="flex items-center gap-2" prefetch={false}>
                            <MountainIcon className="h-6 w-6" />
                            <span className="text-lg font-bold">Oynamak Sports Group Ltd</span>
                        </Link>
                        <p className="text-primary-foreground/80">© {new Date().getFullYear()} Oynamak Sports Group Ltd. All Rights Reserved.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <div className="flex flex-wrap gap-4">
                            <Link href="/about" className="hover:underline">About</Link>
                            <Link href="/solutions" className="hover:underline">Solutions</Link>
                            <Link href="/contact" className="hover:underline">Contact Us</Link>
                        </div>
                        <p className="text-primary-foreground/80">Nairobi, Kenya • hi@oynamak.co.ke</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function GetStartedPage() {
    return (
        <PageContent id="get-started">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
                <LeadFormContent />
            </Suspense>
        </PageContent>
    );
}
