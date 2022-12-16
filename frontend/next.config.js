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
};

module.exports = nextConfig;
