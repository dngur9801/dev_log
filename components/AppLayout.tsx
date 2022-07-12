import { FaSearch, FaSun, FaListUl } from 'react-icons/fa';
import Image from 'next/image';
import * as Styled from '../styles/AppLayout.style';

type Props = {
  children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Styled.HeaderWrap>
        <Styled.Header>
          <div>Devlog</div>
          <div>dngur9801.log</div>
          <Styled.HeaderRight>
            <FaSun size="24px" cursor="pointer" />
            <FaSearch size="24px" cursor="pointer" />
            <Styled.WriteBtn>새 글 작성</Styled.WriteBtn>
            <Styled.MyPageWrap>
              <Image src="/image/default_profile_img.png" alt="profile_img" width={50} height={50} />
              <FaListUl size="24px" />
            </Styled.MyPageWrap>
          </Styled.HeaderRight>
        </Styled.Header>
      </Styled.HeaderWrap>
      {children}
    </>
  );
};
export default AppLayout;
