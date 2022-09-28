import * as S from './MainContentView.style.';
import MainContent from '../MainContent';

const MainContentView = () => {
  return (
    <S.Container>
      <S.ContentWrap>
        <MainContent />
      </S.ContentWrap>
    </S.Container>
  );
};

export default MainContentView;
