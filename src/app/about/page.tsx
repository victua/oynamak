'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section (Half Page) */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree1.jpeg"
          alt="About Oaktree"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
            <Card
              className='relative max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden'
            >
              <CardContent className="p-8 md:p-10 text-left">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                  About Oaktree
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Inspired by the resilience and strength of the oak tree.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Company Overview */}
      <section className="py-12 md:py-24 bg-background">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Oaktree is a holistic financial services group dedicated to helping individuals, families, groups, and organizations achieve financial freedom, growth, and generational wealth sustainability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide end-to-end financial planning, investment management, wealth consolidation, and tailored training solutions, ensuring a legacy for future generations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="/oaktree1.jpeg"
                  fill
                  className="object-cover"
                  alt="Oaktree Overview 1"
                  data-ai-hint="office meeting"
                />
              </div>
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-xl mb-8">
                <Image
                  src="/oaktreee.jpeg"
                  fill
                  className="object-cover"
                  alt="Oaktree Overview 2"
                  data-ai-hint="financial planning"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Team Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="w-full px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our team of seasoned professionals brings decades of experience across all financial sectors.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Mumbi Mbiyu", role: "CEO & Founder", image: "person1" },
              { name: "Alexandria Kimathi", role: "Social Media Lead", image: "person2" },
              { name: "John Kamau", role: "Senior Financial Advisor", image: "person3" },
              { name: "Sarah Njoroge", role: "Client Relations Manager", image: "person4" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-md bg-white">
                  <Image
                    src={`https://picsum.photos/seed/${member.image}/400/400`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    alt={member.name}
                    data-ai-hint="professional portrait"
                  />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-accent">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  To empower clients to <span className="font-semibold text-white">plan, grow, protect, and consolidate</span> their wealth through personalized strategies, trusted partnerships, and innovative financial solutions—ensuring a legacy for future generations.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To be the trusted partner for individuals and organizations seeking <span className="font-semibold text-primary">enduring financial health and legacy creation</span>—inspired by the resilience and growth of the oak tree.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* 5. Team Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="w-full px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our team of seasoned professionals brings decades of experience across all financial sectors.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Mumbi Mbiyu", role: "CEO & Founder", image: "person1" },
              { name: "Alexandria Kimathi", role: "Social Media Lead", image: "person2" },
              { name: "John Kamau", role: "Senior Financial Advisor", image: "person3" },
              { name: "Sarah Njoroge", role: "Client Relations Manager", image: "person4" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-md bg-white">
                  <Image
                    src={`https://picsum.photos/seed/${member.image}/400/400`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    alt={member.name}
                    data-ai-hint="professional portrait"
                  />
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
