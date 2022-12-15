import { AxiosError } from 'axios';
import { ReactNode } from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import MainContentHeader from '../components/Main/MainContentHeader';
import Seo from '../components/Seo';
import { postAPI } from '../api';
import MainContent from '../components/Main/MainContent';
import { POPULAR_LISTS } from '../constant/queryKey';
import { PostTypes } from '../interfaces';
import Alert from '../components/Common/CustomAlert';

const Home = () => {
  const { data, error, status } = useQuery<PostTypes[], AxiosError<ReactNode>>(POPULAR_LISTS, postAPI.popular, {
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(POPULAR_LISTS, postAPI.popular);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
