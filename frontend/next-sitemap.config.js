/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_CLIENT_ADDRESS,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/server-sitemap.xml`],
  },
};
