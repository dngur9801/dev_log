import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChartLine, FaRedo } from 'react-icons/fa';
import * as S from './MainContentHeader.style';

const MainContentHeader = () => {
  const router = useRouter();

  return (
    <S.Wrap>
      <Link href="/" passHref>
        <S.Ahref pathName={router.pathname}>
          <FaChartLine /> 인기
        </S.Ahref>
      </Link>
      <Link href="/latest" passHref>
        <S.Ahref pathName={router.pathname}>
          <FaRedo /> 최신
        </S.Ahref>
      </Link>
    </S.Wrap>
  );
};

export default MainContentHeader;
