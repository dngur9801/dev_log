import { NextPage } from 'next';
import MypageContent from '../../components/Mypage/MypageContent';
import MypageHeader from '../../components/Mypage/MypageHeader';
import Seo from '../../components/Seo';

const Mypage: NextPage = () => {
  return (
    <>
      <Seo>마이페이지 - Devlog</Seo>
      <MypageHeader />
      <MypageContent />
    </>
  );
};

export default Mypage;
