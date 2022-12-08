import type { GetServerSidePropsContext } from 'next';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import MainContentHeader from '../components/Main/MainContentHeader';
import Seo from '../components/Seo';
import { postAPI, userAPI } from '../api';
import MainContent from '../components/Main/MainContent';
import { POPULAR_LISTS, USER_INFO } from '../constant/queryKey';
import { ResponsePostsTypes } from '../interfaces';
import axios, { AxiosError } from 'axios';
import { ReactNode } from 'react';
import LayoutHeader from '../components/LayoutHeader';

const Home = () => {
  const { data, error, status } = useQuery<ResponsePostsTypes, AxiosError<ReactNode>>(POPULAR_LISTS, postAPI.popular, {
    refetchOnWindowFocus: false,
  });
  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }
  return (
    <>
      <Seo>Devlog</Seo>
      <LayoutHeader />
      <MainContentHeader />
      <MainContent data={data?.data} />
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log('getServerSideProps START');
  const queryClient = new QueryClient();
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  console.log('axios.defaults.headers.Cookie :', axios.defaults.headers.Cookie);
  await queryClient.prefetchQuery(USER_INFO, userAPI.info);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
