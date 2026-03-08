/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations for Vercel
  trailingSlash: true,
  images: {
    domains: [
      'images.unsplash.com',
      'images.pexels.com',
      'via.placeholder.com'
    ],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_CURRENCY_SYMBOL: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '֏',
  },

  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Security headers for Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
