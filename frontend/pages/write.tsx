import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaImage } from 'react-icons/fa';

const EditorBox = dynamic(() => import('../components/Write/EditorBox'), {
  ssr: false,
});

const Write = () => {
  const [fileName, setFileName] = useState('');

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFileName(e.target.files[0].name);
  };
  return (
    <Styled.Wrap>
      <Styled.Subject>
        <input type="text" placeholder="제목을 입력하세요." className="subject_input" />
        <div className="subject_img">
          <input className="upload_name" defaultValue={fileName} readOnly />
          <label htmlFor="file">
            <FaImage />
            표지 이미지
          </label>
          <input type="file" accept="image/*" id="file" onChange={(e) => onUploadImage(e)} />
        </div>
      </Styled.Subject>
      <EditorBox />
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
};
export default Write;
