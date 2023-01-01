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
  const { data, error, status } = useQuery<PostTypes[], AxiosError<ReactNode>>(LATEST_LISTS, postAPI.latest, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <NextSeo
        title="home"
        description="home description"
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
  await queryClient.prefetchQuery(LATEST_LISTS, postAPI.latest);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Latest;
