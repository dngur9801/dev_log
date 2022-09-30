import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './LoginModal.style';
import { FaRegWindowClose } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { userAPI } from '../../../api';

interface LoginModalProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});

  // 회원가입 요청 시
  const onClickSignUp = () => {
    mutation.mutate(formData);
  };

  // 회원가입 데이터 저장
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const mutation: any = useMutation((formData) => userAPI.signUp(formData));
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
                <input type="pasword" placeholder="비밀번호를 입력하세요" />
                <button type="button">Devlog 아이디로 로그인</button>
                <div className="not_member_text">
                  <span onClick={() => setIsSignUp(true)}>아직 회원이 아니신가요?</span>
                </div>
              </>
            ) : (
              <>
                <input type="text" placeholder="이메일" name="email" onChange={(e) => onChangeForm(e)} />
                <input type="pasword" placeholder="비밀번호" name="password" onChange={(e) => onChangeForm(e)} />
                <input
                  type="pasword"
                  placeholder="비밀번호 확인 "
                  name="re_password"
                  onChange={(e) => onChangeForm(e)}
                />
                <button type="button" className="signup_btn" onClick={onClickSignUp}>
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
