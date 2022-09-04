import type { NextPage } from 'next';
import Head from 'next/head';
import ContentContainer from '../container/ContentContainer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Devlog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer></ContentContainer>
    </>
  );
};

export default Home;
