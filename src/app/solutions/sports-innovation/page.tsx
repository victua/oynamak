'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SportsInnovationPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree-retirement.jpeg"
          alt="Sports Innovation and Technology Solutions"
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
                  <Sparkles className="h-3.5 w-3.5" />
                  Objective 05
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                  Sports Innovation & Technology Solutions
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Leveraging data, modern sports tech, and digital analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Objective & Detailed Content */}
      <section className="py-12 md:py-24 bg-background">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Modern Technology in Sport</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                To leverage technology, innovation, and modern sports solutions to improve talent identification, athlete development, performance management, fan engagement, and operational efficiency within the sports sector.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The future of sports performance and talent scouting is grounded in data and modern digital tools. Oynamak Sports Group integrates state-of-the-art sports technologies to streamline club operations, track athlete biometric and match performance metrics, and enhance community fan engagement.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Technology Solutions & Deployments</h3>
              <ul className="space-y-3">
                {[
                  "Digital Talent Identification & Video Scouting Portals",
                  "Athlete Biometric, Fitness & Performance Tracking",
                  "Match Analysis & Video Breakdown Software Integration",
                  "Club & Academy Management Software (CMS & Operations)",
                  "Fan Engagement Platforms & Digital Ticketing Solutions",
                  "Sports Science, Nutrition & Recovery Modern Tech Tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/get-started">
                    Deploy Sports Tech Solutions <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/oaktree-retirement.jpeg"
                fill
                className="object-cover"
                alt="Sports Technology and Innovation"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
