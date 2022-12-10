import { useState } from 'react';
import { throttle } from '../utils';

const useScroll = (waitTime: number) => {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const handleScroll = () => {
    const headerHeight = 80;
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset >= headerHeight && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };

  return {
    hide,
    pageY,
    throttleScroll: throttle(handleScroll, waitTime),
  };
};

export default useScroll;
