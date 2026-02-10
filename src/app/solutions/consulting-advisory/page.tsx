import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function ConsultingAdvisoryPage() {
  const heroImage = getPlaceholderImage("consulting-advisory-hero");

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
            Consulting & Advisory
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Strategic financial consulting to empower your business and personal growth.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Clarity Through Complexity</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our advisory services are designed to provide clear, actionable insights into complex financial matters. We partner with you to navigate challenges and seize opportunities.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Business Strategy</h4>
                    <p className="text-muted-foreground">Financial planning and strategy for sustainable business success.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Mergers & Acquisitions</h4>
                    <p className="text-muted-foreground">Expert guidance through the M&A process from valuation to integration.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Financial Restructuring</h4>
                    <p className="text-muted-foreground">Optimizing your financial structure for improved efficiency and growth.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
               <Image src="https://picsum.photos/seed/consulting2/600/600" width={600} height={600} alt="Whiteboard with charts" className="rounded-lg shadow-xl" data-ai-hint="whiteboard charts" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
