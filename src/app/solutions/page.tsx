import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { SiteImage } from '@/components/site/site-image';
import { solutions } from '@/lib/site-config';

export const metadata = { title: 'Solutions | Oynamak Sports Group' };

export default function SolutionsPage() {
  return (
    <>
      <PageHero trail={[{ label: 'Solutions' }]} title="Our solutions" image="hero" art="trophy" alt="Oynamak solutions">
        <p>Comprehensive sports solutions designed to advance athletes, federations, clubs, and communities across Kenya and Africa.</p>
        <p>Five core objectives guide everything we do, from certified equipment to technology-driven talent development.</p>
      </PageHero>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex flex-col overflow-hidden rounded-brand bg-secondary transition hover:shadow-xl">
              <SiteImage name={`sol-${s.slug}`} art={s.art} alt={s.title} className="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-sm font-bold text-accent">{s.num}</span>
                <h2 className="mt-1 text-xl font-bold text-primary">{s.title}</h2>
                <p className="mt-2 flex-1 text-sm text-foreground/75">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">Learn more <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
