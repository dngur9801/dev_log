import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './LoginModal.style';
import { FaRegWindowClose } from 'react-icons/fa';
import SignUpModal from './SignUpModal';
import { useMutation } from 'react-query';
import { userAPI } from '../../../apis';
import Loading from '../../Common/Loading';
import { LocalLoginTypes } from '../../../interfaces';
import { useRecoilValue } from 'recoil';
import { darkMode } from '../../../store/atom';
import { useRouter } from 'next/router';
import { apiAddress } from '../../../config';
import Link from 'next/link';

interface LoginModalProps {
  setLoginModal: Dispatch<SetStateAction<boolean>>;
  setIsAlert: Dispatch<SetStateAction<boolean>>;
  setAlertText: Dispatch<SetStateAction<string>>;
}

const LoginModal = ({ setLoginModal, setIsAlert, setAlertText }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({});
  const darkmode = useRecoilValue(darkMode);

  const router = useRouter();

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
      onSuccess: (data: any) => {
        if (data.data?.notName) {
          router.push(`/regist?auth=local&id=${data.data.id}`);
        } else {
          window.location.reload();
        }
        setLoginModal(false);
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
        <S.Content darkmode={darkmode}>
          <div className="left_content">
            <img src="/image/welcome.png" alt="" />
          </div>
          <div className="right_content">
            {!isSignUp ? (
              <>
                <Link href={`${apiAddress()}/auth/google`}>
                  <a className="purple">Google 계정으로 로그인</a>
                </Link>
                <Link href={`${apiAddress()}/auth/github`}>
                  <a className="blue">GitHub 계정으로 로그인</a>
                </Link>
                <Link href={`${apiAddress()}/auth/naver`}>
                  <a className="green">Naver 계정으로 로그인</a>
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
              <SignUpModal setIsSignUp={setIsSignUp} setIsAlert={setIsAlert} setAlertText={setAlertText} />
            )}
          </div>
        </S.Content>
      </div>
    </S.Wrap>
  );
};

export default LoginModal;
