export const siteConfig = {
  name: 'Oynamak',
  fullName: 'Oynamak Sports Group Ltd',
  tagline: 'Built for greatness. Made to win.',
  address: 'Nairobi, Kenya',
  hours: 'Mon - Fri, 8:00 - 17:00',
  phone: '+254 700 000 000',
  email: 'hi@oynamak.co.ke',
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Sports', href: '/sports' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export type ArtKind = 'ball' | 'handshake' | 'globe' | 'stadium' | 'tech' | 'trophy' | 'team';

export type Solution = {
  slug: string;
  num: string;
  title: string;
  short: string;
  objective: string;
  heading: string;
  body: string;
  listTitle: string;
  items: string[];
  cta: string;
  art: ArtKind;
};

export const solutions: Solution[] = [
  {
    slug: 'talent-development',
    num: '01',
    title: 'Talent Scouting & Academies',
    short: 'We find young talent, build strong academies and give players a clear path up.',
    objective: 'Kenya has talent on every pitch. We help find it, grow it and get it seen.',
    heading: 'Find it. Grow it. Get it seen.',
    body: 'We run trials, support academies and connect promising players with coaches and clubs. Young athletes get the coaching, the games and the exposure to move to the next level.',
    listTitle: 'What we do',
    items: [
      'Talent trials and open days',
      'Academy set-up and coaching support',
      'Player profiles and match video',
      'Links with clubs, colleges and scouts',
      'Scholarship and school sport programmes',
      'Support for girls and women in sport',
    ],
    cta: 'Talk to us about talent',
    art: 'team',
  },
  {
    slug: 'products-equipment',
    num: '02',
    title: 'Sports Kit & Equipment',
    short: 'Match balls, team kits and training gear that meet world standards, delivered to your club or school.',
    objective: 'We bring in and supply quality sports gear so every team in Kenya and Africa can train and play properly.',
    heading: 'Gear that matches the game',
    body: 'From match balls to full team kits, we handle the sourcing, branding and delivery. Clubs, schools, academies and federations get gear that lasts and looks sharp on match day.',
    listTitle: 'What we supply',
    items: [
      'Match balls and training balls',
      'Team kits, jerseys and tracksuits',
      'Cones, bibs, agility and coaching gear',
      'Goalkeeper gloves and protective wear',
      'Custom branding for clubs and leagues',
      'Bulk orders delivered across Africa',
    ],
    cta: 'Ask for our catalogue',
    art: 'ball',
  },
  {
    slug: 'strategic-partnerships',
    num: '03',
    title: 'Partnerships & Growth',
    short: 'We connect clubs, academies, federations, schools and brands so sport grows for everyone.',
    objective: 'Sport grows faster when people work together. We bring the right partners to the same table.',
    heading: 'Stronger together',
    body: 'We link grassroots teams with bigger clubs, governing bodies and sponsors. The result is better pathways for players and real value for every partner.',
    listTitle: 'How we help',
    items: [
      'Academy and club partnerships',
      'Work with federations and governing bodies',
      'Sponsorship deals that work for both sides',
      'School and college sports programmes',
      'Scouting links with clubs abroad',
      'Community pitches and grassroots projects',
    ],
    cta: 'Become a partner',
    art: 'handshake',
  },
  {
    slug: 'international-exchange',
    num: '04',
    title: 'Exchange & Training Programmes',
    short: 'Trips, camps and courses that give athletes, coaches and officials a chance to learn from the best.',
    objective: 'Talent grows when it sees the world. We organise trips and training that open doors.',
    heading: 'Learn from the best, bring it home',
    body: 'Our exchange programmes send Kenyan players, coaches and officials abroad, and welcome visitors here. Everyone comes back with new skills, new contacts and bigger dreams.',
    listTitle: 'What is on offer',
    items: [
      'Youth academy tours and trials',
      'Coaching courses and licences',
      'Referee and match official training',
      'Sports management skills for administrators',
      'High-performance camps for top athletes',
      'School and college exchange visits',
    ],
    cta: 'Join a programme',
    art: 'globe',
  },
  {
    slug: 'sports-tourism',
    num: '05',
    title: 'Sports Tourism & Hosting',
    short: 'We host teams, camps and tournaments in Kenya, from high-altitude training to match days and safaris.',
    objective: 'Kenya is a home of champions. We bring teams here to train, compete and enjoy the country.',
    heading: 'Train where champions are made',
    body: 'High altitude, great weather and warm Kenyan hospitality make this the perfect place to train. We take care of travel, hotels, pitches and match days, so visiting teams can just focus on the game.',
    listTitle: 'What we organise',
    items: [
      'High-altitude pre-season camps',
      'Youth and senior tournaments',
      'Hotels, food and local transport for teams',
      'Venues, referees and match-day set-up',
      'Safari and culture trips for visiting squads',
      'Reports on the value events bring to host towns',
    ],
    cta: 'Host your team or event',
    art: 'stadium',
  },
  {
    slug: 'sports-innovation',
    num: '06',
    title: 'Sports Tech & Data',
    short: 'Video, performance data and club software that help you find talent and train smarter.',
    objective: 'Good data helps coaches make better calls and helps talent get seen. We bring the tools.',
    heading: 'Train smarter, get seen sooner',
    body: 'We set up simple tools that track fitness, review match video and manage your club. Coaches spot what to fix. Scouts spot who to sign. Fans stay closer to the game.',
    listTitle: 'What we set up',
    items: [
      'Video scouting and talent profiles',
      'Fitness and performance tracking',
      'Match video analysis',
      'Club and academy management software',
      'Fan apps and digital ticketing',
      'Recovery, nutrition and sports science tools',
    ],
    cta: 'Get started with sports tech',
    art: 'tech',
  },
];

export const sports = [
  { name: 'Football', line: 'Academies, clubs, kit and tournaments.' },
  { name: 'Rugby', line: 'Sevens and fifteens, from schools to clubs.' },
  { name: 'Athletics', line: 'Track, field and road, home of Kenyan greats.' },
  { name: 'Basketball', line: 'Leagues, camps and youth development.' },
  { name: 'Volleyball & Netball', line: 'Kit, coaching and competitions.' },
  { name: 'Cricket', line: 'Gear, coaching and exchange tours.' },
  { name: 'Swimming', line: 'Coaching, galas and training camps.' },
  { name: 'Tennis', line: 'Coaching, courts and junior programmes.' },
];

export const pathway = [
  { title: 'Spot', desc: 'We find talent at schools, academies and community pitches.' },
  { title: 'Train', desc: 'Coaching, fitness and data to sharpen every player.' },
  { title: 'Equip', desc: 'Proper kit and gear so players can perform.' },
  { title: 'Travel', desc: 'Camps, trials and exchange trips at home and abroad.' },
  { title: 'Compete', desc: 'Tournaments and clubs where talent gets noticed.' },
];
