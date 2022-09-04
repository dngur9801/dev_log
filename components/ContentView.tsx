import * as S from '../styles/ContentView.style.';
import Contents from './Contents';

const ContentView = () => {
  return (
    <S.Container>
      <S.ContentWrap>
        <Contents />
      </S.ContentWrap>
    </S.Container>
  );
};

export default ContentView;
