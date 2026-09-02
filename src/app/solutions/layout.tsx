import { PublicHeader } from "@/components/public-header";
import { MountainIcon } from "lucide-react";
import Link from "next/link";

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-1">{children}</main>
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
  );
}
