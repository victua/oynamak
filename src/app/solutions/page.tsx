'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function SolutionsPage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* 1. Hero Section (Half Page) */}
            <section className="relative w-full h-[50vh] min-h-[400px]">
                <Image
                    src="/oaktree-advisory.jpeg"
                    alt="Our Solutions"
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
                                    Our Solutions
                                </h1>
                                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                                    Comprehensive financial services tailored to your unique needs.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. Solutions Grid */}
            <section className="py-12 md:py-24 bg-background">
                <div className="w-full px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">What We Offer</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Explore our range of specialized services designed to help you plan, grow, and protect your wealth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Investment Services", desc: "Personalized investment strategies to grow your wealth.", link: "/solutions/investment-services", image: "/oaktreee.jpeg" },
                            { title: "Real Estate Services", desc: "Expert guidance in residential and commercial property markets.", link: "/solutions/real-estate-services", image: "/oaktree-realestate.jpeg" },
                            { title: "Consulting & Advisory", desc: "Strategic advice to navigate complex financial landscapes.", link: "/solutions/consulting-advisory", image: "/oaktree-advisory.jpeg" },
                            { title: "Insurance & Pension", desc: "Secure your future with comprehensive insurance and pension plans.", link: "/solutions/insurance-pension", image: "/oaktree-retirement.jpeg" }
                        ].map((service, i) => (
                            <Card key={i} className="relative overflow-hidden flex flex-col h-[500px] group bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-xl border-transparent">
                                <div className="overflow-hidden h-[70%] relative">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        data-ai-hint="financial service"
                                    />
                                </div>
                                <CardContent className="h-[30%] p-6 flex flex-col relative text-left">
                                    <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm">{service.desc}</p>
                                    <Button
                                        size="icon"
                                        asChild
                                        className="absolute bottom-4 right-4 rounded-full h-12 w-12 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                                    >
                                        <Link href={service.link}>
                                            <ArrowUpRight className="h-5 w-5" />
                                            <span className="sr-only">View Service</span>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
