import { AxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from 'react-query';
import { commentAPI } from '../../../apis';
import { CommentTypes, PostTypes, registCommentTypes } from '../../../interfaces';
import CustomAlert from '../../Common/CustomAlert';
import Loading from '../../Common/Loading';
import Comment from './Comment';
import * as Styled from './CommentBox.style';

interface CommentBoxPropTypes {
  comments: CommentTypes[];
  postId: number;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<PostTypes, AxiosError<React.ReactNode>>>;
}

const CommentBox = ({ comments, postId, refetch }: CommentBoxPropTypes) => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [comment, setComment] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState<number>();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: create, isLoading }: any = useMutation((data: registCommentTypes) => commentAPI.regist(data));

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
      postId: postId,
      content: comment,
    };
    create(data, {
      onSuccess: () => {
        textRef.current.value = '';
        setIsAlert(true);
        setAlertText('😁 댓글이 작성되었습니다.');
        refetch();
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  return (
    <Styled.Wrap>
      <h4>
        <span className="count">{comments?.length}</span>개의 댓글
      </h4>
      <textarea ref={textRef} placeholder="댓글을 작성하세요" maxLength={400} onInput={onInputComment}></textarea>
      <div className="button_wrap">
        {isLoading && <Loading width="small" />}
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
              setIsAlert={setIsAlert}
              setAlertText={setAlertText}
              refetch={refetch}
            />
          ))
        )}
      </Styled.Comments>
      {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
    </Styled.Wrap>
  );
};

export default CommentBox;
