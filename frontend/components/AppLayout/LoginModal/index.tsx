import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './LoginModal.style';
import { FaRegWindowClose } from 'react-icons/fa';

interface LoginModalProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <S.Wrap>
      <div className="content_wrap">
        <div className="close">
          <FaRegWindowClose onClick={() => setLoginModal(false)} />
        </div>
        <S.Content>
          <div className="left_content">devlog</div>
          <div className="right_content">
            {!isSignUp ? (
              <>
                <button type="button">Google 계정으로 로그인</button>
                <button type="button">GitHub 계정으로 로그인</button>
                <div className="line_wrap">
                  <div className="line"></div>
                  <span>또는</span>
                </div>
                <input type="text" placeholder="아이디를 입력하세요" />
                <input type="pasword" placeholder="비밀번호를 입력하세요" />
                <button type="button">Devlog 아이디로 로그인</button>
                <div className="not_member_text">
                  <span onClick={() => setIsSignUp(true)}>아직 회원이 아니신가요?</span>
                </div>
              </>
            ) : (
              <>
                <input type="text" placeholder="아이디" />
                <input type="pasword" placeholder="비밀번호" />
                <input type="pasword" placeholder="비밀번호 확인 " />
                <button type="button" className="signup_btn">
                  회원가입
                </button>
              </>
            )}
          </div>
        </S.Content>
      </div>
    </S.Wrap>
  );
};

export default LoginModal;
