import type { NextPage } from 'next';
import { useQuery } from 'react-query';
import MainContentHeader from '../components/Main/MainContentHeader';
import Seo from '../components/Seo';
import { postAPI } from '../api';
import MainContent from '../components/Main/MainContent';
import { POPULAR_LISTS } from '../constant/queryKey';
import { ResponsePostsTypes } from '../interfaces';
import { AxiosError } from 'axios';
import { ReactNode } from 'react';

const Home: NextPage = () => {
  const { data, error, status } = useQuery<ResponsePostsTypes, AxiosError<ReactNode>>(POPULAR_LISTS, postAPI.popular);
  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  return (
    <>
      <Seo>Devlog</Seo>
      <MainContentHeader />
      <MainContent data={data?.data} />
    </>
  );
};
export default Home;
