'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InternationalExchangePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/advisory-oaktree.jpeg"
          alt="International Exchange and Capacity Building"
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
                  <Award className="h-3.5 w-3.5" />
                  Objective 03
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                  International Exchange & Capacity Building
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Global exposure, training opportunities, and professional development.
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Empowering Talent & Technical Leaders</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                To facilitate international sports exchange programs, training opportunities, educational visits, and knowledge-sharing initiatives for athletes, coaches, technical officials, administrators, and sports professionals.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe that African sporting excellence flourishes when athletes and technical staff gain direct exposure to global training methodologies, elite competitions, and international coaching accreditation. Oynamak Sports Group curates comprehensive exchange journeys that accelerate career development.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Exchange & Training Initiatives</h3>
              <ul className="space-y-3">
                {[
                  "International Youth Academy Exchange Tours & Trials",
                  "Coach Education, Certification & Technical Masterclasses",
                  "Referees, Umpires & Match Officials Capacity Training",
                  "Sports Management & Administrative Knowledge Sharing",
                  "Elite Athlete High-Performance Immersion Camps",
                  "Academic & Educational Sports Exchange Visits"
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
                    Join an Exchange Program <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/oaktree1.jpeg"
                fill
                className="object-cover"
                alt="International Exchange and Training"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
