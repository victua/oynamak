import { PageHero, InfoCard, SectionTitle } from '@/components/site/page-hero';
import { ImageCard } from '@/components/site/image-card';
import { ConsultButton } from '@/components/site/consultation';
import { solutions } from '@/lib/site-config';

export const metadata = { title: 'About | Oynamak Sports Group' };

const leadership = [
  { name: 'Caroline Kariuki', role: 'Director' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero trail={[{ label: 'About' }]} title="About Oynamak" image="about" art="team" alt="A coach with a clipboard watching players train">
        <p>Oynamak Sports Group is a Kenyan sports company. We help clubs, academies, athletes and brands get the kit, the training, the trips and the tools they need to grow.</p>
        <p>Kenya has talent everywhere. Too often it goes unseen. We are here to change that, by linking grassroots sport with world-class standards.</p>
      </PageHero>

      <section className="mx-auto grid w-[96%] gap-6 pb-16 md:grid-cols-2 md:pb-24">
        <div className="rounded-brand bg-primary p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold">Our mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">To give every athlete, coach and community in Kenya and Africa a fair shot at greatness, through quality kit, strong partnerships, global exchange, sports tourism and smart technology.</p>
        </div>
        <div className="rounded-brand bg-secondary p-8 md:p-12">
          <h2 className="text-2xl font-bold text-primary">Our vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">To be Africa&apos;s most trusted sports company and the first call for anyone who wants to grow sport on the continent.</p>
        </div>
      </section>

      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <SectionTitle>What we do</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <InfoCard key={s.slug} title={`${s.num}. ${s.title}`}>{s.short}</InfoCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-[96%]">
          <SectionTitle>Leadership</SectionTitle>
          <div className="mt-10 grid gap-6 sm:max-w-sm">
            {leadership.map((m, i) => (
              <ImageCard key={m.name} image={`leader-${i + 1}`} art="team" alt={m.name} title={m.name} className="aspect-[4/5]">
                {m.role}
              </ImageCard>
            ))}
          </div>
          <ConsultButton className="mt-10 h-12 px-8">Book a consultation</ConsultButton>
        </div>
      </section>
    </>
  );
}
