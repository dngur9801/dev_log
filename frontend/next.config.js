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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `http://localhost:5000/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
