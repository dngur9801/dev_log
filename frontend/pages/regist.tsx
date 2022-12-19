import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { userAPI } from '../api';
import { UserRegistTypes } from '../interfaces/index';
import styled from 'styled-components';
import { reg } from '../utils';
import CustomAlert from '../components/Common/CustomAlert';

const Register = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [nickName, setNickName] = useState('');
  const [name, setName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const router = useRouter();

  const { auth, id } = router.query;
  const { mutate: regist } = useMutation((data: UserRegistTypes) => userAPI.regist(data));

  // 완료버튼 클릭 시
  const onClickRegist = () => {
    const data = {
      userId: id as string,
      nickName,
      name,
      introduce,
    };
    if (nickName === '') {
      setIsAlert(true);
      setAlertText('😁 닉네임을 입력해주세요');
    } else if (name === '') {
      setIsAlert(true);
      setAlertText('😁 아이디를 입력해주세요');
    } else if (!reg.isId(name)) {
      setIsAlert(true);
      setAlertText('😁 아이디는 영문자로 시작하는 영문자 또는 숫자 6~20자를 입력해주세요');
    } else {
      regist(data, {
        onSuccess: () => {
          window.location.href =
            process.env.NODE_ENV === 'production'
              ? 'https://main--imaginative-sunburst-7e031b.netlify.app/'
              : 'http://localhost:3000';
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
        },
      });
    }
  };
  return (
    <>
      <NextSeo
        title="회원가입"
        description="회원가입 description"
        canonical="https://example.com"
        openGraph={{
          url: 'https://example.com',
        }}
      />
      <Styled.Wrap>
        <h1>환영합니다!</h1>
        <h2>기본 정보를 입력해주세요</h2>
        <p>닉네임</p>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          maxLength={30}
          onChange={(e) => setNickName(e.target.value)}
        />
        <p>아이디</p>
        <input type="text" placeholder="아이디를 입력하세요" maxLength={30} onChange={(e) => setName(e.target.value)} />
        <p>블로그 소개</p>
        <input
          type="text"
          placeholder="소개글을 입력하세요"
          maxLength={50}
          onChange={(e) => setIntroduce(e.target.value)}
        />
        <div className="actions">
          <button type="button" onClick={() => router.push('/')}>
            취소
          </button>
          <button type="button" onClick={onClickRegist}>
            완료
          </button>
        </div>
        {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
      </Styled.Wrap>
    </>
  );
};

const Styled = {
  Wrap: styled.div`
    max-width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
    margin-top: 50px;

    h1 {
      font-size: ${({ theme }) => theme.fontSizes.titleXL};
      color: ${({ theme }) => theme.colors.basic2};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
      margin-bottom: 20px;
    }

    h2 {
      font-size: ${({ theme }) => theme.fontSizes.xxxl};
      margin-bottom: 50px;
    }

    p {
      margin-bottom: 10px;
      font-weight: ${({ theme }) => theme.fontWeights.xl};
    }

    input {
      margin-bottom: 40px;
      width: 300px;
      height: 50px;
      border: 0;
      border-bottom: 1px solid black;
      font-size: ${({ theme }) => theme.fontSizes.xl};

      &:focus {
        outline: none;
      }
    }

    .actions {
      margin-top: 30px;

      button {
        width: 100px;
        height: 40px;
        border-radius: 10px;
        margin-right: 20px;
        background-color: ${({ theme }) => theme.backgroundColors.basic1};
        color: white;
      }
    }
  `,
};

export default Register;
