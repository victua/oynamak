'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductsEquipmentPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktreee.jpeg"
          alt="Sports Products and Equipment Solutions"
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
                  Objective 01
                </div>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-primary">
                  Sports Products & Equipment Solutions
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Supplying international-standard sporting goods across Kenya and Africa.
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">World-Class Equipment & Apparel</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                To source, import, brand, market, and distribute high-quality sports equipment, footballs, apparel, and related sporting goods that meet international standards and support the growth of sport across the country and Africa.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From certified FIFA-grade match balls and academy training essentials to customized team kits and field equipment, Oynamak Sports Group provides end-to-end supply chain solutions tailored to professional clubs, schools, academies, and federations.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Our Product Lines & Capabilities</h3>
              <ul className="space-y-3">
                {[
                  "Certified Match Footballs & Training Balls",
                  "High-Performance Team Kits, Apparel & Uniforms",
                  "Professional Agility, Training & Coaching Gear",
                  "Goalkeeper Gloves & Protective Sporting Equipment",
                  "Custom Branding & Merchandising for Clubs & Leagues",
                  "Bulk Import & Regional Distribution across Africa"
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
                    Request Equipment Catalog <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/oaktreee.jpeg"
                fill
                className="object-cover"
                alt="Sports Equipment and Products"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
