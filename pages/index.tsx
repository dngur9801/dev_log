import type { NextPage } from 'next';
import Head from 'next/head';
import ContentHeader from '../components/ContentHeader';
import ContentView from '../components/ContentView';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Devlog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentHeader />
      <ContentView />
    </>
  );
};

export default Home;
