import { NextPage } from 'next';
import Seo from '../components/Seo';
import Settings from '../components/Setting';

const Setting: NextPage = () => {
  return (
    <>
      <Seo>설정 - Devlog</Seo>
      <Settings></Settings>
    </>
  );
};

export default Setting;
