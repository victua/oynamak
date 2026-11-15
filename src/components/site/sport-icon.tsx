import {
  IconBallAmericanFootball,
  IconBallBasketball,
  IconBallFootball,
  IconBallTennis,
  IconBallVolleyball,
  IconCricket,
  IconRun,
  IconSwimming,
  IconTrophy,
} from '@tabler/icons-react';

// Tabler Icons (MIT)
const map: Record<string, typeof IconTrophy> = {
  Football: IconBallFootball,
  Rugby: IconBallAmericanFootball,
  Athletics: IconRun,
  Basketball: IconBallBasketball,
  'Volleyball & Netball': IconBallVolleyball,
  Cricket: IconCricket,
  Swimming: IconSwimming,
  Tennis: IconBallTennis,
};

export function SportIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? IconTrophy;
  return <Icon className={className} stroke={1.6} aria-hidden />;
}
