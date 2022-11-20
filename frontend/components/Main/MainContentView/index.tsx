import * as S from './MainContentView.style.';
import MainContent from '../MainContent';
import { postAPI } from '../../../api';
import { useQuery } from 'react-query';

const MainContentView = () => {
  const { data, error, status } = useQuery('lists', postAPI.posts);
  if (status === 'error') {
    return <span>Error: {(error as any).message}</span>;
  }

  return (
    <S.Container>
      <S.ContentWrap>
        <MainContent data={data?.data} />
      </S.ContentWrap>
    </S.Container>
  );
};

export default MainContentView;
