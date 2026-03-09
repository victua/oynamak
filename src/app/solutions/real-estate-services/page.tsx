'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function RealEstateServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section (Half Page) */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree-realestate.jpeg"
          alt="Real Estate Services"
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
                  Real Estate Services
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Expert guidance in residential and commercial property markets.
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Property Solutions</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We provide comprehensive real estate services, from buying and selling to professional property management. Our team leverages market insights to help you make informed decisions.
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">Our Expertise</h3>
              <ul className="space-y-3">
                {[
                  "Residential Property Sales & Lettings",
                  "Commercial Real Estate Leasing",
                  "Property Management Services",
                  "Real Estate Advisory & Valuation",
                  "Land Acquisition & Development",
                  "Facility Management"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/oaktree1.jpeg"
                fill
                className="object-cover"
                alt="Property Management"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
