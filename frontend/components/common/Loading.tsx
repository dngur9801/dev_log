import React from 'react';

interface LoadingProps {
  width?: string;
  display?: string;
}

function Loading({ width, display }: LoadingProps) {
  return (
    <div style={{ display, textAlign: 'center' }}>
      <img src="/image/Spinner.gif" alt="로딩중" width={width} style={{ verticalAlign: 'middle' }} />
    </div>
  );
}

export default Loading;
