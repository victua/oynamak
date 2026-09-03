'use client';

import Link from "next/link";
import { PublicHeader } from "@/components/public-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, MountainIcon, ArrowUpRight } from "lucide-react";
import { PageContent } from "@/lib/content/ContentEdit";
import { EText, EImage } from "@/components/site/Editable";

// Shipped copy for the event cards. Each field is editable in place by an
// admin ("Edit page" toolbar); these strings are the fallback until then.
const EVENTS = [
    {
        title: "International Youth Showcase & Trials",
        date: "SEP 15",
        time: "09:00 AM - 05:00 PM",
        location: "Nairobi Sports Arena, Kenya",
        image: "https://picsum.photos/seed/event1/600/800",
        desc: "Elite youth scouting tournament featuring scouts from top African and European academies."
    },
    {
        title: "Coaching Capacity & Sports Tech Clinic",
        date: "OCT 08",
        time: "10:00 AM - 03:00 PM",
        location: "Nairobi, Kenya",
        image: "https://picsum.photos/seed/event2/600/800",
        desc: "Technical workshop for football coaches covering tactical periodization, video analysis, and modern training gear."
    },
    {
        title: "East Africa Sports Tourism Invitational",
        date: "NOV 20",
        time: "Multi-Day Tournament",
        location: "Nairobi & Great Rift Valley",
        image: "https://picsum.photos/seed/event3/600/800",
        desc: "Regional tournament combining competitive fixtures with cultural exchange and sports tourism excursions."
    }
];

export default function EventsPage() {
    return (
        <PageContent id="events">
        <div className="flex flex-col min-h-screen">
            <PublicHeader />

            {/* 1. Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <EImage
                    k="hero.image"
                    fallbackSrc="/advisory-oaktree.jpeg"
                    alt="Oynamak Sports Events & Workshops"
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
                                    <EText k="hero.eyebrow" fallback="Events & Hosting" />
                                </div>
                                <EText
                                    k="hero.title"
                                    fallback="Tournaments & Workshops"
                                    as="h1"
                                    className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
                                />
                                <EText
                                    k="hero.tagline"
                                    fallback="Discover international training camps, capacity-building sessions, and sporting showcases."
                                    as="p"
                                    className="mt-2 text-base md:text-lg text-muted-foreground"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Upcoming Events */}
            <section className="py-12 md:py-24 bg-background">
                <div className="w-full px-4 md:px-6">
                    <div className="text-center mb-12">
                        <EText
                            k="upcoming.heading"
                            fallback="Upcoming Programs & Tournaments"
                            as="h2"
                            className="text-3xl md:text-4xl font-bold text-primary mb-4"
                        />
                        <EText
                            k="upcoming.intro"
                            fallback="Participate in world-class sporting showcases, coaching clinics, and international exchange camps."
                            as="p"
                            className="text-muted-foreground max-w-2xl mx-auto"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {EVENTS.map((evt, i) => (
                            <div key={i} className="relative h-[520px] w-full rounded-xl overflow-hidden shadow-xl group">
                                <EImage
                                    k={`events.${i}.image`}
                                    fallbackSrc={evt.image}
                                    alt={evt.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors duration-300" />

                                <div className="absolute top-4 right-4 z-10">
                                    <EText
                                        k={`events.${i}.date`}
                                        fallback={evt.date}
                                        as="div"
                                        className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-bold shadow-md"
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                                        <CardContent className="p-6 text-left pr-16 h-full flex flex-col justify-between">
                                            <div>
                                                <EText
                                                    k={`events.${i}.title`}
                                                    fallback={evt.title}
                                                    as="h3"
                                                    className="text-xl font-bold mb-2 text-primary"
                                                />
                                                <div className="flex items-center text-sm text-muted-foreground mb-1">
                                                    <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                                                    <EText k={`events.${i}.time`} fallback={evt.time} />
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                                    <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                                                    <EText k={`events.${i}.location`} fallback={evt.location} />
                                                </div>
                                                <EText
                                                    k={`events.${i}.desc`}
                                                    fallback={evt.desc}
                                                    as="p"
                                                    className="text-xs text-muted-foreground line-clamp-2"
                                                />
                                            </div>
                                        </CardContent>
                                        <Button
                                            size="icon"
                                            asChild
                                            className="absolute bottom-4 right-4 rounded-full h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                                        >
                                            <Link href="/get-started">
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

            {/* 3. Past Events Highlights */}
            <section className="py-12 md:py-24 bg-muted/30">
                <div className="w-full px-4 md:px-6">
                    <EText
                        k="past.heading"
                        fallback="Past Showcase Highlights"
                        as="h2"
                        className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <EImage
                                    k={`past.${i}.image`}
                                    fallbackSrc={`https://picsum.photos/seed/pastevent${i}/400/400`}
                                    alt={`Past Event ${i}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
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
                            <span className="text-lg font-bold">Oynamak Sports Group Ltd</span>
                        </Link>
                        <p className="text-primary-foreground/80">
                            © {new Date().getFullYear()} Oynamak Sports Group Ltd. All Rights Reserved.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                        <div className="flex flex-wrap gap-4">
                            <Link href="/about" className="hover:underline">About</Link>
                            <Link href="/solutions" className="hover:underline">Solutions</Link>
                            <Link href="/events" className="hover:underline">Events</Link>
                            <Link href="/contact" className="hover:underline">Contact Us</Link>
                        </div>
                        <p className="text-primary-foreground/80">Nairobi, Kenya • hi@oynamak.co.ke</p>
                    </div>
                </div>
            </footer>
        </div>
        </PageContent>
    );
}
