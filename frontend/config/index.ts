export function apiAddress() {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_ADDRESS;
}

export function defaultProfileImage() {
  return '/image/profile.png';
}

export function defaultTitleImage() {
  return '/image/noimg.png';
}

export const seoConfig = {
  titleTemplate: '%s | Devlog',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: '/manifest',
      href: '/manifest.json',
    },
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#FFFFFF',
    },
  ],
  openGraph: {
    type: 'website',
    site_name: 'Devlog',
    images: [{ url: 'https://devlog.shop/noimg.png' }],
  },
};
