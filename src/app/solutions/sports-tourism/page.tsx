'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plane, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SportsTourismPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree-realestate.jpeg"
          alt="Sports Tourism and International Hosting"
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
                  <Plane className="h-3.5 w-3.5" />
                  Objective 04
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                  Sports Tourism & International Hosting
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Promoting sports tourism, international tournaments, and training camps.
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">World-Class Sporting Events & Hosting</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                To promote sports tourism by organizing and hosting international teams, training camps, competitions, and sporting events that enhance sporting excellence, cultural exchange, and economic development.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Kenya and East Africa offer world-renowned high-altitude training grounds, beautiful climate, and vibrant cultural hospitality. Oynamak Sports Group provides full-service hosting, hospitality, facility management, and tournament orchestration for visiting international squads, national teams, and sports delegations.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Hosting & Tourism Solutions</h3>
              <ul className="space-y-3">
                {[
                  "International Pre-Season & High-Altitude Training Camps",
                  "Invitational Youth & Senior Tournaments & Showcases",
                  "End-to-End Visiting Delegation Hospitality & Logistics",
                  "Sports Venue & Match Protocol Management",
                  "Cultural Immersion & Safari Sports Tourism Packages",
                  "Economic & Tourism Impact Analysis for Host Regions"
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
                    Host Your Event with Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/oaktree-realestate.jpeg"
                fill
                className="object-cover"
                alt="Sports Tourism and Hosting"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
