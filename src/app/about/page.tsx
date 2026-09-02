'use client';

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Globe, Plane, Award, Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <Image
          src="/oaktree1.jpeg"
          alt="About Oynamak Sports Group Ltd"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-4 md:px-6 pb-8 sm:pb-12">
            <Card
              className="relative max-w-xl w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden"
            >
              <CardContent className="p-8 md:p-10 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
                  <Trophy className="h-3.5 w-3.5" />
                  About Us
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                  Oynamak Sports Group Ltd
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                  Pioneering sports ecosystem strategies and solutions across Africa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. Corporate Positioning & Company Overview */}
      <section className="py-12 md:py-24 bg-background">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Corporate Positioning</h2>
              <p className="text-lg text-foreground font-medium leading-relaxed mb-6 bg-muted/40 p-6 rounded-xl border-l-4 border-primary">
                Oynamak Sports Group Ltd is a sports enterprise dedicated to providing innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange programs, sports tourism, and technology-driven initiatives.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                By bridging grassroots potential with international standards, we empower sports organizations, athletes, federations, and corporate entities to thrive sustainably in an interconnected global sports landscape.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-xl mt-8">
                <Image
                  src="/oaktree1.jpeg"
                  fill
                  className="object-cover"
                  alt="Sports Ecosystem Strategy"
                />
              </div>
              <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-xl mb-8">
                <Image
                  src="/oaktreee.jpeg"
                  fill
                  className="object-cover"
                  alt="Quality Sports Equipment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="w-full px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-accent">Our Mission</h3>
                <p className="text-lg leading-relaxed">
                  To empower sports organizations, athletes, coaches, and communities by delivering world-class sports products, forging strategic ecosystem partnerships, facilitating international exchange, promoting sports tourism, and driving sports technological innovation.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground border-none shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  To be Africa's leading sports enterprise and premier catalyst for global sporting excellence, sustainable ecosystem development, and athlete empowerment across the continent.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. The 5 Core Objectives */}
      <section className="py-12 md:py-24 bg-background">
        <div className="w-full px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Objectives</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              The fundamental strategic pillars guiding everything we do at Oynamak Sports Group Ltd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: "1. Sports Products and Equipment Solutions",
                desc: "To source, import, brand, market, and distribute high-quality sports equipment, footballs, apparel, and related sporting goods that meet international standards and support the growth of sport across the country and Africa."
              },
              {
                icon: Globe,
                title: "2. Strategic Partnerships and Ecosystem Development",
                desc: "To establish and strengthen strategic partnerships with local and international sports organizations, clubs, academies, federations, educational institutions, and corporate entities to foster sustainable growth within the sports ecosystem."
              },
              {
                icon: Award,
                title: "3. International Exchange and Capacity Building",
                desc: "To facilitate international sports exchange programs, training opportunities, educational visits, and knowledge-sharing initiatives for athletes, coaches, technical officials, administrators, and sports professionals."
              },
              {
                icon: Plane,
                title: "4. Sports Tourism and International Hosting",
                desc: "To promote sports tourism by organizing and hosting international teams, training camps, competitions, and sporting events that enhance sporting excellence, cultural exchange, and economic development."
              },
              {
                icon: Sparkles,
                title: "5. Sports Innovation and Technology Solutions",
                desc: "To leverage technology, innovation, and modern sports solutions to improve talent identification, athlete development, performance management, fan engagement, and operational efficiency within the sports sector."
              }
            ].map((obj, i) => (
              <Card key={i} className="shadow-lg border-muted bg-card hover:shadow-xl transition-shadow flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="bg-primary/10 p-3.5 rounded-xl w-fit text-primary mb-6">
                    <obj.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4 leading-snug">{obj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{obj.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="py-12 md:py-24 bg-muted/30">
        <div className="w-full px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Leadership & Advisory</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our leadership brings extensive experience in sports governance, international hosting, equipment procurement, and athletic development.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "Executive Leadership", role: "Managing Director", image: "person1" },
              { name: "Strategic Partnerships", role: "Ecosystem Development Lead", image: "person2" },
              { name: "Operations & Logistics", role: "International Exchange Coordinator", image: "person3" },
              { name: "Sports Technology", role: "Innovation & Performance Analyst", image: "person4" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-md bg-white">
                  <Image
                    src={`https://picsum.photos/seed/${member.image}/400/400`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    alt={member.name}
                  />
                </div>
                <h3 className="text-lg font-bold text-primary">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
