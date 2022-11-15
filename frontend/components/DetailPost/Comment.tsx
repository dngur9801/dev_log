import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { userInfo } from '../../store/atom';
import { defaultProfileImage } from '../../config';
import { commentAPI } from '../../api';
import styled from 'styled-components';

interface CommentTypes {
  item: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      name: string;
      profileImage: string;
    };
  };
  idx: number;
  isSelected: boolean;
  setSelectedCommentIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  setComments: React.Dispatch<React.SetStateAction<any[]>>;
}
const Comment = ({ item, idx, isSelected, setSelectedCommentIndex, setComments }: CommentTypes) => {
  const [editComment, setEditComment] = useState('');
  const [user] = useRecoilState(userInfo);

  const { mutate: edit }: any = useMutation((data: string) => commentAPI.edit(data));
  const { mutate: remove }: any = useMutation((data: string) => commentAPI.delete(data));
  // 댓글 수정 클릭 시
  const onClickModify = (id: string, prevContent: string) => {
    const data = {
      commentId: id,
      content: editComment || prevContent,
    };
    edit(data, {
      onSuccess: (data: any) => {
        setSelectedCommentIndex(null);
        item.content = editComment;
      },
      onError: (error: any, variables: any, context: any) => {
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
      onSuccess: (data: any) => {
        console.log(data);
        setComments((prev) => [...prev.filter((item) => item.id !== id)]);
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };
  return (
    <div className="comment" key={item.id}>
      <div className="profile_info">
        <div className="profile">
          <Link href={`/@${item?.user?.name}`}>
            <a>
              <img src={item?.user?.profileImage ? item?.user?.profileImage : defaultProfileImage()} />
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
            <button type="button" onClick={() => onClickModify(item.id, item.content)}>
              수정 완료
            </button>
          </div>
        </Styled.EditForm>
      ) : (
        <div className="content">{item.content}</div>
      )}

      <button type="button" className="reply">
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
        background-color: white;
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
