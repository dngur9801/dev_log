import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { NextSeo } from 'next-seo';
import React, { ReactNode } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { postAPI } from '../apis';
import MainContent from '../components/Main/MainContent';
import MainContentHeader from '../components/Main/MainContentHeader';
import { LIKED_LISTS } from '../constant/queryKey';
import { PostTypes } from '../interfaces';

const liked = () => {
  const { data } = useQuery<PostTypes[], AxiosError<ReactNode>>(LIKED_LISTS, postAPI.liked, {
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <NextSeo
        title="home"
        description="개발자들을 위한 마크다운 블로그 서비스"
        canonical="https://devlog.shop/"
        openGraph={{
          url: 'https://devlog.shop/',
        }}
      />
      <MainContentHeader />
      <MainContent data={data} />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  axios.defaults.headers.Cookie = '';
  const connectCookie = context.req ? context.req.headers.cookie : null;
  if (context.req && connectCookie) {
    axios.defaults.headers.Cookie = connectCookie;
  }
  const posts = await postAPI.liked();
  if (!posts) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(LIKED_LISTS, postAPI.liked);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default liked;
