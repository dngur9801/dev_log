import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/global-styles';
import AppLayout from '../components/AppLayout';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { userAPI } from '../api';

const queryClient = new QueryClient();

(async () => {
  const response = await userAPI.getInfo();
  console.log(response);
})();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
