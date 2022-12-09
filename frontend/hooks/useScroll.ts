import { useState } from 'react';

const throttle = (callback: () => void, waitTime: number) => {
  let timerId: NodeJS.Timeout = null;
  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this);
      timerId = null;
    }, waitTime);
  };
};

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
