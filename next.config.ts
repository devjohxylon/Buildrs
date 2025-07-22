import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "upgrade-insecure-requests; default-src 'self' https://buildrs-production.up.railway.app; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://buildrs-production.up.railway.app; form-action 'self'; frame-ancestors 'none'; base-uri 'self'"
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-site'
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp'
  }
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript errors during builds
  },
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com'],
  },
  // Force HTTPS
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'buildrs.net',
          },
        ],
        destination: 'https://www.buildrs.net/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  // Optimize for production
  experimental: {
    optimizeCss: true,
  },
  // Better error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
})(nextConfig);
