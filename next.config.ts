import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: "standalone",
  // firebase-admin relies on Node internals and must not be bundled or
  // traced by the compiler — without this, `next build` fails collecting
  // page data for /api/session.
  serverExternalPackages: ['firebase-admin'],
  async redirects() {
    // Paths from the previous financial-services site. These were client-side
    // redirects (a blank page plus a JS hop), which crawlers see as an empty
    // document — so old inbound links and search results bled ranking. As
    // config redirects they answer 308 before any HTML is sent.
    return [
      { source: '/solutions/investment-services', destination: '/solutions/products-equipment', permanent: true },
      { source: '/solutions/real-estate-services', destination: '/solutions/sports-tourism', permanent: true },
      { source: '/solutions/consulting-advisory', destination: '/solutions/strategic-partnerships', permanent: true },
      { source: '/solutions/insurance-pension', destination: '/solutions/sports-innovation', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Firebase's signInWithPopup talks to the popup it opened (polling
        // window.closed, then closing it). Chrome's default cross-origin
        // isolation blocks those calls and logs COOP warnings, which is why
        // Google sign-in was noisy in the console. `same-origin-allow-popups`
        // keeps this document isolated from other origins while still
        // permitting that handshake.
        source: '/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
        ],
      },
    ];
  },
};

export default nextConfig;
