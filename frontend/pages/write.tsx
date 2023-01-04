import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaImage, FaArrowCircleLeft } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { NextSeo } from 'next-seo';
import { postAPI } from '../apis';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { RegistOrEditTypes } from '../interfaces';
import { useRecoilState, useRecoilValue } from 'recoil';
import { darkMode, userInfo } from '../store/atom';
import RegistModal from '../components/Write/RegistModal';
import CustomAlert from '../components/Common/CustomAlert';
import { reg } from '../utils';

interface WriteTypes {
  modifyTitle?: string;
  modifyContent?: string;
  id?: string | number;
}
const EditorBox = dynamic(() => import('../components/Common/EditorBox'), {
  ssr: false,
});
const Write = ({ modifyTitle, modifyContent, id }: WriteTypes) => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState<'0' | '1'>('0');
  const [user] = useRecoilState(userInfo);
  const darkmode = useRecoilValue(darkMode);
  const editorRef = useRef<Editor>(null);
  const router = useRouter();

  const { mutate: regist }: any = useMutation((data: RegistOrEditTypes) => postAPI.regist(data));
  const { mutate: edit }: any = useMutation((data: RegistOrEditTypes) => postAPI.edit(data));

  // 이미지 이름 출력
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // 발행하기 클릭 시
  const onSubmitRegist = () => {
    const formData = commonFormData();
    regist(formData, {
      onSuccess: (data: any) => {
        router.push(
          {
            pathname: '/[user]/[posturl]',
          },
          `/@${user.name}/${data.data.urlTitle}`,
        );
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  // 글 수정하기 클릭 시
  const onSubmitModify = () => {
    const formData = commonFormData();
    formData.append('id', id as string);
    edit(formData, {
      onSuccess: (data: any) => {
        router.push(
          {
            pathname: '/[user]/[posturl]',
          },
          `/@${user.name}/${data.data.urlTitle}`,
        );
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  // formData
  const commonFormData = () => {
    const content = editorRef.current.getInstance().getHTML();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('private', isPrivate);
    return formData;
  };

  useEffect(() => {
    setTitle(modifyTitle || '');
  }, [modifyTitle]);
  return (
    <>
      <NextSeo
        title="새 글 작성"
        description="새 글 작성"
        canonical="https://devlog.shop"
        openGraph={{
          url: 'https://devlog.shop',
        }}
      />
      <Styled.Wrap>
        <form encType="multipart/form-data">
          <Styled.Subject>
            <input
              type="text"
              name="title"
              placeholder="제목을 입력하세요."
              className="subject_input"
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title}
            />
            <div className="subject_img">
              <input className="upload_name" defaultValue={fileName} readOnly />
              <label htmlFor="file">
                <FaImage />
                표지 이미지
              </label>
              <input type="file" accept="image/*" id="file" name="file" onChange={(e) => onUploadImage(e)} />
            </div>
          </Styled.Subject>
          <EditorBox editorRef={editorRef} value={modifyContent} darkmode={darkmode} />
          <Styled.ButtonWrap>
            <div className="btns">
              <button type="button" onClick={() => router.back()}>
                <FaArrowCircleLeft />
                나가기
              </button>
              <button type="button" onClick={() => setIsModal(true)}>
                글 {modifyTitle ? '수정' : '발행'}하기
              </button>
            </div>
          </Styled.ButtonWrap>
          {isModal && (
            <RegistModal
              onSubmit={id ? onSubmitModify : onSubmitRegist}
              setIsModal={setIsModal}
              setIsPrivate={setIsPrivate}
            />
          )}
        </form>
        {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
      </Styled.Wrap>
    </>
  );
};

const Styled = {
  Wrap: styled.div`
    margin-top: 50px;
  `,
  Subject: styled.div`
    position: relative;
    height: 250px;
    background-color: ${({ theme }) => theme.backgroundColors.gray1};
    display: flex;
    align-items: center;
    padding: 30px;

    .subject_input {
      width: 100%;
      font-size: ${({ theme }) => theme.fontSizes.titleXL};
      border: 0;
      background: transparent;

      &:focus {
        outline: 0;
      }
    }

    .subject_img {
      position: absolute;
      display: flex;
      right: 30px;
      bottom: 30px;

      .upload_name {
        padding: 0 10px;
        border: 0;
        background: transparent;

        &:focus {
          outline: 0;
        }
      }

      label {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 5px;
      }

      #file {
        display: none;
      }
    }
  `,
  ButtonWrap: styled.div`
    height: 70px;
    .btns {
      display: flex;
      position: fixed;
      justify-content: space-between;
      align-items: center;
      bottom: 0;
      width: 100%;
      padding: 15px;
      background-color: ${({ theme }) => theme.backgroundColors.white1};

      button:nth-of-type(1) {
        background: transparent;
        margin-left: 30px;
        font-size: ${({ theme }) => theme.fontSizes.xl};
        color: ${({ theme }) => theme.colors.black1};

        svg {
          vertical-align: -3px;
          margin-right: 8px;
        }
      }

      button:nth-of-type(2) {
        padding: 10px 15px;
        margin-right: 30px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.backgroundColors.basic1};
        color: white;
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }
    }
  `,
};
export default Write;
