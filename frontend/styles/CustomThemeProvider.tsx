import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { darkMode } from '../store/atom';
import GlobalStyle from './global-styles';
import { darkTheme, lightTheme } from './theme';
import Header from '../components/LayoutHeader';

interface Props {
  children: JSX.Element;
  cookie: any;
}
const CustomThemeProvider = ({ children, cookie }: Props) => {
  const [darkmode, setDarkmode] = useRecoilState(darkMode);
  const [theme, setTheme] = useState(cookie?.theme === 'dark' ? darkTheme : lightTheme);
  const [cookies] = useCookies(['theme']);

  useEffect(() => {
    if (cookies.theme === 'dark') {
      setTheme(darkTheme);
      setDarkmode(true);
    } else if (cookies.theme === 'light') {
      setTheme(lightTheme);
      setDarkmode(false);
    }
  }, [cookies]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
