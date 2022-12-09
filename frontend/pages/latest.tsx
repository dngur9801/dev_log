import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { postAPI } from '../api';
import MainContent from '../components/Main/MainContent';
import MainContentHeader from '../components/Main/MainContentHeader';
import Seo from '../components/Seo';
import { LATEST_LISTS } from '../constant/queryKey';
import { PostTypes } from '../interfaces';

const Latest: NextPage = () => {
  const { data, error, status } = useQuery<PostTypes[], AxiosError<ReactNode>>(LATEST_LISTS, postAPI.latest, {
    refetchOnWindowFocus: false,
  });

  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  return (
    <>
      <Seo>Devlog</Seo>
      <MainContentHeader />
      <MainContent data={data} />
    </>
  );
};

export const getServerSideProps = async () => {
  console.log('getServerSideProps start');
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(LATEST_LISTS, postAPI.popular);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Latest;
