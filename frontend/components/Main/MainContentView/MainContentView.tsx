import * as S from './MainContentView.style.';
import Contents from '../MainContent';

const MainContentView = () => {
  return (
    <S.Container>
      <S.ContentWrap>
        <Contents />
      </S.ContentWrap>
    </S.Container>
  );
};

export default MainContentView;
