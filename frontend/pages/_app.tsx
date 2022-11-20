import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global-styles';
import AppLayout from '../components/AppLayout';
import { theme } from '../styles/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CookiesProvider>
            <GlobalStyle />
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </CookiesProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
