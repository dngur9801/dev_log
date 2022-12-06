/* eslint-disable react/no-children-prop */
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import CustomThemeProvider from '../styles/CustomThemeProvider';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CookiesProvider>
            <CustomThemeProvider children={<Component />} cookie={pageProps.cookie} />
          </CookiesProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }: any) => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let cookie = '';
  if (ctx.req) {
    cookie = ctx.req.cookies;
  }

  pageProps.cookie = cookie;
  return { pageProps };
};
export default MyApp;
