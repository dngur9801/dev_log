/* eslint-disable no-debugger */
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { MutableRefObject } from 'react';

interface EditorBoxTypes {
  editorRef: MutableRefObject<Editor>;
}

const EditorBox = ({ editorRef }: EditorBoxTypes) => {
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
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </>
  );
};

export default EditorBox;
