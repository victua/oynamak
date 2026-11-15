import Image from 'next/image';
import { siteImages } from '@/lib/site-images';
import type { ArtKind } from '@/lib/site-config';
import { SportsArt } from './sports-art';
import { cn } from '@/lib/utils';

type Props = {
  /** key in src/lib/site-images.ts */
  name: keyof typeof siteImages | string;
  alt: string;
  art?: ArtKind;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Renders the configured photo for `name`, or branded artwork when none is set.
 * The wrapper has a solid navy background so there is never an off-brand flash.
 */
export function SiteImage({ name, alt, art = 'ball', className, priority, sizes = '(min-width: 1024px) 50vw, 100vw' }: Props) {
  const src = siteImages[name];
  return (
    <div className={cn('relative overflow-hidden bg-primary', className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <SportsArt kind={art} className="absolute inset-0" />
      )}
    </div>
  );
}
