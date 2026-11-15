import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Briefcase, Globe, Trophy, Users } from 'lucide-react';
import { SiteImage } from '@/components/site/site-image';
import { InfoCard, SectionTitle } from '@/components/site/page-hero';
import { ConsultButton } from '@/components/site/consultation';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { siteConfig, solutions } from '@/lib/site-config';

const audiences = [
  { icon: Trophy, title: 'Clubs & Academies', desc: 'Certified equipment supply, talent scouting tech, and exchange tours.' },
  { icon: Globe, title: 'Federations & Bodies', desc: 'Strategic ecosystem development, tournament hosting, and capacity building.' },
  { icon: Users, title: 'Athletes & Coaches', desc: 'International training opportunities, accreditation, and career pathways.' },
  { icon: Briefcase, title: 'Corporate Partners', desc: 'Sports sponsorship activations, sports tourism, and tournament branding.' },
];

const advantages = [
  { title: 'Ecosystem-Wide Approach', desc: 'Connecting products, partnerships, training, hosting, and sports technology under one roof.' },
  { title: 'International Standards', desc: 'Supplying certified match-grade equipment, balls, and apparel that meet global benchmarks.' },
  { title: 'Global Network & Partnerships', desc: 'Direct relationships with international sports clubs, federations, and tournament organizers.' },
  { title: 'Innovation & Technology Focus', desc: 'Data analytics, digital talent scouting, and modern sports management systems.' },
];

const process = [
  { title: 'Assess & Strategize', desc: 'Analyzing ecosystem needs, equipment requirements, and talent pathways.' },
  { title: 'Partner & Source', desc: 'Establishing global partnerships and sourcing certified high-standard sports goods.' },
  { title: 'Execute & Host', desc: 'Delivering exchange tours, training camps, and tournament hosting.' },
  { title: 'Innovate & Scale', desc: 'Deploying sports technology, analytics, and sustainable development.' },
];

const testimonials = [
  { quote: "Oynamak Sports Group transformed our academy's equipment standard and connected our youth players with life-changing international tournament opportunities.", author: 'David Ochieng', role: 'Academy Technical Director' },
  { quote: 'Their organization and hosting of our visiting international squad was seamless, professional, and delivered top-tier facilities and cultural exchange.', author: 'Carlos Mendez', role: 'International Tour Coordinator' },
  { quote: 'A dependable and visionary partner in capacity building for our coaches and sourcing certified match footballs across our regional leagues.', author: 'Grace Njeri', role: 'Sports Federation Administrator' },
];

const faqs = [
  { q: 'Who does Oynamak Sports Group Ltd serve?', a: 'We partner with sports clubs, football academies, national and regional federations, educational institutions, athletes, coaches, and corporate brands seeking sports equipment, international exchange, hosting, and strategic advisory.' },
  { q: 'What types of sports products and equipment do you provide?', a: "We source, brand, import, and distribute international-standard match footballs, training gear, professional team apparel, agility equipment, and related sporting goods engineered to meet global federations' standards." },
  { q: 'How do your international exchange and hosting programs operate?', a: 'We curate end-to-end sports tours, training camps, and invitational tournaments in Kenya and abroad. We handle logistics, venue management, fixture coordination, official accreditations, and cultural exchange.' },
  { q: 'How does Oynamak use sports innovation and technology?', a: 'We deploy sports tech for talent identification, video-based scouting, performance analytics, and digital management so organizations operate efficiently and unlock athlete potential.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto w-[96%] pb-10 pt-10 md:pt-16">
          <h1 className="text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-primary sm:text-6xl lg:text-8xl">
            Sports Ecosystem
            <span className="block text-accent">Oynamak</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/85 md:text-lg">
            {siteConfig.fullName} provides innovative strategies and practical solutions that strengthen the sports ecosystem through quality sports products, strategic partnerships, international exchange, sports tourism, and technology.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ConsultButton size="lg" className="h-12 px-8">Book a consultation</ConsultButton>
            <Button size="lg" variant="outline" asChild className="h-12 border-primary px-8 text-primary">
              <Link href="/solutions">Explore solutions <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <SiteImage name="hero" art="team" alt="Oynamak sports team" priority sizes="100vw" className="mt-12 aspect-[16/7] rounded-brand shadow-2xl" />
        </div>
      </section>

      {/* About */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle>About us</SectionTitle>
            <p className="mt-6 text-base leading-relaxed text-foreground/85 md:text-lg">
              {siteConfig.fullName} is a sports enterprise bridging grassroots potential with international standards. We empower organizations, athletes, federations and corporate partners to thrive across an interconnected global sports landscape.
            </p>
            <Button asChild variant="link" className="mt-4 px-0 text-accent">
              <Link href="/about">Read more <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SiteImage name="about" art="trophy" alt="Trophy" className="mt-8 aspect-[3/4] rounded-brand-sm" />
            <SiteImage name="about2" art="ball" alt="Football" className="mb-8 aspect-[3/4] rounded-brand-sm" />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-[96%]">
          <SectionTitle>Our solutions</SectionTitle>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group flex flex-col overflow-hidden rounded-brand bg-secondary transition hover:shadow-xl">
                <SiteImage name={`sol-${s.slug}`} art={s.art} alt={s.title} className="aspect-[16/10] rounded-b-none" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-sm font-bold text-accent">{s.num}</span>
                  <h3 className="mt-1 text-xl font-bold text-primary">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-foreground/75">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <SectionTitle>Why choose us</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {advantages.map((a) => (
            <InfoCard key={a.title} title={a.title}>{a.desc}</InfoCard>
          ))}
        </div>
      </section>

      {/* Process, feature block */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="grid overflow-hidden rounded-brand bg-secondary lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Our process</h2>
            <p className="mt-4 text-foreground/85">A structured, end-to-end framework connecting grassroots talent, equipment distribution, international exchange, and modern sports management.</p>
            <ol className="mt-8 space-y-5">
              {process.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-primary">{p.title}</h3>
                    <p className="text-sm text-foreground/75">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ConsultButton className="mt-8 h-12 px-8">Book a consultation</ConsultButton>
          </div>
          <SiteImage name="framework" art="stadium" alt="Sports framework" className="min-h-[320px] rounded-none" />
        </div>
      </section>

      {/* Audience */}
      <section className="bg-primary py-16 text-white md:py-24">
        <div className="mx-auto w-[96%]">
          <h2 className="text-3xl font-bold md:text-5xl">Who we serve</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-brand bg-white/10 p-6 md:p-8 ring-1 ring-white/15">
                <Icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-white/80">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <SectionTitle>Testimonials</SectionTitle>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author} className="rounded-brand bg-secondary p-6 md:p-8">
              <div className="flex items-center justify-between">
                <figcaption className="font-bold text-primary">{t.author}</figcaption>
                <span className="text-accent" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/85">“{t.quote}”</blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionTitle className="text-center">Questions</SectionTitle>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="rounded-brand-btn border-0 bg-secondary px-6 data-[state=open]:rounded-brand">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <div className="rounded-brand bg-gradient-to-br from-[hsl(219,80%,14%)] to-primary p-10 text-center text-white md:p-16">
          <h2 className="text-3xl font-bold md:text-5xl">Ready to elevate your sports organization?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">Talk to us about equipment, partnerships, international exchange or tournament hosting.</p>
          <ConsultButton size="lg" className="mt-8 h-12 bg-accent px-10 text-accent-foreground hover:bg-accent/90">Book a consultation</ConsultButton>
        </div>
      </section>
    </>
  );
}
