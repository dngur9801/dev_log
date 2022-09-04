import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from '../styles/ContentHeader.style';

const ContentHeader = () => {
  const router = useRouter();

  return (
    <S.Wrap>
      <Link href="/" passHref>
        <S.Ahref pathName={router.pathname}>인기</S.Ahref>
      </Link>
      <Link href="/latest" passHref>
        <S.Ahref pathName={router.pathname}>최신</S.Ahref>
      </Link>
    </S.Wrap>
  );
};

export default ContentHeader;
