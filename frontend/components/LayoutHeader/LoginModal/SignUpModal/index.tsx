import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { userAPI } from '../../../../apis';
import Loading from '../../../Common/Loading';
import { SignUpTypes } from '../../../../interfaces';

interface SignUpModalProps {
  setIsSignUp: Dispatch<React.SetStateAction<boolean>>;
  setIsAlert: Dispatch<SetStateAction<boolean>>;
  setAlertText: Dispatch<SetStateAction<string>>;
}

const SignUpModal = ({ setIsSignUp, setIsAlert, setAlertText }: SignUpModalProps) => {
  const [formData, setFormData] = useState({});

  const { mutate, isLoading }: any = useMutation((data: SignUpTypes) => userAPI.signUp(data));

  // 회원가입 데이터 저장
  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 요청 시
  const onClickSignUp = () => {
    const data = formData;
    mutate(data, {
      onSuccess: () => {
        setIsAlert(true);
        setAlertText('😁 회원가입이 완료되었습니다.');
        setIsSignUp(false);
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  return (
    <>
      <input type="text" placeholder="이메일" name="email" onChange={(e) => onChangeForm(e)} />
      <input type="password" placeholder="비밀번호" name="password" onChange={(e) => onChangeForm(e)} />
      <input type="password" placeholder="비밀번호 확인 " name="re_password" onChange={(e) => onChangeForm(e)} />
      {isLoading && <Loading width="32px" />}
      <button type="button" className="signup_btn black" onClick={onClickSignUp}>
        회원가입
      </button>
      <div className="not_member_text">
        <span onClick={() => setIsSignUp(false)}>이미 회원 이신가요?</span>
      </div>
    </>
  );
};

export default SignUpModal;
