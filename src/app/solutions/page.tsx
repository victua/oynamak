'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Trophy } from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* 1. Hero Section */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <Image
                    src="/oaktree-advisory.jpeg"
                    alt="Sports Ecosystem Strategies and Solutions"
                    fill
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
                                    Our Solutions
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                                    Sports Ecosystem Solutions
                                </h1>
                                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                    Strategic frameworks and practical initiatives designed to elevate sports across Africa.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Solutions Grid */}
            <section className="py-12 md:py-24 bg-background">
                <div className="w-full px-4 md:px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Strategic Pillars & Capabilities</h2>
                        <p className="text-muted-foreground text-base md:text-lg">
                            Explore our comprehensive suite of solutions tailored for academies, clubs, federations, and sports enterprises.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Sports Products & Equipment Solutions",
                                desc: "To source, import, brand, market, and distribute high-quality sports equipment, footballs, apparel, and related sporting goods that meet international standards.",
                                link: "/solutions/products-equipment",
                                image: "/oaktreee.jpeg",
                                num: "01"
                            },
                            {
                                title: "Strategic Partnerships & Ecosystem Development",
                                desc: "To establish and strengthen strategic partnerships with local and international sports organizations, clubs, academies, and federations.",
                                link: "/solutions/strategic-partnerships",
                                image: "/oaktree-advisory.jpeg",
                                num: "02"
                            },
                            {
                                title: "International Exchange & Capacity Building",
                                desc: "To facilitate international sports exchange programs, training opportunities, educational visits, and knowledge-sharing initiatives.",
                                link: "/solutions/international-exchange",
                                image: "/advisory-oaktree.jpeg",
                                num: "03"
                            },
                            {
                                title: "Sports Tourism & International Hosting",
                                desc: "To promote sports tourism by organizing and hosting international teams, training camps, competitions, and sporting events.",
                                link: "/solutions/sports-tourism",
                                image: "/oaktree-realestate.jpeg",
                                num: "04"
                            },
                            {
                                title: "Sports Innovation & Technology Solutions",
                                desc: "To leverage technology, innovation, and modern sports solutions to improve talent identification, athlete development, and performance.",
                                link: "/solutions/sports-innovation",
                                image: "/oaktree-retirement.jpeg",
                                num: "05"
                            },
                            {
                                title: "Custom Sports Enterprise Advisory",
                                desc: "Dedicated consulting for commercial sports ventures, corporate sponsorship structuring, and stadium/facility ecosystem activation.",
                                link: "/get-started",
                                image: "/oaktree1.jpeg",
                                num: "06"
                            }
                        ].map((service, i) => (
                            <Card key={i} className="relative overflow-hidden flex flex-col h-[520px] group bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-xl border-transparent">
                                <div className="overflow-hidden h-[60%] relative">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="text-4xl font-black text-white/50 tracking-tighter select-none">
                                            {service.num}
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="h-[40%] p-6 flex flex-col relative text-left justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-3">{service.desc}</p>
                                    </div>
                                    <div className="pt-4 flex justify-between items-center border-t border-border/50 mt-2">
                                        <span className="text-sm font-semibold text-primary">Learn More</span>
                                        <Button
                                            size="icon"
                                            asChild
                                            className="rounded-full h-10 w-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                                        >
                                            <Link href={service.link}>
                                                <ArrowUpRight className="h-5 w-5" />
                                                <span className="sr-only">View {service.title}</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
