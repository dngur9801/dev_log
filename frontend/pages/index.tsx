import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import MainContentHeader from '../components/Main/MainContentHeader';
import { NextSeo } from 'next-seo';
import { postAPI } from '../apis';
import MainContent from '../components/Main/MainContent';
import { POPULAR_LISTS } from '../constant/queryKey';
import { PostTypes } from '../interfaces';

const Home = () => {
  const { data } = useQuery<PostTypes[], AxiosError<ReactNode>>(POPULAR_LISTS, postAPI.popular, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <NextSeo
        title="Devlog"
        description="개발자들을 위한 마크다운 블로그 서비스"
        canonical="https://devlog.shop"
        openGraph={{
          url: 'https://devlog.shop',
        }}
      />
      <MainContentHeader />
      <MainContent data={data} />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(POPULAR_LISTS, postAPI.popular);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
