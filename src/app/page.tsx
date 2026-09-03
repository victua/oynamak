'use client';

// The home page. Every string and image is editable in place by an admin
// ("Edit page" toolbar); the values in this file are the shipped copy and the
// fallback for any key nobody has edited yet. See src/lib/content/ContentEdit.tsx.

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/public-header";
import {
  CheckCircle2,
  ArrowRight,
  MountainIcon,
  ArrowUpRight,
  Users,
  Briefcase,
  Trophy,
  Globe,
  Sparkles
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageContent } from "@/lib/content/ContentEdit";
import { EText, EImage } from "@/components/site/Editable";

// Destinations stay in code: editing changes what a card says, never where it
// points, so no edit can send a visitor to a route that does not exist.
const SERVICES = [
  {
    title: "Sports Products & Equipment Solutions",
    desc: "To source, import, brand, market, and distribute high-quality sports equipment, footballs, apparel, and related sporting goods that meet international standards.",
    link: "/solutions/products-equipment",
    image: "/oaktreee.jpeg",
    num: "01"
  },
  {
    title: "Strategic Partnerships & Ecosystem Development",
    desc: "To establish and strengthen strategic partnerships with sports organizations, clubs, academies, federations, educational institutions, and corporate entities.",
    link: "/solutions/strategic-partnerships",
    image: "/oaktree-advisory.jpeg",
    num: "02"
  },
  {
    title: "International Exchange & Capacity Building",
    desc: "To facilitate international sports exchange programs, training opportunities, educational visits, and knowledge-sharing initiatives for athletes, coaches, and officials.",
    link: "/solutions/international-exchange",
    image: "/advisory-oaktree.jpeg",
    num: "03"
  },
  {
    title: "Sports Tourism & International Hosting",
    desc: "To promote sports tourism by organizing and hosting international teams, training camps, competitions, and sporting events that enhance excellence and cultural exchange.",
    link: "/solutions/sports-tourism",
    image: "/oaktree-realestate.jpeg",
    num: "04"
  },
  {
    title: "Sports Innovation & Technology Solutions",
    desc: "To leverage technology, innovation, and modern sports solutions to improve talent identification, athlete development, performance management, and fan engagement.",
    link: "/solutions/sports-innovation",
    image: "/oaktree-retirement.jpeg",
    num: "05"
  },
  {
    title: "Corporate & Institutional Advisory",
    desc: "Strategic advisory for corporations, government bodies, and institutions seeking impactful sports sponsorship, corporate tournaments, and CSR investments.",
    link: "/get-started",
    image: "/oaktree1.jpeg",
    num: "06"
  }
];

const STEPS = [
  { title: "Assess & Strategize", desc: "Analyzing ecosystem needs, equipment requirements, and talent pathways." },
  { title: "Partner & Source", desc: "Establishing global partnerships and sourcing certified high-standard sports goods." },
  { title: "Execute & Host", desc: "Delivering international exchange tours, training camps, and tournament hosting." },
  { title: "Innovate & Scale", desc: "Deploying modern sports technology, analytics, and sustainable development." }
];

const AUDIENCES = [
  { icon: Trophy, title: "Clubs & Academies", desc: "Certified equipment supply, talent scouting tech, and exchange tours." },
  { icon: Globe, title: "Federations & Bodies", desc: "Strategic ecosystem development, tournament hosting, and capacity building." },
  { icon: Users, title: "Athletes & Coaches", desc: "International training opportunities, accreditation, and career pathways." },
  { icon: Briefcase, title: "Corporate Partners", desc: "Sports sponsorship activations, sports tourism, and tournament branding." }
];

const REASONS = [
  { title: "Ecosystem-Wide Approach", desc: "Connecting products, partnerships, training, hosting, and sports technology under one roof." },
  { title: "International Standards", desc: "Supplying certified match-grade equipment, balls, and apparel that meet global benchmarks." },
  { title: "Global Network & Partnerships", desc: "Direct relationships with international sports clubs, federations, and tournament organizers." },
  { title: "Innovation & Technology Focus", desc: "Leveraging data analytics, digital talent scouting, and modern sports management systems." },
  { title: "Sustainable Capacity Building", desc: "Empowering athletes, coaches, and administrators for long-term sporting and economic impact." }
];

const PARTNERS = ["FEDERATION", "ACADEMY", "SPORTS BRAND", "GLOBAL CLUB", "TOURISM BOARD"];

const TESTIMONIALS = [
  {
    quote: "Oynamak Sports Group transformed our academy's equipment standard and connected our youth players with life-changing international tournament opportunities.",
    author: "David Ochieng",
    role: "Academy Technical Director"
  },
  {
    quote: "Their organization and hosting of our visiting international squad was seamless, professional, and delivered top-tier facilities and cultural exchange.",
    author: "Carlos Mendez",
    role: "International Tour Coordinator"
  },
  {
    quote: "A dependable and visionary partner in capacity building for our coaches and sourcing certified match footballs across our regional leagues.",
    author: "Grace Njeri",
    role: "Sports Federation Administrator"
  }
];

const METRICS = [
  { value: "50+", label: "Partner Academies & Clubs" },
  { value: "10,000+", label: "Athletes Reached" },
  { value: "25+", label: "International Exchanges" },
  { value: "100%", label: "Certified Standards" }
];

const ARTICLES = [
  { title: "Advancing Grassroots Sports in Africa Through Certified Equipment", category: "Ecosystem Development" },
  { title: "Modernizing Talent Identification with Video Analytics & Sports Tech", category: "Sports Innovation" },
  { title: "Sports Tourism as a Catalyst for Economic and Cultural Growth", category: "Sports Tourism" }
];

const FAQS = [
  {
    q: "Who does Oynamak Sports Group Ltd serve?",
    a: "We partner with sports clubs, football academies, national and regional federations, educational institutions, athletes, coaches, and corporate brands seeking sports equipment, international exchange, hosting, and strategic advisory."
  },
  {
    q: "What types of sports products and equipment do you provide?",
    a: "We source, brand, import, and distribute international-standard match footballs, training gear, professional team apparel, agility equipment, and related sporting goods engineered to meet global federations' standards."
  },
  {
    q: "How do your international exchange and hosting programs operate?",
    a: "We curate end-to-end sports tours, training camps, and invitational tournaments in Kenya and abroad. We handle logistics, venue management, fixture coordination, official accreditations, and cultural exchange for visiting and traveling delegations."
  },
  {
    q: "How does Oynamak leverage sports innovation and technology?",
    a: "We deploy cutting-edge sports tech solutions for talent identification, video-based athlete scouting, performance analytics, and digital management to help sports organizations operate efficiently and unlock athlete potential."
  }
];

export default function Home() {
  return (
    <PageContent id="home">
      <div className="flex flex-col min-h-screen">
        <PublicHeader />
        <main className="flex-1">

          {/* 1. Hero Section */}
          <section className="relative w-full h-screen">
            <EImage
              k="hero.image"
              fallbackSrc="/oaktreee.jpeg"
              alt="Sports Ecosystem Strategies and Solutions"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex items-end">
              <div className="w-full px-4 md:px-6 pb-8 sm:pb-12 lg:pb-24">
                <Card
                  className="relative max-w-xl md:max-w-2xl w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden"
                >
                  <CardContent className="p-8 md:p-10 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                      <Trophy className="h-3.5 w-3.5" />
                      <EText k="hero.eyebrow" fallback="Sports Ecosystem Strategies & Solutions" />
                    </div>
                    <EText
                      k="hero.title"
                      fallback="Oynamak Sports Group Ltd"
                      as="h1"
                      className="text-3xl md:text-5xl font-bold tracking-tight text-primary"
                    />
                    <EText
                      k="hero.body"
                      fallback="Providing innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange programs, sports tourism, and technology-driven initiatives."
                      as="p"
                      className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed"
                    />
                  </CardContent>

                  <Button
                    onClick={() => {
                      document.getElementById('core-solutions')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    size="icon"
                    className="absolute bottom-4 right-4 rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                  >
                    <ArrowUpRight className="h-6 w-6" />
                    <span className="sr-only">
                      Scroll to solutions
                    </span>
                  </Button>
                </Card>
              </div>
            </div>
          </section>

          {/* 2. Core Solutions (5 Pillars) */}
          <section id="core-solutions" className="py-12 md:py-24">
            <div className="w-full px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <EText
                  k="solutions.heading"
                  fallback="Core Objectives & Solutions"
                  as="h2"
                  className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4"
                />
                <EText
                  k="solutions.intro"
                  fallback="Comprehensive sports solutions designed to advance athletes, federations, clubs, and communities across Kenya and Africa."
                  as="p"
                  className="text-base md:text-lg text-muted-foreground"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.map((service, i) => (
                  <div key={i} className="relative h-[480px] w-full rounded-xl overflow-hidden shadow-xl group">
                    <EImage
                      k={`services.${i}.image`}
                      fallbackSrc={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors duration-300" />

                    <div className="absolute top-4 right-4 z-10">
                      <EText
                        k={`services.${i}.num`}
                        fallback={service.num}
                        className="text-5xl font-black text-white/40 tracking-tighter select-none drop-shadow-sm"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                        <CardContent className="p-6 text-left pr-16">
                          <EText
                            k={`services.${i}.title`}
                            fallback={service.title}
                            as="h3"
                            className="text-xl font-bold mb-2 text-primary"
                          />
                          <EText
                            k={`services.${i}.desc`}
                            fallback={service.desc}
                            as="p"
                            className="text-muted-foreground text-sm line-clamp-3"
                          />
                        </CardContent>
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
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Strategic Framework / How It Works */}
          <section id="how-it-works" className="py-12 md:py-24 bg-muted/50">
            <div className="w-full px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                {/* Left Side: Big Card */}
                <div className="relative h-full min-h-[550px] w-full rounded-xl overflow-hidden shadow-xl group">
                  <EImage
                    k="framework.image"
                    fallbackSrc="/advisory-oaktree.jpeg"
                    alt="Oynamak Sports Framework"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors duration-300" />

                  <EText
                    k="framework.heading"
                    fallback="Our Process: The Oynamak Sports Ecosystem Framework"
                    as="h2"
                    className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-tight max-w-[80%]"
                  />

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                    <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                      <CardContent className="p-8 md:p-10 text-left">
                        <EText
                          k="framework.body"
                          fallback="A structured, end-to-end framework connecting grassroots talent, equipment distribution, international exchange, and modern sports management across the continent."
                          as="p"
                          className="text-base md:text-lg text-muted-foreground"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Right Side: 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STEPS.map((step, i) => (
                    <div key={i} className="relative h-[270px] sm:h-[290px] w-full rounded-xl overflow-hidden shadow-xl group">
                      <EImage
                        k={`steps.${i}.image`}
                        fallbackSrc={`https://picsum.photos/seed/sportsstep${i}/600/400`}
                        alt={step.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors duration-300" />

                      <div className="absolute top-4 right-4 z-10">
                        <span className="text-4xl font-black text-white/40 tracking-tighter select-none drop-shadow-sm">
                          0{i + 1}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-3">
                        <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                          <CardContent className="p-4 text-left">
                            <EText
                              k={`steps.${i}.title`}
                              fallback={step.title}
                              as="h3"
                              className="text-lg font-bold mb-1 text-primary"
                            />
                            <EText
                              k={`steps.${i}.desc`}
                              fallback={step.desc}
                              as="p"
                              className="text-muted-foreground text-xs leading-snug"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>

          {/* 4. Who We Serve */}
          <section className="py-12 md:py-24">
            <div className="w-full px-4 md:px-6">
              <div className="relative h-full min-h-[500px] w-full rounded-xl overflow-hidden shadow-xl group">
                <EImage
                  k="serve.image"
                  fallbackSrc="/oaktree1.jpeg"
                  alt="Who We Serve"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-colors duration-300" />

                <EText
                  k="serve.heading"
                  fallback="Who We Serve"
                  as="h2"
                  className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight"
                />

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                  <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {AUDIENCES.map((audience, i) => (
                          <div key={i} className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
                            <div className="flex items-center gap-2 font-bold text-lg">
                              <audience.icon className="h-5 w-5 text-primary" />
                              <EText k={`audiences.${i}.title`} fallback={audience.title} />
                            </div>
                            <EText
                              k={`audiences.${i}.desc`}
                              fallback={audience.desc}
                              as="p"
                              className="text-sm text-muted-foreground"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Why Choose Oynamak Sports Group? */}
          <section className="py-12 md:py-24">
            <div className="w-full px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <EText
                    k="why.heading"
                    fallback="Why Choose Oynamak Sports Group?"
                    as="h2"
                    className="text-3xl md:text-4xl font-bold text-primary"
                  />
                  <EText
                    k="why.intro"
                    fallback="We are committed to building long-term value across the sports ecosystem through trust, international expertise, and practical solutions."
                    as="p"
                    className="mt-4 text-muted-foreground md:text-lg"
                  />
                  <ul className="mt-6 space-y-4">
                    {REASONS.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <EText
                            k={`reasons.${i}.title`}
                            fallback={item.title}
                            as="h4"
                            className="font-semibold"
                          />
                          <EText
                            k={`reasons.${i}.desc`}
                            fallback={item.desc}
                            as="p"
                            className="text-muted-foreground"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                  <EImage
                    k="why.image"
                    fallbackSrc="/oaktree-advisory.jpeg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    alt="Oynamak Sports Group Value Proposition"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 6. Partner Logos */}
          <section className="py-12 bg-muted/30 border-y">
            <div className="w-full px-4 md:px-6 text-center">
              <EText
                k="partners.heading"
                fallback="Trusted by Sports Federations, Academies & Global Partners"
                as="p"
                className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8"
              />
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {PARTNERS.map((partner, i) => (
                  <div key={i} className="h-12 px-6 bg-foreground/10 rounded flex items-center justify-center">
                    <EText
                      k={`partners.${i}`}
                      fallback={partner}
                      className="text-xs text-muted-foreground font-mono font-bold tracking-wider"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Partner & Client Testimonials */}
          <section className="py-12 md:py-24 bg-background">
            <div className="w-full px-4 md:px-6">
              <EText
                k="testimonials.heading"
                fallback="What Our Partners Say"
                as="h2"
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
              />
              <div className="grid md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t, i) => (
                  <Card key={i} className="bg-card shadow-lg border-none">
                    <CardContent className="p-8">
                      <div className="mb-4 text-accent">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-xl">★</span>)}
                      </div>
                      <EText
                        k={`testimonials.${i}.quote`}
                        fallback={t.quote}
                        as="p"
                        className="text-muted-foreground italic mb-6"
                        renderValue={(value) => `"${value}"`}
                      />
                      <div>
                        <EText
                          k={`testimonials.${i}.author`}
                          fallback={t.author}
                          as="p"
                          className="font-bold text-primary"
                        />
                        <EText
                          k={`testimonials.${i}.role`}
                          fallback={t.role}
                          as="p"
                          className="text-sm text-muted-foreground"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Sports Technology & Innovation Showcase */}
          <section className="py-12 md:py-24 bg-primary text-primary-foreground overflow-hidden">
            <div className="w-full px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="h-3.5 w-3.5" />
                    <EText k="tech.eyebrow" fallback="Technology & Innovation" />
                  </div>
                  <EText
                    k="tech.heading"
                    fallback="Empowering Sports with Data & Modern Tech"
                    as="h2"
                    className="text-3xl md:text-4xl font-bold mb-6"
                  />
                  <EText
                    k="tech.body"
                    fallback="Leveraging modern sports solutions, digital talent identification tools, and performance tracking to enhance athlete scouting and operational efficiency across clubs and federations."
                    as="p"
                    className="text-primary-foreground/80 text-lg mb-8"
                  />
                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/solutions/sports-innovation">
                      <EText k="tech.cta" fallback="Explore Sports Innovation" /> <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 transform md:rotate-3 md:translate-x-10 transition-transform hover:rotate-0">
                    <EImage
                      k="tech.image"
                      fallbackSrc="https://picsum.photos/seed/sportstech/800/600"
                      width={800}
                      height={600}
                      alt="Sports Innovation & Performance Management"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. Data & Impact Metrics */}
          <section className="py-12 md:py-24 bg-muted/30">
            <div className="w-full px-4 md:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {METRICS.map((metric, i) => (
                  <div key={i}>
                    <EText
                      k={`metrics.${i}.value`}
                      fallback={metric.value}
                      as="div"
                      className="text-4xl md:text-5xl font-bold text-primary mb-2"
                    />
                    <EText
                      k={`metrics.${i}.label`}
                      fallback={metric.label}
                      as="p"
                      className="text-sm uppercase tracking-wide text-muted-foreground font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. Educational Insights / Articles */}
          <section className="py-12 md:py-24">
            <div className="w-full px-4 md:px-6">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <EText
                    k="insights.heading"
                    fallback="Sports Ecosystem Insights"
                    as="h2"
                    className="text-3xl md:text-4xl font-bold text-primary mb-2"
                  />
                  <EText
                    k="insights.intro"
                    fallback="Articles, whitepapers, and strategic perspectives on African sports development."
                    as="p"
                    className="text-muted-foreground"
                  />
                </div>
                <Button variant="outline" className="hidden md:flex" asChild>
                  <Link href="/solutions">
                    <EText k="insights.cta" fallback="View All Solutions" />
                  </Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {ARTICLES.map((article, i) => (
                  <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full bg-muted overflow-hidden rounded-t-xl">
                      <EImage
                        k={`articles.${i}.image`}
                        fallbackSrc={`https://picsum.photos/seed/sportsnews${i}/600/400`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        alt="Article thumbnail"
                      />
                    </div>
                    <CardContent className="p-6">
                      <EText
                        k={`articles.${i}.category`}
                        fallback={article.category}
                        as="p"
                        className="text-xs font-semibold text-accent uppercase mb-2"
                      />
                      <EText
                        k={`articles.${i}.title`}
                        fallback={article.title}
                        as="h3"
                        className="font-bold text-lg mb-2 group-hover:text-primary transition-colors"
                      />
                      <div className="flex items-center text-sm text-primary font-medium mt-4">
                        <EText k="insights.readLabel" fallback="Read Insights" /> <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* 11. FAQ Section */}
          <section className="py-12 md:py-24 bg-muted/30">
            <div className="w-full px-4 md:px-6">
              <EText
                k="faq.heading"
                fallback="Frequently Asked Questions"
                as="h2"
                className="text-3xl md:text-4xl font-bold text-center text-primary mb-12"
              />
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {FAQS.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i + 1}`}>
                      <AccordionTrigger>
                        <EText k={`faq.${i}.q`} fallback={faq.q} />
                      </AccordionTrigger>
                      <AccordionContent>
                        <EText k={`faq.${i}.a`} fallback={faq.a} as="div" multiline />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* 12. Final CTA */}
          <section className="py-24 bg-primary text-primary-foreground text-center">
            <div className="w-full px-4 md:px-6">
              <EText
                k="cta.heading"
                fallback="Ready to Elevate Your Sports Organization?"
                as="h2"
                className="text-3xl md:text-5xl font-bold mb-6"
              />
              <EText
                k="cta.body"
                fallback="Connect with Oynamak Sports Group Ltd today to explore equipment solutions, strategic partnerships, international exchange, or tournament hosting."
                as="p"
                className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link href="/get-started">
                    <EText k="cta.primary" fallback="Partner with Us" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link href="/solutions">
                    <EText k="cta.secondary" fallback="Explore Solutions" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

        </main>

        <footer className="bg-primary text-primary-foreground">
          <div className="w-full py-6 px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Oynamak Sports Group Ltd</span>
              </Link>
              <p className="text-primary-foreground/80">
                © {new Date().getFullYear()} Oynamak Sports Group Ltd. All Rights Reserved.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="hover:underline">About</Link>
                <Link href="/solutions" className="hover:underline">Solutions</Link>
                <Link href="/events" className="hover:underline">Events</Link>
                <Link href="/contact" className="hover:underline">Contact Us</Link>
              </div>
              <p className="text-primary-foreground/80">Nairobi, Kenya • hi@oynamak.co.ke</p>
            </div>
          </div>
        </footer>
      </div>
    </PageContent>
  );
}
