import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { CheckCircle2 } from "lucide-react";

const getPlaceholderImage = (id: string): ImagePlaceholder | undefined => {
  return PlaceHolderImages.find((img) => img.id === id);
};

export default function InvestmentServicesPage() {
  const heroImage = getPlaceholderImage("investment-services-hero");

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
            Investment Services
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
            Maximizing your returns through strategic and personalized investment management.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Grow Your Wealth with Confidence</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Our investment philosophy is centered around long-term growth and risk management. We create diversified portfolios tailored to your unique financial goals, risk tolerance, and time horizon.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Portfolio Management</h4>
                    <p className="text-muted-foreground">Active management and rebalancing to optimize performance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Retirement Planning</h4>
                    <p className="text-muted-foreground">Strategies to ensure you have a comfortable and secure retirement.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Wealth Management</h4>
                    <p className="text-muted-foreground">Holistic approach to managing your assets, liabilities, and financial goals.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden md:block">
               <Image src="https://picsum.photos/seed/invest2/600/600" width={600} height={600} alt="Financial charts" className="rounded-lg shadow-xl" data-ai-hint="financial charts" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
