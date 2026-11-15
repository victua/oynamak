import {
  IconBallFootball,
  IconDeviceWatch,
  IconShirtSport,
  IconSoccerField,
  IconTrophy,
  IconHeartHandshake,
  IconWorld,
} from '@tabler/icons-react';
import type { ArtKind } from '@/lib/site-config';
import { cn } from '@/lib/utils';

// Tabler Icons (MIT): https://tabler.io/icons
const icons = {
  ball: IconBallFootball,
  handshake: IconHeartHandshake,
  globe: IconWorld,
  stadium: IconSoccerField,
  tech: IconDeviceWatch,
  trophy: IconTrophy,
  team: IconShirtSport,
} as const;

/** Branded vector illustration used wherever a real photo has not been supplied. */
export function SportsArt({ kind = 'ball', className }: { kind?: ArtKind; className?: string }) {
  const Icon = icons[kind] ?? IconBallFootball;
  return (
    <div
      aria-hidden
      className={cn(
        'relative h-full w-full overflow-hidden bg-gradient-to-br from-[hsl(219,80%,14%)] via-primary to-[hsl(214,75%,32%)]',
        className
      )}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {/* pitch markings */}
        <g fill="none" stroke="white" strokeWidth="2">
          <rect x="20" y="20" width="360" height="260" rx="6" />
          <line x1="200" y1="20" x2="200" y2="280" />
          <circle cx="200" cy="150" r="46" />
          <rect x="20" y="95" width="62" height="110" />
          <rect x="318" y="95" width="62" height="110" />
        </g>
      </svg>
      <svg className="absolute -right-10 -top-10 h-64 w-64 opacity-25" viewBox="0 0 100 100">
        <polygon points="50,3 93,27 93,73 50,97 7,73 7,27" fill="none" stroke="white" strokeWidth="1.5" />
        <polygon points="50,22 77,37 77,63 50,78 23,63 23,37" fill="hsl(355 72% 51% / 0.55)" />
      </svg>
      <div className="absolute inset-0 bg-hex" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur-sm sm:p-8">
          <Icon className="h-12 w-12 text-white sm:h-16 sm:w-16" strokeWidth={1.4} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1.5 w-1/3 bg-accent" />
    </div>
  );
}
