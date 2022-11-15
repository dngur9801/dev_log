import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { commentAPI } from '../../api';
import { registCommentTypes } from '../../interfaces';
import * as Styled from './CommentBox.style';

import Comment from './Comment';

interface CommentTypes {
  commentDatas: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      name: string;
      profileImage: string;
    };
  }[];
}

const CommentBox = ({ commentDatas }: CommentTypes) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();

  const router = useRouter();
  const { posturl } = router.query;
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: create }: any = useMutation((data: registCommentTypes) => commentAPI.regist(data));

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
    create(data, {
      onSuccess: (data: any) => {
        alert('댓글이 작성되었습니다.');
        setComments((prev) => [...prev, data?.data]);
        textRef.current.value = '';
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };

  useEffect(() => {
    setComments(commentDatas);
  }, [commentDatas]);

  console.log('comments :', comments);
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
          comments?.map((item, idx) => (
            <Comment
              key={item.id}
              item={item}
              idx={idx}
              isSelected={selectedCommentIndex === idx ? true : false}
              setSelectedCommentIndex={setSelectedCommentIndex}
              setComments={setComments}
            />
          ))
        )}
      </Styled.Comments>
    </Styled.Wrap>
  );
};

export default CommentBox;
