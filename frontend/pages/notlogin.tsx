import React from 'react';
import styled from 'styled-components';

const NotLoggedIn = () => {
  return <Styled.Wrap>로그인 후 이용해 주세요.</Styled.Wrap>;
};

const Styled = {
  Wrap: styled.div`
    width: 100%;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    color: ${({ theme }) => theme.colors.basic2};
  `,
};

export default NotLoggedIn;
