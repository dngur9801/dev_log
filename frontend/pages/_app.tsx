/* eslint-disable react/no-children-prop */
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import CustomThemeProvider from '../styles/CustomThemeProvider';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <CustomThemeProvider children={<Component {...pageProps} />} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
