import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHero, InfoCard, SectionTitle } from '@/components/site/page-hero';
import { SiteImage } from '@/components/site/site-image';
import { Button } from '@/components/ui/button';
import { solutions } from '@/lib/site-config';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  return { title: s ? `${s.title} | Oynamak Sports Group` : 'Solutions' };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = solutions.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero
        trail={[{ label: 'Solutions', href: '/solutions' }, { label: s.title }]}
        title={s.title}
        image={`sol-${s.slug}`}
        art={s.art}
        alt={s.title}
      >
        <p className="font-semibold text-primary">{s.objective}</p>
        <p>{s.body}</p>
        <Button size="lg" asChild className="mt-2 h-12 px-8">
          <Link href={`/get-started?service=${encodeURIComponent(s.title)}`}>
            {s.cta} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <SectionTitle>{s.listTitle}</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {s.items.map((item) => (
            <InfoCard key={item} title={item}>
              <span className="sr-only">{s.heading}</span>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-[96%]">
          <SectionTitle>More solutions</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/solutions/${o.slug}`} className="group overflow-hidden rounded-brand bg-secondary transition hover:shadow-xl">
                <SiteImage name={`sol-${o.slug}`} art={o.art} alt={o.title} className="aspect-[16/10]" />
                <h3 className="p-5 text-lg font-bold text-primary group-hover:text-accent">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
