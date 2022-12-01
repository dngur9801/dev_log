import { AxiosError } from 'axios';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { postAPI } from '../api';
import MainContent from '../components/Main/MainContent';
import MainContentHeader from '../components/Main/MainContentHeader';
import Seo from '../components/Seo';
import { LATEST_LISTS } from '../constant/queryKey';
import { ResponsePostsTypes } from '../interfaces';

const Latest: NextPage = () => {
  const { data, error, status } = useQuery<ResponsePostsTypes, AxiosError<ReactNode>>(LATEST_LISTS, postAPI.latest);

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

export default Latest;
