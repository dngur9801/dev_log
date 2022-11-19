import React from 'react';
import { defaultProfileImage } from '../../../config';
import * as S from './UserBlogHeader.style';

const UserBlogHeader = () => {
  return (
    <S.Container>
      <div className="profile">
        <img src={defaultProfileImage()} alt="" />
        <div className="profile_text">
          <p>aaa</p>
          <span>bbb</span>
        </div>
      </div>
    </S.Container>
  );
};

export default UserBlogHeader;
