'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StrategicPartnershipsPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree-advisory.jpeg"
          alt="Strategic Partnerships & Ecosystem Development"
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
                  <Globe className="h-3.5 w-3.5" />
                  Objective 02
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                  Strategic Partnerships & Ecosystem Development
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Fostering sustainable growth across the global sports ecosystem.
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Uniting Sports Stakeholders</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                To establish and strengthen strategic partnerships with local and international sports organizations, clubs, academies, federations, educational institutions, and corporate entities to foster sustainable growth within the sports ecosystem.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Sustainable sports ecosystems require collaboration between grassroots practitioners, governing bodies, international clubs, and commercial partners. Oynamak Sports Group acts as a strategic bridge, creating multi-stakeholder initiatives that generate enduring sporting and commercial value.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Partnership Focus Areas</h3>
              <ul className="space-y-3">
                {[
                  "Academy & Club Affiliation Frameworks",
                  "Federation & Governing Body Collaboration",
                  "Corporate Sponsorship Structuring & Activations",
                  "Educational Institution Sports Development Programs",
                  "International Club Scouting & Pathway Agreements",
                  "Grassroots Infrastructure & Community Sports Initiatives"
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
                    Explore Partnership Opportunities <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/advisory-oaktree.jpeg"
                fill
                className="object-cover"
                alt="Strategic Partnerships"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
