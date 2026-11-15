import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ArtKind } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { SiteImage } from './site-image';
import { LogoMark } from './logo';

/** Full-bleed image card with the text on top of the picture. */
export function ImageCard({
  href,
  image,
  art,
  alt,
  badge,
  title,
  children,
  className,
}: {
  href?: string;
  image: string;
  art: ArtKind;
  alt: string;
  badge?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  const body = (
    <>
      <SiteImage name={image} art={art} alt={alt} className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(219,80%,10%)] via-[hsl(219,80%,12%)]/60 to-transparent" />
      {badge && <span className="absolute left-5 top-5 rounded-md bg-accent px-3 py-1 text-xs font-bold text-white md:left-7 md:top-7">{badge}</span>}
      <LogoMark light className="absolute right-5 top-5 h-9 w-auto opacity-90 md:right-7 md:top-7 md:h-11" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
        <h3 className="text-xl font-bold leading-tight md:text-2xl">{title}</h3>
        {children && <div className="mt-2 text-sm leading-relaxed text-white/85">{children}</div>}
        {href && (
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:text-accent">
            Find out more <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </>
  );
  const cls = cn('group relative block aspect-[4/5] overflow-hidden rounded-brand bg-primary shadow-sm transition hover:shadow-xl', className);
  return href ? <Link href={href} className={cls}>{body}</Link> : <article className={cls}>{body}</article>;
}
