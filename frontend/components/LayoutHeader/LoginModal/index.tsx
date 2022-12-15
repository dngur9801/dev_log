import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './LoginModal.style';
import { FaRegWindowClose } from 'react-icons/fa';
import SignUpModal from './SignUpModal';
import { useMutation } from 'react-query';
import { userAPI } from '../../../api';
import Loading from '../../Common/Loading';
import Link from 'next/link';
import { LocalLoginTypes } from '../../../interfaces';
import { apiAddress } from '../../../config';
import CustomAlert from '../../Common/CustomAlert';

interface LoginModalProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({ setLoginModal }: LoginModalProps) => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});

  // 로그인 데이터 저장
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // local 로그인 클릭 시
  const onClickLocalLogin = () => {
    mutate(formData, {
      onSuccess: () => {
        window.location.reload();
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  const { mutate, isLoading }: any = useMutation((data: LocalLoginTypes) => userAPI.localLogin(data));

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
                <Link href={`${apiAddress()}/auth/google`}>
                  <a className="purple">Google 계정으로 로그인</a>
                </Link>
                <Link href={`${apiAddress()}/auth/github`}>
                  <a className="blue">GitHub 계정으로 로그인</a>
                </Link>
                <div className="line_wrap">
                  <div className="line"></div>
                  <span>또는</span>
                </div>
                <input type="text" placeholder="이메일을 입력하세요" name="email" onChange={(e) => onChangeForm(e)} />
                <input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  name="password"
                  onChange={(e) => onChangeForm(e)}
                />
                {isLoading && <Loading width="36px" />}
                <button type="button" className="black" onClick={onClickLocalLogin}>
                  Devlog 아이디로 로그인
                </button>
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
      {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
    </S.Wrap>
  );
};

export default LoginModal;
