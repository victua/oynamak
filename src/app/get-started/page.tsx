'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MountainIcon, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const services = [
    { value: 'Investment Services', label: 'Investment Services' },
    { value: 'Real Estate Services', label: 'Real Estate Services' },
    { value: 'Consulting & Advisory', label: 'Consulting & Advisory' },
    { value: 'Insurance & Pension', label: 'Insurance & Pension' },
    { value: 'Financial Planning', label: 'Financial Planning' },
    { value: 'Corporate Training', label: 'Corporate Training' },
    { value: 'Other', label: 'Other' },
];

function LeadFormContent() {
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service') || '';

    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [service, setService] = useState(preselectedService);
    const [message, setMessage] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would save to Firestore
        setSubmitted(true);
        toast({
            title: 'Inquiry Submitted!',
            description: 'An Oaktree advisor will reach out to you within 24 hours.',
        });
    };

    if (submitted) {
        return (
            <div className="flex flex-col min-h-screen">
                <PublicHeader />

                <section className="relative w-full h-[50vh] min-h-[400px]">
                    <Image
                        src="https://picsum.photos/seed/getstarted/1920/1080"
                        alt="Get Started with Oaktree"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="relative z-10 h-full flex items-end">
                        <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
                            <Card className='relative max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden'>
                                <CardContent className="p-8 md:p-10 text-left">
                                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                                        Get Started
                                    </h1>
                                    <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                        Take the first step toward financial freedom.
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
                            Your inquiry about <span className="font-semibold text-foreground">{service}</span> has been received.
                            One of our expert advisors will contact you within 24 hours to discuss how we can help you achieve your financial goals.
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
                                <span className="text-lg font-bold">Oaktree</span>
                            </Link>
                            <p className="text-primary-foreground/80">© {new Date().getFullYear()} Oaktree. All Rights Reserved.</p>
                        </div>
                        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                            <div className="flex gap-4">
                                <Link href="/portal/dashboard" className="hover:underline">Client Login</Link>
                                <Link href="/ops/dashboard" className="hover:underline">Partner Login</Link>
                                <Link href="/contact" className="hover:underline">Contact Us</Link>
                            </div>
                            <p className="text-primary-foreground/80">The Hub, James Gichuru Road</p>
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
                <Image
                    src="https://picsum.photos/seed/getstarted/1920/1080"
                    alt="Get Started with Oaktree"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="relative z-10 h-full flex items-end">
                    <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
                        <Card className='relative max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden'>
                            <CardContent className="p-8 md:p-10 text-left">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                                    Get Started
                                </h1>
                                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                    Take the first step toward financial freedom with Oaktree.
                                </p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Let's Talk About Your Financial Future</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Whether you're looking to invest, insure, or plan your wealth, Oaktree's expert advisors are here to guide you.
                                Fill in the form and we'll connect you with the right specialist.
                            </p>
                            <div className="space-y-6">
                                {[
                                    { title: 'Personalized Approach', desc: 'Solutions tailored to your unique goals.' },
                                    { title: 'Expert Guidance', desc: 'Licensed financial advisors with 15+ years experience.' },
                                    { title: 'Fast Response', desc: 'We\'ll reach out within 24 hours of your inquiry.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{item.title}</h4>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Form */}
                        <Card className="shadow-lg border-muted bg-card">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-6">Tell Us About Your Needs</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="lead-name" className="text-sm font-medium">Full Name</label>
                                            <Input id="lead-name" placeholder="e.g. Wanjiku Muthoni" value={name} onChange={e => setName(e.target.value)} required />
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
                                        <label htmlFor="lead-service" className="text-sm font-medium">Service of Interest</label>
                                        <Select value={service} onValueChange={setService} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {services.map(s => (
                                                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lead-message" className="text-sm font-medium">Tell Us More</label>
                                        <Textarea id="lead-message" placeholder="What are your financial goals? How can we help?" className="min-h-[100px]" value={message} onChange={e => setMessage(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full" size="lg">
                                        Submit Inquiry <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Your information is confidential and will only be used to contact you about our services.
                                    </p>
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
                            <span className="text-lg font-bold">Oaktree</span>
                        </Link>
                        <p className="text-primary-foreground/80">© {new Date().getFullYear()} Oaktree. All Rights Reserved.</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <div className="flex gap-4">
                            <Link href="/portal/dashboard" className="hover:underline">Client Login</Link>
                            <Link href="/ops/dashboard" className="hover:underline">Partner Login</Link>
                            <Link href="/contact" className="hover:underline">Contact Us</Link>
                        </div>
                        <p className="text-primary-foreground/80">The Hub, James Gichuru Road</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default function GetStartedPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LeadFormContent />
        </Suspense>
    );
}
