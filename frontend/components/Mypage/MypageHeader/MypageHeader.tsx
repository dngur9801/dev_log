import React from 'react';
import * as S from './MypageHeader.style';

const MypageHeader = () => {
  return (
    <S.Container>
      <div className="profile">
        <img src="/image/profile.png" alt="" />
        <div className="profile_text">
          <p>aaa</p>
          <span>bbb</span>
        </div>
      </div>
    </S.Container>
  );
};

export default MypageHeader;
