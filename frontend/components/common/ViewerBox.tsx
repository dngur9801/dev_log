import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

interface ViewrBoxTypes {
  content: string;
  darkmode: boolean;
}
const ViewerBox = ({ content, darkmode }: ViewrBoxTypes) => {
  console.log('ViewerBox_darkmode : ', darkmode);
  return (
    <Viewer
      initialValue={content}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      theme={darkmode ? 'dark' : 'light'}
    />
  );
};

export default ViewerBox;
