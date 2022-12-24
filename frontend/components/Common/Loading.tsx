import React from 'react';

interface LoadingProps {
  width?: 'small' | 'mid' | 'large';
  display?: string;
}

function Loading({ width, display }: LoadingProps) {
  let size = '0px';
  if (width === 'small') {
    size = '32px';
  } else if (width === 'mid') {
    size = '42px';
  } else if (width === 'large') {
    size = '52px';
  }
  return (
    <div style={{ display, textAlign: 'center' }}>
      <img src="/image/Spinner.gif" alt="로딩중" width={size} style={{ verticalAlign: 'middle' }} />
    </div>
  );
}

export default Loading;
