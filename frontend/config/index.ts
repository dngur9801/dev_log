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
  titleTemplate: '%s',
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
    {
      name: 'naver-site-verification',
      content: '02859dbeebe8b61676e6b1c929cab7db7edaa535',
    },
    {
      name: 'google-site-verification',
      content: 'vtm76vnjCcUjmjxcS3CRY45',
    },
  ],
  openGraph: {
    type: 'website',
    site_name: 'Devlog',
    images: [{ url: 'https://devlog.shop/noimg.png' }],
  },
};
