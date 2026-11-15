import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { SportIcon } from '@/components/site/sport-icon';
import { ConsultButton } from '@/components/site/consultation';
import { Button } from '@/components/ui/button';
import { sports, solutions } from '@/lib/site-config';

export const metadata = { title: 'Sports | Oynamak Sports Group' };

export default function SportsPage() {
  return (
    <>
      <PageHero trail={[{ label: 'Sports' }]} title="Sports we back" image="about2" art="ball" alt="A young footballer lacing her boots">
        <p>Football gets the crowds. But Kenya wins in many sports, and so do we.</p>
        <p>From school fields to national stadiums, we support the games people love.</p>
      </PageHero>
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sports.map((s) => (
            <div key={s.name} className="rounded-brand bg-secondary p-6 md:p-8">
              <SportIcon name={s.name} className="h-12 w-12 text-accent" />
              <h2 className="mt-5 text-xl font-bold text-primary">{s.name}</h2>
              <p className="mt-2 text-sm text-foreground/75">{s.line}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-brand bg-primary p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Do you play something else?</h2>
          <p className="mt-2 max-w-2xl text-white/80">Tell us. We work with many more sports and will find the right way to help.</p>
          <ConsultButton className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">Book a consultation</ConsultButton>
        </div>
      </section>
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <h2 className="text-3xl font-bold text-primary md:text-5xl">How we help every sport</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {solutions.map((s) => (
            <Button key={s.slug} asChild variant="outline"><Link href={`/solutions/${s.slug}`}>{s.title} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          ))}
        </div>
      </section>
    </>
  );
}
