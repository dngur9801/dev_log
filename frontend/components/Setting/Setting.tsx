import React, { useState } from 'react';
import * as S from './Setting.style';

const Setting = () => {
  const [isModifyProfile, setIsModifyProfile] = useState(false);
  const [isModifySubject, setIsModifySubject] = useState(false);
  const [nickname, setNickname] = useState('asdsdfas');
  const [introduce, setIntroduce] = useState('bbbbbbbbb');
  const [subject, setSubject] = useState('dngur9801');

  return (
    <S.Container>
      <div className="modify_profile">
        <div className="modify_img">
          <img src="/image/profile.png" />
          <button type="button">이미지 업로드</button>
        </div>
        <div className="modify_info">
          {isModifyProfile ? (
            <form className="modify_info">
              <input type="text" defaultValue={nickname} onChange={(e) => setNickname(e.target.value)} />
              <input type="text" defaultValue={introduce} onChange={(e) => setIntroduce(e.target.value)} />
              <button type="button" onClick={() => setIsModifyProfile(false)}>
                저장
              </button>
            </form>
          ) : (
            <>
              <p className="nickname">{nickname}</p>
              <span className="introduce">{introduce}</span>
              <button type="button" onClick={() => setIsModifyProfile(true)}>
                수정
              </button>
            </>
          )}
        </div>
      </div>
      <div className="modify_subinfo_wrap">
        <div className="modify_subinfo">
          <div className="info">
            <h3>Devlog 제목</h3>
            {isModifySubject ? (
              <>
                <input type="text" defaultValue={subject} onChange={(e) => setSubject(e.target.value)} />
                <S.InfoButton type="button" color="blue" onClick={() => setIsModifySubject(false)}>
                  저장
                </S.InfoButton>
              </>
            ) : (
              <>
                <p>{subject}</p>
                <S.InfoButton type="button" color="blue" onClick={() => setIsModifySubject(true)}>
                  수정
                </S.InfoButton>
              </>
            )}
          </div>
          <div className="description">중앙 상단에 나타나는 제목 입니다.</div>
        </div>
        <div className="modify_subinfo">
          <div className="info">
            <h3>회원탈퇴</h3>
            <S.InfoButton type="button" color="red">
              회원 탈퇴
            </S.InfoButton>
          </div>
          <div className="description">삭제시 모든 정보가 삭제되며 복구되지 않습니다.</div>
        </div>
      </div>
    </S.Container>
  );
};

export default Setting;
