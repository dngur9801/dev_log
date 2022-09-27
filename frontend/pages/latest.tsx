import { NextPage } from 'next';
import MainContentHeader from '../components/Main/MainContentHeader';
import MainContentView from '../components/Main/MainContentView';
import Seo from '../components/Seo';

const Latest: NextPage = () => {
  return (
    <>
      <Seo>Devlog</Seo>
      <MainContentHeader />
      <MainContentView />
    </>
  );
};

export default Latest;
