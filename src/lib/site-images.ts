/**
 * Single source of truth for site photography.
 *
 * Drop real sports photos into /public/images (WebP, ~1600px wide) and set the
 * path here, e.g. hero: '/images/hero.webp'. Until a photo is set, the site
 * renders a branded vector illustration instead, so no stale or off-topic
 * image ever flashes while the page loads.
 */
export const siteImages: Record<string, string | undefined> = {
  hero: '/images/hero.webp', // home hero banner (wide)
  about: '/images/about.webp', // home "About us" tall tile, and About page hero
  about2: '/images/about2.webp', // home "About us" second tall tile
  leadership: undefined, // About page leadership portraits
  events: undefined, // Events page hero and event cards
  framework: undefined, // home "Our process" block
  'sol-products-equipment': '/images/sol-products-equipment.webp',
  'sol-strategic-partnerships': '/images/sol-strategic-partnerships.webp',
  'sol-international-exchange': '/images/sol-international-exchange.webp',
  'sol-sports-tourism': undefined,
  'sol-sports-innovation': '/images/sol-sports-innovation.webp',
};
