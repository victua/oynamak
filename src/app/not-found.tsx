import Link from 'next/link';
import { LogoMark } from '@/components/site/logo';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="mx-auto flex w-[96%] max-w-xl flex-col items-center py-24 text-center">
      <LogoMark className="h-28 w-auto" />
      <h1 className="mt-8 text-5xl font-extrabold text-primary">Off the pitch</h1>
      <p className="mt-3 text-lg text-foreground/80">We could not find that page. Let&apos;s get you back in the game.</p>
      <Button asChild size="lg" className="mt-8"><Link href="/">Back to home</Link></Button>
    </section>
  );
}
