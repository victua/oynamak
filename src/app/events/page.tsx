'use client';

import Link from "next/link";
import Image from "next/image";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, MountainIcon, ArrowUpRight } from "lucide-react";

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            {/* 1. Hero Section (Half Page) */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <Image
                    src="/advisory-oaktree.jpeg"
                    alt="Oaktree Events"
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
                                    Events & Workshops
                                </h1>
                                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                    Join us for insightful sessions on wealth management and financial planning.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Upcoming Events */}
            <section className="py-12 md:py-24 bg-background">
                <div className="w-full px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Upcoming Events</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Stay ahead of the curve with our expert-led seminars and workshops.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl group">
                                <Image
                                    src={`https://picsum.photos/seed/event${i}/600/800`}
                                    alt={`Event ${i}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />

                                <div className="absolute top-4 right-4 z-10">
                                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-bold shadow-md">
                                        AUG {10 + i}
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                                        <CardContent className="p-6 text-left pr-16 h-full flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold mb-2 text-primary">Financial Freedom Workshop</h3>
                                                <div className="flex items-center text-sm text-muted-foreground mb-1">
                                                    <Calendar className="h-4 w-4 mr-2" />
                                                    <span>10:00 AM - 2:00 PM</span>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mr-2" />
                                                    <span>The Hub, James Gichuru Road</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <Button
                                            size="icon"
                                            asChild
                                            className="absolute bottom-4 right-4 rounded-full h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                                        >
                                            <Link href="#">
                                                <ArrowUpRight className="h-5 w-5" />
                                                <span className="sr-only">Register Now</span>
                                            </Link>
                                        </Button>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Past Events Gallery Placeholder */}
            <section className="py-12 md:py-24 bg-muted/30">
                <div className="w-full px-4 md:px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Past Highlights</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <Image
                                    src={`https://picsum.photos/seed/pastevent${i}/400/400`}
                                    alt={`Past Event ${i}`}
                                    fill
                                    className="object-coverHover"
                                />
                            </div>
                        ))}
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
