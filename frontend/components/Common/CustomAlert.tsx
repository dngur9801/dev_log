import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  text: string;
  setIsAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const delay = 300;
const CustomAlert = ({ text, setIsAlert }: Props) => {
  const [animation, setAnimation] = useState<'openAnimation' | 'closeAnimation'>('openAnimation');
  const animationRef = useRef<HTMLDivElement>();
  useEffect(() => {
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    const timer = setTimeout(() => {
      setAnimation(null);
      timer2 = setTimeout(() => {
        setAnimation('closeAnimation');
        timer3 = setTimeout(() => {
          setIsAlert(false);
        }, delay);
      }, 2000);
    }, delay);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <Styled.Wrap ref={animationRef} className={animation}>
      <div className="inner">{text}</div>
    </Styled.Wrap>
  );
};

const openSlide = keyframes`
  from {
    transform: translate(-50%, 100%) 
  }
  to {
    transform: translate(-50%, 0%) 
  }
`;
const closeSlide = keyframes`
  from {
    transform: translate(-50%, 0%)
  }
  to {
    transform: translate(-50%, 100%)
  }
`;

const Styled = {
  Wrap: styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    &.openAnimation {
      animation: ${openSlide} ${delay / 1000 + 's'};
    }
    &.closeAnimation {
      animation: ${closeSlide} ${delay / 1000 + 's'};
    }

    .inner {
      padding: 40px 120px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
  `,
};

export default CustomAlert;
