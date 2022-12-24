import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomAlert = ({ text, setIsAlert }: Props) => {
  const animationRef = useRef<HTMLDivElement>();
  useEffect(() => {
    animationRef.current.style.bottom = '0';
    let timer2: NodeJS.Timeout;
    const timer = setTimeout(() => {
      animationRef.current.style.bottom = '-150px';
      timer2 = setTimeout(() => {
        setIsAlert(false);
      }, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <Styled.Wrap ref={animationRef}>
      <div className="inner">{text}</div>
    </Styled.Wrap>
  );
};

const Styled = {
  Wrap: styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 9999;
    bottom: -150px;
    transition: 0.5s all;

    .inner {
      width: 500px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      text-align: center;
      border-radius: 10px 10px 0 0;
      padding: 60px;
    }
  `,
};

export default CustomAlert;
