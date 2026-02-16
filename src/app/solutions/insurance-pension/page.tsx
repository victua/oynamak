'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function InsurancePensionPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section (Half Page) */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="https://picsum.photos/seed/insurancehero/1920/1080"
          alt="Insurance & Pension"
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
                  Insurance & Pension
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Secure your future with comprehensive insurance and pension plans.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Protect What Matters</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We offer a wide range of insurance products and pension schemes to ensure that you, your family, and your employees are financially protected against life's uncertainties.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Our Solutions</h3>
              <ul className="space-y-3">
                {[
                  "Life Assurance",
                  "Health, Travel & General Insurance",
                  "Pension Schemes (Individual & Corporate)",
                  "Retirement Planning",
                  "Education Policies",
                  "Group Risk Cover"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://picsum.photos/seed/insurancemain/800/800"
                fill
                className="object-cover"
                alt="Family Protection"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
