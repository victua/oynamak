import { PageHero, InfoCard, SectionTitle } from '@/components/site/page-hero';
import { SiteImage } from '@/components/site/site-image';
import { ConsultButton } from '@/components/site/consultation';
import { solutions } from '@/lib/site-config';

export const metadata = { title: 'About | Oynamak Sports Group' };

const leadership = [
  { name: 'Executive Leadership', role: 'Managing Director' },
  { name: 'Strategic Partnerships', role: 'Ecosystem Development Lead' },
  { name: 'Operations & Logistics', role: 'International Exchange Coordinator' },
  { name: 'Sports Technology', role: 'Innovation & Performance Analyst' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero trail={[{ label: 'About' }]} title="About Oynamak Sports Group" image="about" art="team" alt="Oynamak Sports Group">
        <p>Oynamak Sports Group Ltd is a sports enterprise dedicated to providing innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange programs, sports tourism, and technology-driven initiatives.</p>
        <p>By bridging grassroots potential with international standards, we empower sports organizations, athletes, federations, and corporate entities to thrive sustainably in an interconnected global sports landscape.</p>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-6 md:pb-24">
        <div className="rounded-brand bg-primary p-8 text-white md:p-12">
          <h2 className="text-2xl font-bold">Our mission</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">To empower sports organizations, athletes, coaches, and communities by delivering world-class sports products, forging strategic ecosystem partnerships, facilitating international exchange, promoting sports tourism, and driving sports technological innovation.</p>
        </div>
        <div className="rounded-brand bg-secondary p-8 md:p-12">
          <h2 className="text-2xl font-bold text-primary">Our vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">To be Africa&apos;s leading sports enterprise and premier catalyst for global sporting excellence, sustainable ecosystem development, and athlete empowerment across the continent.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 md:pb-24">
        <SectionTitle>Our core objectives</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <InfoCard key={s.slug} title={`${s.num}. ${s.title}`}>{s.short}</InfoCard>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionTitle>Leadership &amp; advisory</SectionTitle>
          <p className="mt-4 max-w-2xl text-foreground/80">Experience across sports governance, international hosting, equipment procurement, and athletic development.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((m) => (
              <div key={m.name} className="overflow-hidden rounded-brand bg-secondary">
                <SiteImage name="leadership" art="team" alt={m.name} className="aspect-[4/5]" />
                <div className="p-5">
                  <h3 className="font-bold text-primary">{m.name}</h3>
                  <p className="text-sm text-foreground/70">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
          <ConsultButton className="mt-10 h-12 px-8">Book a consultation</ConsultButton>
        </div>
      </section>
    </>
  );
}
