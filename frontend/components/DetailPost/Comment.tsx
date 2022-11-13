import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { FaPlusSquare } from 'react-icons/fa';
import { commentAPI, postAPI } from '../../api';
import { registCommentTypes } from '../../interfaces';
import * as Styled from './Comment.style';

interface CommentTypes {
  commentDatas: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      name: string;
    };
  }[];
}

const Comment = ({ commentDatas }: CommentTypes) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const router = useRouter();
  const { posturl } = router.query;
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { mutate }: any = useMutation((data: registCommentTypes) => commentAPI.regist(data));

  // 댓글 입력 시
  const onInputComment = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLTextAreaElement) {
      setComment(e.target.value);
    }
    // 댓글 입력창 자동 높이조절,
    textRef.current.style.height = '100px';
    textRef.current.style.height =
      Number(textRef.current.style.height.split('px')[0]) < textRef.current.scrollHeight &&
      textRef.current.scrollHeight + 'px';
  };

  // 댓글 작성 클릭 시
  const onClickRegistComment = () => {
    const data = {
      postId: posturl,
      content: comment,
    };
    mutate(data, {
      onSuccess: (data: any) => {
        alert('댓글이 작성되었습니다.');
        setComments((prev) => [...prev, data?.data]);
        textRef.current.value = '';
      },
    });
  };

  useEffect(() => {
    setComments(commentDatas);
  }, [commentDatas]);

  return (
    <Styled.Wrap>
      <h4>
        <span className="count">{comments?.length}</span>개의 댓글
      </h4>
      <textarea ref={textRef} placeholder="댓글을 작성하세요" maxLength={400} onInput={onInputComment}></textarea>
      <div className="button_wrap">
        <button type="button" onClick={onClickRegistComment}>
          댓글 작성
        </button>
      </div>
      <Styled.Comments>
        {comments?.length === 0 ? (
          <div className="none_comment">
            <span>작성된 댓글이 없습니다.</span>
          </div>
        ) : (
          comments?.map((item) => (
            <div className="comment" key={item.id}>
              <div className="profile">
                <Link href={`/@${item?.user?.name}`}>
                  <a>
                    <img src="/image/profile.png" />
                  </a>
                </Link>
                <div className="comment_info">
                  <Link href={`/@${item?.user?.name}`}>
                    <a className="name">{item?.user?.name}</a>
                  </Link>
                  <div className="date">{item.createdAt}</div>
                </div>
              </div>
              <div className="content">{item.content}</div>
              <button type="button" className="reply">
                <FaPlusSquare />
                <span>답글 달기</span>
              </button>
            </div>
          ))
        )}
      </Styled.Comments>
    </Styled.Wrap>
  );
};

export default Comment;
