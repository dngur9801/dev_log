import Link from 'next/link';
import styled from 'styled-components';
import React, { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query';
import { userInfo } from '../../../../store/atom';
import { commentAPI } from '../../../../api';
import { CommentEditTypes, CommentTypes, PostTypes } from '../../../../interfaces';
import ProfileImage from '../../../Common/ProfileImage';

interface CommentPropTypes {
  item: CommentTypes;
  idx: number;
  isSelected: boolean;
  setSelectedCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<PostTypes, AxiosError<React.ReactNode>>>;
}
const Comment = ({ item, idx, isSelected, setSelectedCommentIndex, refetch }: CommentPropTypes) => {
  const [editComment, setEditComment] = useState('');
  const [user] = useRecoilState(userInfo);

  const { mutate: edit } = useMutation((data: CommentEditTypes) => commentAPI.edit(data));
  const { mutate: remove } = useMutation((data: string) => commentAPI.delete(data));

  // 댓글 수정 클릭 시
  const onClickModify = (id: string) => {
    if (editComment === '') {
      setSelectedCommentIndex(null);
      return;
    }
    const data = {
      commentId: id,
      content: editComment,
    };
    edit(data, {
      onSuccess: () => {
        refetch();
        setSelectedCommentIndex(null);
        setEditComment('');
      },
      onError: (error: any) => {
        alert(error.response.data);
      },
    });
  };

  // 댓글 삭제 클릭 시
  const onClickDelete = (id: string) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      alert('삭제되었습니다.');
    }
    remove(id, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        alert(error.response.data);
      },
    });
  };

  return (
    <div className="comment">
      <div className="profile_info">
        <div className="profile">
          <Link href={`/@${item?.user?.name}`}>
            <a>
              <ProfileImage width={50} height={50} />
            </a>
          </Link>
          <div className="comment_info">
            <Link href={`/@${item?.user?.name}`}>
              <a className="name">{item?.user?.name}</a>
            </Link>
            <div className="date">{item.createdAt}</div>
          </div>
        </div>
        {user?.name === item.user?.name && (
          <div className="actions">
            <button onClick={() => setSelectedCommentIndex(idx)}>수정</button>
            <button onClick={() => onClickDelete(item.id)}>삭제</button>
          </div>
        )}
      </div>
      {isSelected ? (
        <Styled.EditForm>
          <textarea
            defaultValue={item.content}
            maxLength={400}
            onChange={(e) => setEditComment(e.target.value)}
          ></textarea>
          <div className="actions">
            <button type="button" onClick={() => setSelectedCommentIndex(null)}>
              취소
            </button>
            <button type="button" onClick={() => onClickModify(item.id)}>
              수정 완료
            </button>
          </div>
        </Styled.EditForm>
      ) : (
        <div className="content">{item.content}</div>
      )}

      <button type="button" className="reply" onClick={() => alert('서비스 준비중 입니다.')}>
        <FaPlusSquare />
        <span>답글 달기</span>
      </button>
    </div>
  );
};

const Styled = {
  EditForm: styled.div`
    textarea {
      margin-top: 15px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      margin-bottom: 20px;
      gap: 30px;

      button:nth-child(1) {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.basic2};
        padding: 8px 10px;
      }

      button:nth-child(2) {
        background-color: ${({ theme }) => theme.backgroundColors.basic2};
        color: white;
        border-radius: 5px;
        padding: 8px 10px;
      }
    }
  `,
};
export default Comment;
