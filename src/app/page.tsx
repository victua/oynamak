'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PublicHeader } from "@/components/public-header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import {
  CheckCircle2,
  ArrowRight,
  MountainIcon,
  ArrowUpRight,
  Users,
  BarChart,
  Shield,
  Lightbulb,
  Award,
  BookOpen,
  HelpCircle,
  MessageSquare,
  TrendingUp,
  Briefcase
} from "lucide-react";
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function Home() {
  const handleScrollToSolutions = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">

        {/* 1. Hero Section */}
        <section className="relative w-full h-screen">
          <Image
            src="/oaktreee.jpeg"
            alt="Grow Your Wealth with Confidence"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative z-10 h-full flex items-end">
            <div className="w-full px-4 md:px-6 pb-8 sm:pb-12 lg:pb-24">
              <Card
                className='relative max-w-md md:max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden'
              >
                <CardContent className="p-8 md:p-10 text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Grow Your Wealth with Confidence
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-muted-foreground">
                    Helping individuals, families, and organizations achieve financial freedom, growth, and wealth sustainability.
                  </p>
                </CardContent>

                <Button
                  onClick={() => {
                    document.getElementById('core-services')?.scrollIntoView({ behavior: 'smooth' });
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

        {/* 8. Core Services Section */}
        <section id="core-services" className="py-12 md:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Investment Services", desc: "Personalized investment strategies to grow your wealth.", link: "/solutions/investment-services", image: "/oaktreee.jpeg" },
                { title: "Real Estate Services", desc: "Expert guidance in residential and commercial property markets.", link: "/solutions/real-estate-services", image: "/oaktree-realestate.jpeg" },
                { title: "Consulting & Advisory", desc: "Strategic advice to navigate complex financial landscapes.", link: "/solutions/consulting-advisory", image: "/oaktree-advisory.jpeg" },
                { title: "Insurance & Pension", desc: "Secure your future with comprehensive insurance and pension plans.", link: "/solutions/insurance-pension", image: "/oaktree-retirement.jpeg" }
              ].map((service, i) => (
                <div key={i} className="relative h-[500px] w-full rounded-xl overflow-hidden shadow-xl group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="financial service"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />

                  <div className="absolute top-4 right-4 z-10">
                    <span className="text-6xl font-black text-white/40 tracking-tighter select-none drop-shadow-sm">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                      <CardContent className="p-6 text-left pr-16">
                        <h3 className="text-xl font-bold mb-2 text-primary">{service.title}</h3>
                        <p className="text-muted-foreground text-sm">{service.desc}</p>
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

        {/* 3. Process / How It Works */}
        <section id="how-it-works" className="py-12 md:py-24 bg-muted/50">
          <div className="w-full px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* Left Side: Big Card */}
              {/* Left Side: Big Card */}
              <div className="relative h-full min-h-[600px] w-full rounded-xl overflow-hidden shadow-xl group">
                <Image
                  src="/advisory-oaktree.jpeg"
                  alt="Oaktree Process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint="strategic planning"
                />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />

                <h2 className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-tight max-w-[80%]">
                  Our Process: The Oaktree Fedha Freedom Plan
                </h2>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                    <CardContent className="p-8 md:p-10 text-left">
                      <p className="text-base md:text-lg text-muted-foreground">
                        A structured approach to aligning financial goals with actionable plans. We guide you through every stage of your wealth journey.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Side: 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Plan", desc: "We create clear, goal-oriented financial plans.", imageId: "process-plan" },
                  { title: "Grow", desc: "Diversified investment options tailored to your risk profile.", imageId: "process-grow" },
                  { title: "Protect", desc: "Comprehensive insurance to secure your assets.", imageId: "process-protect" },
                  { title: "Consolidate", desc: "Preserve and transfer wealth for future generations.", imageId: "process-consolidate" }
                ].map((step, i) => (
                  <div key={i} className="relative h-[320px] w-full rounded-xl overflow-hidden shadow-xl group">
                    <Image
                      src={`https://picsum.photos/seed/process${i}/600/400`}
                      alt={step.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint="process step"
                    />
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />

                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-5xl font-black text-white/40 tracking-tighter select-none drop-shadow-sm">
                        0{i + 1}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-3">
                      <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                        <CardContent className="p-4 text-left pr-12">
                          <h3 className="text-lg font-bold mb-1 text-primary">{step.title}</h3>
                          <p className="text-muted-foreground text-xs leading-snug">{step.desc}</p>
                        </CardContent>
                        <Button
                          size="icon"
                          className="absolute bottom-3 right-3 rounded-full h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">Details</span>
                        </Button>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 4. Who We Serve (Moved & Redesigned) */}
        <section className="py-12 md:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="relative h-full min-h-[500px] w-full rounded-xl overflow-hidden shadow-xl group">
              <Image
                src="/oaktree1.jpeg"
                alt="Who We Serve"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                data-ai-hint="diverse clients"
              />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors duration-300" />

              <h2 className="absolute top-6 left-6 md:top-10 md:left-10 z-10 text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
                Who We Serve
              </h2>

              <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                <Card className="bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent relative overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 font-bold text-lg">
                          <Users className="h-5 w-5 text-primary" />
                          Individuals
                        </div>
                        <p className="text-sm text-muted-foreground">Personalized planning & legacy creation for households.</p>
                      </div>
                      <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 font-bold text-lg">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Corporates
                        </div>
                        <p className="text-sm text-muted-foreground">Finance advisory & employee wellness programs.</p>
                      </div>
                      <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 font-bold text-lg">
                          <Users className="h-5 w-5 text-primary" />
                          Chamas
                        </div>
                        <p className="text-sm text-muted-foreground">Collective wealth strategies for groups.</p>
                      </div>
                      <div className="flex flex-col gap-2 border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 font-bold text-lg">
                          <MountainIcon className="h-5 w-5 text-primary" />
                          Diaspora
                        </div>
                        <p className="text-sm text-muted-foreground">Investment solutions for global citizens.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Core Value Propositions */}
        <section className="py-12 md:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Choose Oaktree?</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  We are committed to building lasting relationships based on trust, transparency, and tailored expertise.
                </p>
                <ul className="mt-6 space-y-4">
                  {[
                    { title: "Holistic Approach", desc: "Integrates planning, investment, insurance, and legal services." },
                    { title: "Client-Centric", desc: "Custom solutions aligned with personal and business goals." },
                    { title: "Expert Partnerships", desc: "Collaborate with licensed advisors, law firms, and trust companies." },
                    { title: "Legacy Focus", desc: "Emphasis on generational wealth and sustainability." },
                    { title: "Corporate Wellness", desc: "Enhance employee engagement through financial education." }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block relative h-[500px] w-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/oaktree-advisory.jpeg"
                  fill
                  className="object-cover"
                  alt="Oaktree Value Proposition"
                  data-ai-hint="business meeting trust"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Social Proof Logos */}
        <section className="py-12 bg-muted/30 border-y">
          <div className="w-full px-4 md:px-6 text-center">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">Trusted by Partners & Licensing Bodies</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-32 bg-foreground/10 rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-mono">LOGO {i}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Client Testimonials */}
        <section className="py-12 md:py-24 bg-background">
          <div className="w-full px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">What Our Clients Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { quote: "Oaktree helped me clarify my retirement goals and created a plan that actually makes sense.", author: "Jane D.", role: "Private Client" },
                { quote: "Their corporate training program transformed our employees' understanding of personal finance.", author: "Michael S.", role: "HR Director" },
                { quote: "Professional, transparent, and truly dedicated to my family's legacy.", author: "Robert K.", role: "Business Owner" }
              ].map((t, i) => (
                <Card key={i} className="bg-card shadow-lg border-none">
                  <CardContent className="p-8">
                    <div className="mb-4 text-accent">
                      {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-xl">★</span>)}
                    </div>
                    <p className="text-muted-foreground italic mb-6">"{t.quote}"</p>
                    <div>
                      <p className="font-bold text-primary">{t.author}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Platform Dashboard Showcase */}
        <section className="py-12 md:py-24 bg-primary text-primary-foreground overflow-hidden">
          <div className="w-full px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Track Your Wealth in Real-Time</h2>
                <p className="text-primary-foreground/80 text-lg mb-8">
                  Access your financial portfolio, view performance reports, and communicate with your advisor through our secure client portal.
                </p>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/portal/dashboard">
                    Access Client Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 transform md:rotate-3 md:translate-x-10 transition-transform hover:rotate-0">
                  <Image
                    src="https://picsum.photos/seed/dashboard/800/600"
                    width={800}
                    height={600}
                    alt="Client Portal Dashboard"
                    className="w-full h-auto"
                    data-ai-hint="dashboard UI"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Advisor Team Introduction */}
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

        {/* 9. Service Tiers / Audience Focus */}


        {/* 10. Awards & Recognition */}
        <section className="py-12 bg-muted text-center">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-4">
                <Award className="h-12 w-12 text-accent" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Top Financial Advisor</h4>
                  <p className="text-sm text-muted-foreground">Awarded 2024</p>
                </div>
              </div>
              <div className="w-px h-12 bg-border hidden md:block"></div>
              <div className="flex items-center gap-4">
                <Shield className="h-12 w-12 text-accent" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">Excellence in Trust</h4>
                  <p className="text-sm text-muted-foreground">Ranked #1</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Data & Performance Metrics */}
        <section className="py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="w-full px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                <p className="text-sm uppercase tracking-wide opacity-80">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <p className="text-sm uppercase tracking-wide opacity-80">Clients Served</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <p className="text-sm uppercase tracking-wide opacity-80">Retention Rate</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <p className="text-sm uppercase tracking-wide opacity-80">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* 12. Educational Content / Resources */}
        <section className="py-12 md:py-24">
          <div className="w-full px-4 md:px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Financial Insights</h2>
                <p className="text-muted-foreground">Latest articles, guides, and market updates.</p>
              </div>
              <Button variant="outline" className="hidden md:flex">View all Resources</Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Understanding Market Volatility", category: "Market Update" },
                { title: "5 Steps to Retirement Readiness", category: "Planning Guide" },
                { title: "Tax Efficient Investing Strategies", category: "Wealth Management" }
              ].map((article, i) => (
                <Card key={i} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full bg-muted overflow-hidden rounded-t-xl">
                    <Image
                      src={`https://picsum.photos/seed/news${i}/600/400`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Article thumbnail"
                      data-ai-hint="financial news"
                    />
                  </div>
                  <CardContent className="p-6">
                    <p className="text-xs font-semibold text-accent uppercase mb-2">{article.category}</p>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <div className="flex items-center text-sm text-primary font-medium mt-4">
                      Read Article <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 13. FAQ Section */}
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="w-full px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Who does Oaktree FSG serve?</AccordionTrigger>
                  <AccordionContent>
                    We serve individuals, families, groups (chamas), and corporate organizations looking for holistic financial planning and wealth management solutions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the Oaktree Fedha Freedom Plan?</AccordionTrigger>
                  <AccordionContent>
                    It is our flagship structured approach to personal finance, designed to help you align your financial goals with actionable plans for saving, investing, and wealth protection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Are my investments safe?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we prioritize capital preservation. We work with licensed partners and reputable financial institutions to design and monitor diversified portfolios that manage risk effectively.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* 14. Final CTA / Consultation Offer */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="w-full px-4 md:px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Secure Your Future?</h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Let’s plan, grow, and protect your wealth—together. Schedule a consultation with our expert advisors today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/get-started">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/solutions">Explore Solutions</Link>
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
              <span className="text-lg font-bold">Oaktree</span>
            </Link>
            <p className="text-primary-foreground/80">
              © {new Date().getFullYear()} Oaktree. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex gap-4">
              <Link href="/portal/dashboard" className="hover:underline">Client Login</Link>
              <Link href="/ops/dashboard" className="hover:underline">Partner Login</Link>
              <Link href="/contact" className="hover:underline">Contact Us</Link>
            </div>
            <p className="text-primary-foreground/80">The Hub, James Gichuru Road</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
