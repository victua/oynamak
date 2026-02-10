'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PublicHeader } from "@/components/public-header";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { CheckCircle2, ArrowRight, MountainIcon, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { cn } from '@/lib/utils';

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function Home() {
  const [isCardExpanded, setIsCardExpanded] = useState(true);
  const heroImage = getPlaceholderImage("hero-background");
  const investmentImage = getPlaceholderImage("investment-services");
  const realEstateImage = getPlaceholderImage("real-estate-services");
  const consultingImage = getPlaceholderImage("consulting-advisory");
  const insuranceImage = getPlaceholderImage("insurance-pension");

  const services = [
    {
      title: "Investment Services",
      description: "Personalized investment strategies to grow your wealth.",
      image: investmentImage,
      link: "/solutions/investment-services",
    },
    {
      title: "Real Estate Services",
      description: "Expert guidance in residential and commercial property markets.",
      image: realEstateImage,
      link: "/solutions/real-estate-services",
    },
    {
      title: "Consulting & Advisory",
      description: "Strategic advice to navigate complex financial landscapes.",
      image: consultingImage,
      link: "/solutions/consulting-advisory",
    },
    {
      title: "Insurance & Pension",
      description: "Secure your future with comprehensive insurance and pension plans.",
      image: insuranceImage,
      link: "/solutions/insurance-pension",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative z-10 h-full p-8 sm:p-12 lg:p-24 flex items-end justify-end">
            <Card
              className={cn(
                'relative max-w-md md:max-w-lg w-full bg-card/90 backdrop-blur-sm rounded-t-2xl shadow-2xl border-transparent overflow-hidden transition-all duration-500 ease-in-out',
                isCardExpanded ? 'max-h-[500px]' : 'max-h-24'
              )}
            >
              <div
                className={cn(
                  'transition-opacity duration-300 ease-in-out',
                  isCardExpanded
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                )}
              >
                <CardContent className="p-8 md:p-10 text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
                    Building Your Financial Future, Together.
                  </h1>
                  <Button
                    size="lg"
                    asChild
                    className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="/contact">
                      Book a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </div>

              <Button
                onClick={() => setIsCardExpanded(!isCardExpanded)}
                size="icon"
                className="absolute bottom-4 right-4 rounded-full h-14 w-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                aria-expanded={isCardExpanded}
              >
                {isCardExpanded ? (
                  <ArrowDownLeft className="h-6 w-6" />
                ) : (
                  <ArrowUpRight className="h-6 w-6" />
                )}
                <span className="sr-only">
                  {isCardExpanded ? 'Collapse card' : 'Expand card'}
                </span>
              </Button>
            </Card>
          </div>
        </section>

        <section id="solutions" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Intelligent solutions for a<br /> future-ready foundation</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {services.map((service) => (
                <div key={service.title}>
                  <div className="overflow-hidden rounded-2xl mb-6">
                    {service.image && (
                      <Image
                        src={service.image.imageUrl}
                        alt={service.image.description}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
                        data-ai-hint={service.image.imageHint}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 min-h-[4rem]">{service.description}</p>
                  
                  <Button variant="outline" asChild className="rounded-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors font-semibold">
                    <Link href={service.link}>
                      View services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">Why Choose Oaktree Edge?</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  We are committed to building lasting relationships based on trust, transparency, and tailored expertise. Your success is our singular focus.
                </p>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Personalized Strategy</h4>
                      <p className="text-muted-foreground">We don't believe in one-size-fits-all. Your financial plan is as unique as you are.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Proven Expertise</h4>
                      <p className="text-muted-foreground">Our team of seasoned professionals brings decades of experience across all financial sectors.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Unwavering Commitment</h4>
                      <p className="text-muted-foreground">We are fiduciaries, legally and ethically bound to act in your best interest. Always.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="hidden md:block">
                 <Image src="https://picsum.photos/seed/6/600/600" width={600} height={600} alt="Team discussion" className="rounded-lg shadow-xl" data-ai-hint="team business" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground">
        <div className="container py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-bold">Oaktree Edge</span>
              </Link>
              <p className="text-sm text-primary-foreground/80">
                © {new Date().getFullYear()} Oaktree Edge. All Rights Reserved.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/solutions/investment-services" className="hover:underline text-primary-foreground/80">Investment Services</Link></li>
                <li><Link href="/solutions/real-estate-services" className="hover:underline text-primary-foreground/80">Real Estate Services</Link></li>
                <li><Link href="/solutions/consulting-advisory" className="hover:underline text-primary-foreground/80">Consulting & Advisory</Link></li>
                <li><Link href="/solutions/insurance-pension" className="hover:underline text-primary-foreground/80">Insurance & Pension</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:underline text-primary-foreground/80">About Us</Link></li>
                <li><Link href="/events" className="hover:underline text-primary-foreground/80">Events</Link></li>
                <li><Link href="/contact" className="hover:underline text-primary-foreground/80">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-sm text-primary-foreground/80">123 Finance St, Capital City, 12345</p>
              <p className="text-sm text-primary-foreground/80">contact@oaktree-edge.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
