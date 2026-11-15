import { PageHero } from '@/components/site/page-hero';
import { ImageCard } from '@/components/site/image-card';
import { solutions } from '@/lib/site-config';

export const metadata = { title: 'Solutions | Oynamak Sports Group' };

export default function SolutionsPage() {
  return (
    <>
      <PageHero trail={[{ label: 'Solutions' }]} title="What we do" image="hero" art="trophy" alt="Oynamak solutions">
        <p>Six services, one goal: help sport in Kenya and Africa grow.</p>
        <p>Pick what you need, or talk to us and we will put a plan together for you.</p>
      </PageHero>
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <ImageCard key={s.slug} href={`/solutions/${s.slug}`} image={`sol-${s.slug}`} art={s.art} alt={s.title} badge={s.num} title={s.title}>
              {s.short}
            </ImageCard>
          ))}
        </div>
      </section>
    </>
  );
}
