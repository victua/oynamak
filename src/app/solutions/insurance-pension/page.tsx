import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function InsurancePensionPage() {
  const heroImage = getPlaceholderImage("insurance-pension-hero");

  return (
    <>
      <section className="relative w-full h-[40vh] flex items-center justify-center text-center">
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
        <div className="relative z-10 container px-4 md:px-6 text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Insurance & Pension
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Protecting your assets and securing your retirement with tailored plans.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Secure Your Tomorrow, Today</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                We provide a comprehensive range of insurance and pension solutions to protect you, your family, and your assets against unforeseen events and to ensure a financially secure retirement.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Life & Health Insurance</h4>
                    <p className="text-muted-foreground">Comprehensive coverage for peace of mind.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Pension Planning</h4>
                    <p className="text-muted-foreground">Building a robust pension pot for your retirement years.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Asset Protection</h4>
                    <p className="text-muted-foreground">Safeguarding your wealth against risks and liabilities.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
               <Image src="https://picsum.photos/seed/insurance2/600/600" width={600} height={600} alt="Family walking in a park" className="rounded-lg shadow-xl" data-ai-hint="family park" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
