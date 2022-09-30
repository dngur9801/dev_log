import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './LoginModal.style';
import { FaRegWindowClose } from 'react-icons/fa';
import SignUpModal from '../SignUpModal';

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
                <input type="text" placeholder="이메일을 입력하세요" />
                <input type="password" placeholder="비밀번호를 입력하세요" />
                <button type="button">Devlog 아이디로 로그인</button>
                <div className="not_member_text">
                  <span onClick={() => setIsSignUp(true)}>아직 회원이 아니신가요?</span>
                </div>
              </>
            ) : (
              <SignUpModal setIsSignUp={setIsSignUp} />
            )}
          </div>
        </S.Content>
      </div>
    </S.Wrap>
  );
};

export default LoginModal;
