'use client';

import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, MountainIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            {/* 1. Hero Section (Half Page) */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <Image
                    src="/oaktree-realestate.jpeg"
                    alt="Contact Oaktree"
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
                                    Get in Touch
                                </h1>
                                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                    We’re here to help you achieve your financial goals. Reach out today.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Contact Information & Form */}
            <section className="py-12 md:py-24 bg-background">
                <div className="w-full px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Contact Details */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Contact Information</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Have a question about our services or need to schedule a consultation? We're just a message away.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Visit Us</h4>
                                        <p className="text-muted-foreground">The Hub, James Gichuru Road, Nairobi</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Call Us</h4>
                                        <p className="text-muted-foreground">+254 700 000 000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Email Us</h4>
                                        <p className="text-muted-foreground">contact@oaktree.co.ke</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        {/* Map Embed */}
                        <Card className="shadow-lg border-muted bg-card overflow-hidden flex flex-col min-h-[450px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1685.6871596774977!2d36.761165460166744!3d-1.2865340053856902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109996536c39%3A0x4eb6d6e1e16b4153!2siHUB!5e1!3m2!1sen!2ske!4v1771959055645!5m2!1sen!2ske"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: "450px", flexGrow: 1 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </Card>
                    </div>
                </div>
            </section>

            {/* Map Placeholder */}
            <section className="h-[400px] w-full bg-muted relative">
                <Image
                    src="https://picsum.photos/seed/map/1920/600"
                    alt="Map Location"
                    fill
                    className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="secondary" size="lg" className="shadow-xl pointer-events-none">
                        <MapPin className="mr-2 h-5 w-5" /> The Hub Karen
                    </Button>
                </div>
            </section>

            <footer className="bg-primary text-primary-foreground">
                <div className="w-full py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <Link href="/" className="flex items-center gap-2" prefetch={false}>
                            <MountainIcon className="h-6 w-6" />
                            <span className="text-lg font-bold">Oaktree</span>
                        </Link>
                        <p className="text-primary-foreground/80">
                            © {new Date().getFullYear()} Oaktree. All Rights Reserved.
                        </p>
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
