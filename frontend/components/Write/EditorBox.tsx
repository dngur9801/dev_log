/* eslint-disable no-debugger */
import React, { useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { postAPI } from '../../api';

interface EditorBoxTypes {
  title: string;
}

const EditorBox = ({ title }: EditorBoxTypes) => {
  const editorRef = useRef<Editor>(null);

  const { mutate }: any = useMutation((data) => postAPI.regist(data));

  // 글 발행하기 클릭 시
  const onClickRegist = () => {
    console.log(editorRef.current.getInstance().getHTML());
    const content = editorRef.current.getInstance().getHTML();
    const data = {
      title,
      content,
    };
    mutate(data, {
      onSuccess: (data: any, variables: any, context: any) => {
        alert(data);
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };
  return (
    <>
      <Editor
        ref={editorRef}
        initialValue=" "
        initialEditType="markdown"
        height="100vh"
        previewStyle="vertical"
        useCommandShortcut={true}
        // theme="dark"
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
      <Styled.ButtonWrap>
        <button type="button" onClick={onClickRegist}>
          글 발행하기
        </button>
      </Styled.ButtonWrap>
    </>
  );
};

const Styled = {
  ButtonWrap: styled.div`
    margin: 30px 0;
    text-align: right;

    button {
      padding: 10px 15px;
      margin-right: 30px;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.backgroundColors.blue3};
      color: white;
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  `,
};

export default EditorBox;
