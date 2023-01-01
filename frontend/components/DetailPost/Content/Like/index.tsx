import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import * as Styled from './Like.style';

interface Props {
  onClickSetLike: () => void;
  isLike: boolean;
  likeCount: number;
  likeRef: React.MutableRefObject<HTMLDivElement>;
}

const Like = ({ onClickSetLike, isLike, likeCount, likeRef }: Props) => {
  return (
    <Styled.LikeBox onClick={onClickSetLike} ref={likeRef}>
      <div className="inner">
        {isLike ? <FaHeart size={'36px'} color={'red'} /> : <FaRegHeart size={'36px'} />}
        <div>{likeCount}</div>
      </div>
    </Styled.LikeBox>
  );
};

export default Like;
