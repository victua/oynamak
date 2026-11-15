import { Calendar, MapPin } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { SiteImage } from '@/components/site/site-image';
import { ConsultButton } from '@/components/site/consultation';
import { events } from '@/lib/site-config';

export const metadata = { title: 'Events | Oynamak Sports Group' };

export default function EventsPage() {
  return (
    <>
      <PageHero trail={[{ label: 'Events' }]} title="Tournaments & workshops" image="events" art="stadium" alt="Oynamak events">
        <p>Discover international training camps, capacity-building sessions, and sporting showcases.</p>
        <p>Participate in world-class showcases, coaching clinics, and international exchange camps.</p>
      </PageHero>
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid w-[96%] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((e) => (
            <article key={e.title} className="flex flex-col overflow-hidden rounded-brand bg-secondary">
              <div className="relative">
                <SiteImage name="events" art={e.art} alt={e.title} className="aspect-[16/10]" />
                <span className="absolute right-4 top-4 rounded-lg bg-accent px-3 py-1 text-sm font-bold text-white shadow">{e.date}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="text-xl font-bold text-primary">{e.title}</h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-foreground/75"><Calendar className="h-4 w-4 text-primary" />{e.time}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-foreground/75"><MapPin className="h-4 w-4 text-primary" />{e.location}</p>
                <p className="mt-3 flex-1 text-sm text-foreground/75">{e.desc}</p>
                <ConsultButton className="mt-5 h-11">Register interest</ConsultButton>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
