'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BarChart, Users, CheckCircle2, Shield, Handshake, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function AboutPage() {
  const heroImage = getPlaceholderImage("about-us-hero");

  const handleScrollToMission = () => {
    document.getElementById('our-mission')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative w-full h-screen">
          {heroImage && (
          <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
          />
          )}
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 h-full flex items-end">
            <div className="container px-4 md:px-6 w-full pb-8 sm:pb-12 lg:pb-24">
              <Card
                className='relative max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-xl rounded-bl-xl rounded-br-none shadow-2xl border-transparent overflow-hidden'
              >
                <CardContent className="p-8 md:p-10 text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                      About Oaktree FSG
                  </h1>
                  <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                      A holistic financial services group dedicated to helping you achieve financial freedom, growth, and generational wealth sustainability.
                  </p>
                </CardContent>
                <Button
                  onClick={handleScrollToMission}
                  size="icon"
                  className="absolute bottom-4 right-4 rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                >
                  <ArrowUpRight className="h-6 w-6" />
                  <span className="sr-only">
                    Scroll to mission
                  </span>
                </Button>
              </Card>
            </div>
          </div>
      </section>

      <section className="py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
              <div className="grid gap-16">
                  <div id="our-mission" className="text-center max-w-3xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Mission</h2>
                      <p className="mt-4 text-muted-foreground md:text-lg">
                          To empower clients to <strong>plan, grow, protect, and consolidate</strong> their wealth through personalized strategies, trusted partnerships, and innovative financial solutions—ensuring a legacy for future generations.
                      </p>
                  </div>

                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Core Services</h2>
                      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
                          <AccordionItem value="item-1">
                              <AccordionTrigger className="text-xl font-semibold">A. Wealth Planning</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground text-base pt-2">
                                  <p className="mb-4">We help clients create clear, goal-oriented financial plans for:</p>
                                  <ul className="space-y-2 list-disc pl-5 mb-4">
                                      <li>Home ownership</li>
                                      <li>Children’s education</li>
                                      <li>Retirement planning</li>
                                      <li>Estate and succession planning</li>
                                  </ul>
                                  <p><strong>Flagship Offering:</strong> <em>Oaktree Fedha Freedom Plan</em> – A structured approach to aligning financial goals with actionable plans.</p>
                              </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                              <AccordionTrigger className="text-xl font-semibold">B. Investment Management</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground text-base pt-2">
                                   <p className="mb-4">We offer diversified investment options tailored to client risk profiles and objectives:</p>
                                  <ul className="space-y-2 list-disc pl-5 mb-4">
                                      <li>Stocks</li>
                                      <li>Unit Trust Funds (Money Market Funds)</li>
                                      <li>Wealth Funds</li>
                                      <li>Fixed Income Securities (Treasury Bills & Bonds)</li>
                                      <li>Structured Notes</li>
                                      <li>Alternative Investments</li>
                                      <li>Portfolio Management Services</li>
                                      <li>Real Estate Sales & Letting</li>
                                  </ul>
                                  <p className="italic text-sm">All investments carry risk; we work with licensed partners to design and monitor portfolios.</p>
                              </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                              <AccordionTrigger className="text-xl font-semibold">C. Wealth Consolidation & Succession</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground text-base pt-2">
                                  <p className="mb-4">We partner with legal, trust, and corporate finance experts to help clients preserve and transfer wealth:</p>
                                  <ul className="space-y-2 list-disc pl-5">
                                      <li>Succession Planning</li>
                                      <li>Corporate Finance & Advisory</li>
                                      <li>Capital Raising (Debt/Equity Placements)</li>
                                      <li>Business Valuation</li>
                                      <li>Mergers & Acquisitions</li>
                                      <li>Corporate Training on Financial Solutions</li>
                                  </ul>
                              </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-4">
                              <AccordionTrigger className="text-xl font-semibold">D. Corporate Training Solutions</AccordionTrigger>
                              <AccordionContent className="text-muted-foreground text-base pt-2">
                                  <p className="mb-4">We address <strong>employee financial stress</strong> through customized financial literacy programs, improving well-being and productivity.</p>
                                  <h5 className="font-semibold mb-2">Topics include:</h5>
                                  <ul className="space-y-2 list-disc pl-5 mb-4">
                                      <li>Personal Financial Planning</li>
                                      <li>Investment Planning</li>
                                      <li>Retirement & Pension Planning</li>
                                      <li>Sales Training</li>
                                  </ul>
                                   <p className="italic text-sm">Programs are tailored to organizational needs.</p>
                              </AccordionContent>
                          </AccordionItem>
                      </Accordion>
                  </div>

                   <div className="bg-muted py-12 md:py-16 rounded-lg">
                      <div className="container px-4 md:px-6">
                          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">Why Choose Oaktree FSG?</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                              <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mt-1">
                                      <BarChart className="h-6 w-6" />
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-lg mb-1">Holistic Approach</h4>
                                      <p className="text-muted-foreground text-sm">Integrates planning, investment, insurance, and legal services.</p>
                                  </div>
                              </div>
                               <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mt-1">
                                      <Users className="h-6 w-6" />
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-lg mb-1">Client-Centric</h4>
                                      <p className="text-muted-foreground text-sm">Custom solutions aligned with personal and business goals.</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mt-1">
                                      <Handshake className="h-6 w-6" />
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-lg mb-1">Expert Partnerships</h4>
                                      <p className="text-muted-foreground text-sm">Collaborate with licensed advisors, law firms, and trust companies.</p>
                                  </div>
                              </div>
                              <div className="flex items-start gap-4">
                                   <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mt-1">
                                      <Shield className="h-6 w-6" />
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-lg mb-1">Legacy Focus</h4>
                                      <p className="text-muted-foreground text-sm">Emphasis on generational wealth and sustainability.</p>
                                  </div>
                              </div>
                               <div className="flex items-start gap-4">
                                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mt-1">
                                      <CheckCircle2 className="h-6 w-6" />
                                  </div>
                                  <div>
                                      <h4 className="font-semibold text-lg mb-1">Corporate Wellness</h4>
                                      <p className="text-muted-foreground text-sm">Enhance employee engagement through financial education.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="text-center max-w-3xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Vision</h2>
                      <p className="mt-4 text-muted-foreground md:text-lg">
                          To be the trusted partner for individuals and organizations seeking <strong>enduring financial health and legacy creation</strong>—inspired by the resilience and growth of the oak tree.
                      </p>
                  </div>
              </div>
          </div>
      </section>
    </>
  );
}
