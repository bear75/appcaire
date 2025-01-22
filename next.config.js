/** @type {import('next').NextConfig} */

const nextConfig = {
  // Disable type checking and ESLint only in development or preview deployments
  typescript: {
    // Ignore errors in development and preview, but not in production
    ignoreBuildErrors: process.env.VERCEL_ENV !== 'production',
  },
  eslint: {
    // Ignore errors in development and preview, but not in production
    ignoreDuringBuilds: process.env.VERCEL_ENV !== 'production',
  },
  // ... rest of your config
};

module.exports = nextConfig;
