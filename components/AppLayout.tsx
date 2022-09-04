import { FaSearch, FaSun, FaListUl } from 'react-icons/fa';
import Image from 'next/image';
import * as S from '../styles/AppLayout.style';

type Props = {
  children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <S.HeaderWrap>
        <S.Header>
          <div className="blog_name">Devlog</div>
          <S.MyTitle>dngur9801.log</S.MyTitle>
          <S.HeaderRight>
            <FaSun size="24px" cursor="pointer" />
            <FaSearch size="24px" cursor="pointer" />
            <S.WriteBtn>새 글 작성</S.WriteBtn>
            <S.MyPageWrap>
              <Image src="/image/default_profile_img.png" alt="profile_img" width={50} height={50} />
              <FaListUl size="24px" />
            </S.MyPageWrap>
          </S.HeaderRight>
        </S.Header>
      </S.HeaderWrap>
      {children}
    </>
  );
};
export default AppLayout;
