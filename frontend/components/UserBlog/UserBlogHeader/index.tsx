import React from 'react';
import ProfileImage from '../../Common/ProfileImage';
import * as S from './UserBlogHeader.style';

interface UserBlogHeaderPropTypes {
  nickName: string;
  profileImage: string;
  introduce: string;
}

const UserBlogHeader = ({ nickName, introduce }: UserBlogHeaderPropTypes) => {
  return (
    <S.Container>
      <div className="profile">
        <ProfileImage width={130} height={130} />
        <div className="profile_text">
          <p>{nickName}</p>
          <span>{introduce}</span>
        </div>
      </div>
    </S.Container>
  );
};

export default UserBlogHeader;
