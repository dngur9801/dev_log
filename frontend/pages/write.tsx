import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaImage } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { postAPI } from '../api';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { RegistOrEditTypes } from '../interfaces';
import { useRecoilState } from 'recoil'; // 훅 import
import { userInfo } from '../store/atom';

const EditorBox = dynamic(() => import('../components/common/EditorBox'), {
  ssr: false,
});

interface WriteTypes {
  modifyTitle?: string;
  modifyContent?: string;
  id?: string;
}

const Write = ({ modifyTitle, modifyContent, id }: WriteTypes) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [user] = useRecoilState(userInfo);

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

  // 글 발행하기 클릭 시
  const onSubmitRegist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = commonFormData();
    regist(formData, {
      onSuccess: (data: any, variables: any, context: any) => {
        router.push(`/@${user.name}/${data.data.id}`);
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };

  // 글 수정하기 클릭 시
  const onSubmitModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = commonFormData();
    formData.append('id', id);
    edit(formData, {
      onSuccess: (data: any, variables: any, context: any) => {
        router.push(`/@${user.name}/${id}`);
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
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
    return formData;
  };

  useEffect(() => {
    setTitle(modifyTitle || '');
  }, [modifyTitle]);
  return (
    <Styled.Wrap>
      <form encType="multipart/form-data" onSubmit={id ? onSubmitModify : onSubmitRegist}>
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
        <EditorBox editorRef={editorRef} value={modifyContent} />
        <Styled.ButtonWrap>
          <button type="submit">글 {modifyTitle ? '수정' : '발행'}하기</button>
        </Styled.ButtonWrap>
      </form>
    </Styled.Wrap>
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
    margin: 30px 0;
    text-align: right;

    button {
      padding: 10px 15px;
      margin-right: 30px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  `,
};
export default Write;
