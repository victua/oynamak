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
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Retired pages from the previous site, sent to their closest sports equivalent.
    return [
      { source: '/solutions/investment-services', destination: '/solutions/products-equipment', permanent: true },
      { source: '/solutions/real-estate-services', destination: '/solutions/sports-tourism', permanent: true },
      { source: '/solutions/consulting-advisory', destination: '/solutions/strategic-partnerships', permanent: true },
      { source: '/solutions/insurance-pension', destination: '/solutions/sports-innovation', permanent: true },
    ];
  },
  output: "standalone",
};

export default nextConfig;
