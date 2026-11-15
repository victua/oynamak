export const siteConfig = {
  name: 'Oynamak',
  fullName: 'Oynamak Sports Group Ltd',
  tagline: 'Sports Ecosystem Strategies & Solutions',
  address: 'Nairobi, Kenya',
  hours: 'Mon - Fri, 8:00 - 17:00',
  phone: '+254 700 000 000',
  email: 'hi@oynamak.co.ke',
};

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

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

export type ArtKind = 'ball' | 'handshake' | 'globe' | 'stadium' | 'tech' | 'trophy' | 'team';

export const solutions: Solution[] = [
  {
    slug: 'products-equipment',
    num: '01',
    title: 'Sports Products & Equipment Solutions',
    short: 'Source, import, brand and distribute high-quality equipment, footballs and apparel that meet international standards.',
    objective: 'To source, import, brand, market, and distribute high-quality sports equipment, footballs, apparel, and related sporting goods that meet international standards and support the growth of sport across the country and Africa.',
    heading: 'World-Class Equipment & Apparel',
    body: 'From certified FIFA-grade match balls and academy training essentials to customized team kits and field equipment, Oynamak Sports Group provides end-to-end supply chain solutions tailored to professional clubs, schools, academies, and federations.',
    listTitle: 'Our Product Lines & Capabilities',
    items: [
      'Certified Match Footballs & Training Balls',
      'High-Performance Team Kits, Apparel & Uniforms',
      'Professional Agility, Training & Coaching Gear',
      'Goalkeeper Gloves & Protective Sporting Equipment',
      'Custom Branding & Merchandising for Clubs & Leagues',
      'Bulk Import & Regional Distribution across Africa',
    ],
    cta: 'Request Equipment Catalog',
    art: 'ball',
  },
  {
    slug: 'strategic-partnerships',
    num: '02',
    title: 'Strategic Partnerships & Ecosystem Development',
    short: 'Build lasting partnerships with clubs, academies, federations, institutions and corporate entities.',
    objective: 'To establish and strengthen strategic partnerships with local and international sports organizations, clubs, academies, federations, educational institutions, and corporate entities to foster sustainable growth within the sports ecosystem.',
    heading: 'Uniting Sports Stakeholders',
    body: 'Sustainable sports ecosystems require collaboration between grassroots practitioners, governing bodies, international clubs, and commercial partners. Oynamak Sports Group acts as a strategic bridge, creating multi-stakeholder initiatives that generate enduring sporting and commercial value.',
    listTitle: 'Partnership Focus Areas',
    items: [
      'Academy & Club Affiliation Frameworks',
      'Federation & Governing Body Collaboration',
      'Corporate Sponsorship Structuring & Activations',
      'Educational Institution Sports Development Programs',
      'International Club Scouting & Pathway Agreements',
      'Grassroots Infrastructure & Community Sports Initiatives',
    ],
    cta: 'Explore Partnership Opportunities',
    art: 'handshake',
  },
  {
    slug: 'international-exchange',
    num: '03',
    title: 'International Exchange & Capacity Building',
    short: 'Exchange programs, training and knowledge-sharing for athletes, coaches, officials and administrators.',
    objective: 'To facilitate international sports exchange programs, training opportunities, educational visits, and knowledge-sharing initiatives for athletes, coaches, technical officials, administrators, and sports professionals.',
    heading: 'Empowering Talent & Technical Leaders',
    body: 'We believe that African sporting excellence flourishes when athletes and technical staff gain direct exposure to global training methodologies, elite competitions, and international coaching accreditation. Oynamak Sports Group curates comprehensive exchange journeys that accelerate career development.',
    listTitle: 'Exchange & Training Initiatives',
    items: [
      'International Youth Academy Exchange Tours & Trials',
      'Coach Education, Certification & Technical Masterclasses',
      'Referees, Umpires & Match Officials Capacity Training',
      'Sports Management & Administrative Knowledge Sharing',
      'Elite Athlete High-Performance Immersion Camps',
      'Academic & Educational Sports Exchange Visits',
    ],
    cta: 'Join an Exchange Program',
    art: 'globe',
  },
  {
    slug: 'sports-tourism',
    num: '04',
    title: 'Sports Tourism & International Hosting',
    short: 'Host international teams, training camps, competitions and events that drive excellence and cultural exchange.',
    objective: 'To promote sports tourism by organizing and hosting international teams, training camps, competitions, and sporting events that enhance sporting excellence, cultural exchange, and economic development.',
    heading: 'World-Class Sporting Events & Hosting',
    body: 'Kenya and East Africa offer world-renowned high-altitude training grounds, beautiful climate, and vibrant cultural hospitality. Oynamak Sports Group provides full-service hosting, hospitality, facility management, and tournament orchestration for visiting international squads, national teams, and sports delegations.',
    listTitle: 'Hosting & Tourism Solutions',
    items: [
      'International Pre-Season & High-Altitude Training Camps',
      'Invitational Youth & Senior Tournaments & Showcases',
      'End-to-End Visiting Delegation Hospitality & Logistics',
      'Sports Venue & Match Protocol Management',
      'Cultural Immersion & Safari Sports Tourism Packages',
      'Economic & Tourism Impact Analysis for Host Regions',
    ],
    cta: 'Host Your Event with Us',
    art: 'stadium',
  },
  {
    slug: 'sports-innovation',
    num: '05',
    title: 'Sports Innovation & Technology Solutions',
    short: 'Technology for talent identification, athlete development, performance management and fan engagement.',
    objective: 'To leverage technology, innovation, and modern sports solutions to improve talent identification, athlete development, performance management, fan engagement, and operational efficiency within the sports sector.',
    heading: 'Modern Technology in Sport',
    body: 'The future of sports performance and talent scouting is grounded in data and modern digital tools. Oynamak Sports Group integrates state-of-the-art sports technologies to streamline club operations, track athlete biometric and match performance metrics, and enhance community fan engagement.',
    listTitle: 'Technology Solutions & Deployments',
    items: [
      'Digital Talent Identification & Video Scouting Portals',
      'Athlete Biometric, Fitness & Performance Tracking',
      'Match Analysis & Video Breakdown Software Integration',
      'Club & Academy Management Software (CMS & Operations)',
      'Fan Engagement Platforms & Digital Ticketing Solutions',
      'Sports Science, Nutrition & Recovery Modern Tech Tools',
    ],
    cta: 'Deploy Sports Tech Solutions',
    art: 'tech',
  },
];

export const events = [
  {
    title: 'International Youth Showcase & Trials',
    date: 'SEP 15',
    time: '09:00 AM - 05:00 PM',
    location: 'Nairobi Sports Arena, Kenya',
    desc: 'Elite youth scouting tournament featuring scouts from top African and European academies.',
    art: 'team' as ArtKind,
  },
  {
    title: 'Coaching Capacity & Sports Tech Clinic',
    date: 'OCT 08',
    time: '10:00 AM - 03:00 PM',
    location: 'Nairobi, Kenya',
    desc: 'Technical workshop for football coaches covering tactical periodization, video analysis, and modern training gear.',
    art: 'tech' as ArtKind,
  },
  {
    title: 'East Africa Sports Tourism Invitational',
    date: 'NOV 20',
    time: 'Multi-Day Tournament',
    location: 'Nairobi & Great Rift Valley',
    desc: 'Regional tournament combining competitive fixtures with cultural exchange and sports tourism excursions.',
    art: 'stadium' as ArtKind,
  },
];
