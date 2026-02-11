/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    // Intégration WebAR via proxy en dev
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/ar-app/:path*',
          destination: 'http://localhost:8080/:path*',
        },
      ];
    }
    return [];
  },
  async headers() {
    return [
      {
        source: '/ar-app/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'camera=(self)',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
