import { NextSeo } from 'next-seo';
import React from 'react';
import MainContent from '../components/Main/MainContent';
import MainContentHeader from '../components/Main/MainContentHeader';

const liked = () => {
  return (
    <>
      <NextSeo
        title="home"
        description="개발자들을 위한 마크다운 블로그 서비스"
        canonical="https://devlog.shop/liked"
        openGraph={{
          url: 'https://devlog.shop/liked',
        }}
      />
      <MainContentHeader />
    </>
  );
};

export default liked;
