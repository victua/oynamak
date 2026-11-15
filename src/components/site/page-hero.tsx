import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ArtKind } from '@/lib/site-config';
import { SiteImage } from './site-image';
import { LogoMark } from './logo';

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
      <Link href="/" aria-label="Home"><Home className="h-4 w-4 text-primary" /></Link>
      {trail.map((t) => (
        <span key={t.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {t.href ? <Link href={t.href} className="hover:text-primary">{t.label}</Link> : <span className="text-foreground">{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl font-bold tracking-tight text-primary md:text-5xl ${className}`}>{children}</h2>;
}

/** Page intro: breadcrumb, heading and copy on the left, rounded-corner image on the right. */
export function PageHero({
  trail,
  title,
  children,
  image,
  art,
  alt,
}: {
  trail: { label: string; href?: string }[];
  title: string;
  children: ReactNode;
  image: string;
  art: ArtKind;
  alt: string;
}) {
  return (
    <section className="bg-pattern-light pb-16 pt-6 md:pb-24">
     <div className="mx-auto w-[96%]">
      <Breadcrumb trail={trail} />
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-6xl">{title}</h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85 md:text-lg">{children}</div>
        </div>
        <SiteImage name={image} art={art} alt={alt} priority className="aspect-[4/3] rounded-brand shadow-xl" />
      </div>
     </div>
    </section>
  );
}

/** Pale-blue card with a check icon, matching the reference "advantages" cards. */
export function InfoCard({ title, children, icon }: { title: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-brand bg-secondary bg-pattern-light p-6 md:p-8">
      <LogoMark className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-auto opacity-[0.06]" />
      <div className="flex items-start gap-4">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-primary/60 text-primary">
          {icon ?? <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12.5l4.5 4.5L19 7" /></svg>}
        </span>
        <div>
          <h3 className="text-lg font-bold text-primary md:text-xl">{title}</h3>
          <div className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base">{children}</div>
        </div>
      </div>
    </div>
  );
}
