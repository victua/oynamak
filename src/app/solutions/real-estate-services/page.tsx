import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function RealEstateServicesPage() {
  const heroImage = getPlaceholderImage("real-estate-services-hero");

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
            Real Estate Services
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Navigating the property market with expert guidance and data-driven insights.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Your Partner in Property</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Whether you're buying, selling, or investing, our team provides comprehensive services to help you achieve your real estate ambitions. We cover both residential and commercial sectors.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Property Acquisition & Sales</h4>
                    <p className="text-muted-foreground">Expert negotiation and transaction management.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Real Estate Investment</h4>
                    <p className="text-muted-foreground">Identifying and securing high-potential investment properties.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Market Analysis</h4>
                    <p className="text-muted-foreground">Leveraging data for informed decision-making.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
               <Image src="https://picsum.photos/seed/realestate2/600/600" width={600} height={600} alt="City skyline" className="rounded-lg shadow-xl" data-ai-hint="city skyline" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
