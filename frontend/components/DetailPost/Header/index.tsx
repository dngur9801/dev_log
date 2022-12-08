import React from 'react';
import { PostTypes } from '../../../interfaces';
import * as Styled from './Header.style';

interface Props {
  data: PostTypes;
}

const Header = ({ data }: Props) => {
  return (
    <Styled.Header image={data?.image?.src}>
      <div className="back_img"></div>
      <div className="bg"></div>
      <Styled.Title>
        <p>{data?.title}</p>
        <span>
          {data?.user?.name} | {data?.createdAt?.split('T')[0]}
        </span>
      </Styled.Title>
    </Styled.Header>
  );
};

export default Header;
