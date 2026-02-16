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
