import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" prefetch={false} className={cn('flex items-center gap-2.5', className)} aria-label="Oynamak Sports Group home">
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill={light ? 'white' : 'hsl(219 80% 21%)'} />
        <polygon points="14,12 30,20 14,28" fill="hsl(355 72% 51%)" />
      </svg>
      <span className={cn('text-2xl font-black uppercase tracking-wider', light ? 'text-white' : 'text-primary')}>Oynamak</span>
    </Link>
  );
}
