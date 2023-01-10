/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { reactRoot: true },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'localhost',
      'lh3.googleusercontent.com',
      'localhost',
      'ssl.pstatic.net',
      'localhost',
    ],
  },
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'production'
            ? `${process.env.NEXT_PUBLIC_API_ADDRESS}/:path*`
            : 'http://localhost:5000/:path*',

        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
