/* eslint-disable no-debugger */
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { MutableRefObject, useEffect } from 'react';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

interface EditorBoxTypes {
  editorRef: MutableRefObject<Editor>;
  value?: string;
}

const EditorBox = ({ editorRef, value }: EditorBoxTypes) => {
  useEffect(() => {
    editorRef.current?.getInstance().setHTML(value);
  }, []);
  return (
    <>
      <Editor
        ref={editorRef}
        initialValue=" "
        initialEditType="markdown"
        height="60vh"
        previewStyle="vertical"
        useCommandShortcut={true}
        // theme="dark"
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </>
  );
};

export default EditorBox;
