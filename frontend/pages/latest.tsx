import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { NextSeo } from 'next-seo';
import { postAPI } from '../apis';
import MainContent from '../components/Main/MainContent';
import MainContentHeader from '../components/Main/MainContentHeader';
import { LATEST_LISTS } from '../constant/queryKey';
import { PostTypes } from '../interfaces';

const Latest: NextPage = () => {
  const { data } = useQuery<PostTypes[], AxiosError<ReactNode>>(LATEST_LISTS, postAPI.latest, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <NextSeo
        title="home"
        description="개발자들을 위한 마크다운 블로그 서비스"
        canonical="https://devlog.shop/latest"
        openGraph={{
          url: 'https://devlog.shop/latest',
        }}
      />
      <MainContentHeader />
      <MainContent data={data} />
    </>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(LATEST_LISTS, postAPI.latest);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Latest;
