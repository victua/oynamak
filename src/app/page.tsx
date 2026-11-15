import Link from 'next/link';
import { ArrowRight, Briefcase, Globe, Trophy, Users } from 'lucide-react';
import { SiteImage } from '@/components/site/site-image';
import { InfoCard, SectionTitle } from '@/components/site/page-hero';
import { ConsultButton } from '@/components/site/consultation';
import { ProfileButton } from '@/components/site/profile-download';
import { ImageCard } from '@/components/site/image-card';
import { SportIcon } from '@/components/site/sport-icon';
import { LogoMark } from '@/components/site/logo';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pathway, siteConfig, solutions, sports } from '@/lib/site-config';

const audiences = [
  { icon: Trophy, title: 'Clubs & academies', desc: 'Kit, training, scouting tools and trips abroad.' },
  { icon: Globe, title: 'Federations', desc: 'Partnerships, courses and skills for your officials.' },
  { icon: Users, title: 'Athletes & coaches', desc: 'Courses, camps and a clear path to the next level.' },
  { icon: Briefcase, title: 'Brands & sponsors', desc: 'Sponsorship that reaches real fans and real communities.' },
];

const advantages = [
  { title: 'One team for everything', desc: 'Kit, partnerships, travel, camps and tech, all under one roof.' },
  { title: 'World-class standards', desc: 'Gear and programmes that meet international rules and quality.' },
  { title: 'Rooted in Kenya', desc: 'We know the pitches, the people and the talent, and we know how to get things done here.' },
  { title: 'A wide network', desc: 'Direct links with clubs, federations and organisers in Africa and beyond.' },
];

const promises = [
  { title: 'Straight talk', desc: 'Clear plans, clear prices and no jargon.' },
  { title: 'We show up', desc: 'On time, on the ground and on your side of the touchline.' },
  { title: 'Players first', desc: 'Every decision starts with what is best for the athlete.' },
  { title: 'Built to last', desc: 'We aim for results that are still there next season.' },
];

const faqs = [
  { q: 'Who do you work with?', a: 'Clubs, academies, schools, federations, athletes, coaches and brands that want to be part of sport in Kenya and across Africa.' },
  { q: 'What kind of kit can you supply?', a: 'Match balls, training balls, team kits, tracksuits, bibs, cones, goalkeeper gloves and more. We can also add your club badge and colours.' },
  { q: 'How do your camps and tours work?', a: 'We plan the whole trip: travel, hotels, food, pitches, match days and local transport. You bring the team, we handle the rest.' },
  { q: 'Do you only work with football?', a: 'No. We support football, rugby, athletics, basketball, volleyball, netball, cricket, swimming and tennis, and we are happy to talk about other sports too.' },
  { q: 'How do I get started?', a: 'Tap "Book a consultation", leave your name and number, and we will call you back within 24 hours.' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-pattern-light"><div className="mx-auto w-[96%] pb-10 pt-10 md:pt-16">
        <p className="mb-4 inline-block rounded-brand-btn bg-secondary px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-primary">
          {siteConfig.fullName}
        </p>
        <h1 className="text-5xl font-extrabold uppercase leading-[1.02] tracking-tight text-primary sm:text-6xl lg:text-8xl">
          Built for greatness.
          <span className="block text-accent">Made to win.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/85 md:text-xl">
          We help clubs, academies and athletes get the kit, the training and the chances they need to win, in Kenya and beyond.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ConsultButton size="lg">Book a consultation</ConsultButton>
          <Button size="lg" variant="outline" asChild>
            <Link href="/solutions">What we do <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <SiteImage name="hero" art="team" alt="A coach and an athlete reviewing performance data at a track" priority sizes="96vw" className="mt-12 aspect-[16/8] rounded-brand shadow-2xl" />
      </div>
      </section>

      {/* About */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle>Who we are</SectionTitle>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">
              Oynamak is a sports company built in Kenya. We turn raw talent into real chances by bringing together the gear, the coaching, the trips and the technology that sport needs.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/85">
              Whether you run a school team, a club, a federation or a brand, we help you do more with sport.
            </p>
            <Button asChild variant="link" className="mt-4 px-0 text-accent">
              <Link href="/about">More about us <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SiteImage name="about" art="trophy" alt="A coach with a clipboard watching players train" className="mt-8 aspect-[3/4] rounded-brand-sm" />
            <SiteImage name="about2" art="ball" alt="A young footballer lacing her boots" className="mb-8 aspect-[3/4] rounded-brand-sm" />
          </div>
        </div>
      </section>

      {/* Sports */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle>Sports we back</SectionTitle>
          <Button asChild variant="outline"><Link href="/sports">See all sports <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {sports.map((s) => (
            <div key={s.name} className="rounded-brand bg-secondary p-6">
              <SportIcon name={s.name} className="h-9 w-9 text-accent" />
              <h3 className="mt-4 text-lg font-bold text-primary">{s.name}</h3>
              <p className="mt-1 text-sm text-foreground/75">{s.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <SectionTitle>What we do</SectionTitle>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <ImageCard key={s.slug} href={`/solutions/${s.slug}`} image={`sol-${s.slug}`} art={s.art} alt={s.title} badge={s.num} title={s.title}>
              {s.short}
            </ImageCard>
          ))}
        </div>
      </section>

      {/* Pathway */}
      <section className="bg-primary bg-pattern-dark py-16 text-white md:py-24">
        <div className="mx-auto w-[96%]">
          <h2 className="text-3xl font-bold md:text-5xl">From the pitch to the podium</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/80">Every athlete needs a path. This is ours.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {pathway.map((p, i) => (
              <li key={p.title} className="rounded-brand-sm bg-white/10 p-6 ring-1 ring-white/15">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg font-extrabold">{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-white/80">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <SectionTitle>Why Oynamak</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {advantages.map((a) => (
            <InfoCard key={a.title} title={a.title}>{a.desc}</InfoCard>
          ))}
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <div className="rounded-brand bg-secondary p-8 md:p-12">
          <h2 className="text-3xl font-bold text-primary md:text-5xl">Who we work with</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-brand-sm bg-white p-6">
                <Icon className="h-7 w-7 text-accent" />
                <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm text-foreground/75">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="mx-auto w-[96%] pb-16 md:pb-24">
        <SectionTitle>Our promise</SectionTitle>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {promises.map((p) => (
            <InfoCard key={p.title} title={p.title}>{p.desc}</InfoCard>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary bg-pattern-light py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle className="text-center">Quick questions</SectionTitle>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="rounded-brand-btn border-0 bg-white px-6">
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-[96%] py-16 md:py-24">
        <div className="relative overflow-hidden rounded-brand bg-primary bg-pattern-dark p-10 text-center text-white md:p-16">
          <LogoMark light className="pointer-events-none absolute -right-8 -top-6 h-72 w-auto opacity-10" />
          <h2 className="relative text-3xl font-bold md:text-5xl">Ready to take your game further?</h2>
          <p className="relative mx-auto mt-4 max-w-2xl text-lg text-white/80">Tell us what you need. We will call you back within 24 hours.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <ConsultButton size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">Book a consultation</ConsultButton>
            <ProfileButton size="lg" variant="outline" className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white">Download our profile</ProfileButton>
          </div>
        </div>
      </section>
    </>
  );
}
