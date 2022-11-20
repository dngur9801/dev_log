import React from 'react';
import { defaultProfileImage } from '../../../config';
import * as S from './UserBlogHeader.style';

interface UserBlogHeaderPropTypes {
  nickName: string;
  profileImage: string;
  introduce: string;
}

const UserBlogHeader = ({ nickName, profileImage, introduce }: UserBlogHeaderPropTypes) => {
  return (
    <S.Container>
      <div className="profile">
        <img src={profileImage ? profileImage : defaultProfileImage()} alt="" />
        <div className="profile_text">
          <p>{nickName}</p>
          <span>{introduce}</span>
        </div>
      </div>
    </S.Container>
  );
};

export default UserBlogHeader;
