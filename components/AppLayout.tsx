import { FaSearch, FaSun } from 'react-icons/fa';
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
            마이페이지
          </Styled.HeaderRight>
        </Styled.Header>
      </Styled.HeaderWrap>
      {children}
    </>
  );
};
export default AppLayout;
