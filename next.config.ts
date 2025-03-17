import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lifetimew.com'
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { vertx: false };
    return config;
  }
};

export default nextConfig;
