import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/** Shield-and-athlete mark only. */
export function LogoMark({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? '/images/logo-mark-white.png' : '/images/logo-mark.png'}
      alt="Oynamak"
      width={520}
      height={550}
      className={cn('h-12 w-auto', className)}
    />
  );
}

/** Horizontal lockup: mark plus wordmark. Set `stacked` for the full lockup with "Sports Group". */
export function Logo({ light = false, className, stacked = false, priority = false }: { light?: boolean; className?: string; stacked?: boolean; priority?: boolean }) {
  if (stacked) {
    return (
      <Link href="/" prefetch={false} className={cn('inline-block', className)} aria-label="Oynamak Sports Group home">
        <Image src={light ? '/images/logo-white.png' : '/images/logo.png'} alt="Oynamak Sports Group" width={1200} height={483} priority={priority} className="h-auto w-56 md:w-72" />
      </Link>
    );
  }
  return (
    <Link href="/" prefetch={false} className={cn('flex items-center gap-3', className)} aria-label="Oynamak Sports Group home">
      <Image src={light ? '/images/logo-white.png' : '/images/logo.png'} alt="Oynamak Sports Group" width={1200} height={483} priority={priority} className="h-11 w-auto md:h-14" />
    </Link>
  );
}
