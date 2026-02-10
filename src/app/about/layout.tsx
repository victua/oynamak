import { PublicHeader } from "@/components/public-header";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">{children}</main>
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
              <p className="text-xs text-primary-foreground/60 mt-4">
                  Disclaimer: All investments involve risk, including possible loss of principal. Services provided in partnership with licensed professionals where applicable.
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
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-primary-foreground/80">
                  Let’s plan, grow, and protect your wealth—together.
              </p>
              <p className="text-sm text-primary-foreground/80 mt-2">123 Finance St, Capital City, 12345</p>
              <p className="text-sm text-primary-foreground/80">contact@oaktree-edge.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
