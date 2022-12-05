import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkMode } from '../store/atom';
import GlobalStyle from './global-styles';
import { darkTheme, lightTheme } from './theme';
import Header from '../components/Header';

interface Props {
  children: JSX.Element;
}
const CustomThemeProvider = ({ children }: Props) => {
  const [darkmode, setDarkmode] = useRecoilState(darkMode);
  const theme = darkmode ? darkTheme : lightTheme;

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkmode(true);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header></Header>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
