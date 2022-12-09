import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { PostTypes } from '../../../interfaces';
import { darkMode, userInfo } from '../../../store/atom';
import * as Styled from './Content.style';
import Like from './Like';

interface Props {
  data: PostTypes;
  postId: number;
  onClickDelete: () => void;
  onClickSetLike: () => void;
  Viewer: React.ComponentType<any>;
  isLike: boolean;
}

const Content = ({ data, postId, onClickDelete, onClickSetLike, Viewer, isLike }: Props) => {
  const me = useRecoilValue(userInfo);
  const darkmode = useRecoilValue(darkMode);

  const router = useRouter();
  const { user } = router.query;

  return (
    <>
      {me?.id === data?.user.id && (
        <Styled.ContentBtn>
          <button type="button" onClick={() => router.push(`/${user}/${postId}/edit`)}>
            포스트 수정
          </button>
          <button type="button" onClick={onClickDelete}>
            포스트 삭제
          </button>
        </Styled.ContentBtn>
      )}
      <Styled.Content>
        <Viewer content={data?.content} darkmode={darkmode} />
        <Like onClickSetLike={onClickSetLike} isLike={isLike} likeCount={data?.likeCount} />
      </Styled.Content>
    </>
  );
};

export default Content;
