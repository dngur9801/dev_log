import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { darkMode } from '../store/atom';
import GlobalStyle from './global-styles';
import { darkTheme, lightTheme } from './theme';
import { UserInfoTypes } from '../interfaces';
import LayoutHeader from '../components/LayoutHeader';

interface Props {
  children: JSX.Element;
  themeCookie: any;
  ssrUserData: UserInfoTypes;
}
const CustomThemeProvider = ({ children, themeCookie, ssrUserData }: Props) => {
  const [darkmode, setDarkmode] = useRecoilState(darkMode);
  const [theme, setTheme] = useState(themeCookie?.theme === 'dark' ? darkTheme : lightTheme);
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
      <LayoutHeader ssrUserData={ssrUserData} themeCookie={themeCookie?.theme} />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
