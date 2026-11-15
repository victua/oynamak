import Image from 'next/image';
import { PageHero } from '@/components/site/page-hero';
import { ConsultButton } from '@/components/site/consultation';

export const metadata = { title: 'Gallery | Oynamak Sports Group' };

const photos = [
  { src: '/images/hero.webp', alt: 'A coach and an athlete reviewing data at the track', span: 'md:col-span-2' },
  { src: '/images/about.webp', alt: 'A coach with a clipboard watching players train', span: '' },
  { src: '/images/about2.webp', alt: 'A young footballer lacing her boots', span: '' },
  { src: '/images/sol-sports-innovation.webp', alt: 'A team lined up on the pitch at sunset', span: 'md:col-span-2' },
  { src: '/images/sol-international-exchange.webp', alt: 'Players swapping scarves before a tour', span: '' },
  { src: '/images/sol-strategic-partnerships.webp', alt: 'Partners shaking hands at a signing', span: '' },
  { src: '/images/sol-products-equipment.webp', alt: 'Match balls, bibs and gear on a table', span: 'md:col-span-2' },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero trail={[{ label: 'Gallery' }]} title="Life at Oynamak" image="hero" art="team" alt="Oynamak gallery">
        <p>Pitches, training days, partners and players. This is sport as we see it.</p>
      </PageHero>
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="grid gap-4 md:grid-cols-4">
          {photos.map((p) => (
            <div key={p.src} className={`relative aspect-[4/3] overflow-hidden rounded-brand bg-primary ${p.span}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <ConsultButton size="lg">Book a consultation</ConsultButton>
        </div>
      </section>
    </>
  );
}
