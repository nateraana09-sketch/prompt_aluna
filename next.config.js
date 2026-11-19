/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true
      },
      {
        source: '/aprender.html',
        destination: '/aprender',
        permanent: true
      },
      {
        source: '/apoyo.html',
        destination: '/apoyo',
        permanent: true
      },
      {
        source: '/acerca.html',
        destination: '/acerca',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
