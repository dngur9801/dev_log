/* eslint-disable react/no-children-prop */
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import CustomThemeProvider from '../styles/CustomThemeProvider';
import { CookiesProvider } from 'react-cookie';
import { userAPI } from '../api';
import axios from 'axios';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  console.log('pageProps : ', pageProps);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <CookiesProvider>
              <CustomThemeProvider children={<Component {...pageProps} />} cookie={pageProps.cookie} />
            </CookiesProvider>
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }: any) => {
  let pageProps: any = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const cookie = ctx.req ? ctx.req.cookies : '';
  console.log('initialProps Start');
  // const cookie = ctx.req ? ctx.req.headers.cookie : '';
  // console.log('cookie : ', cookie);

  // axios.defaults.headers.common['Cookies'] = '';
  // if (ctx.req && cookie) {
  //   axios.defaults.headers.common['Cookies'] = cookie;
  // }

  // const user = await userAPI.info();
  // console.log('user : ', user);

  pageProps.cookie = cookie;
  return { pageProps };
};
export default MyApp;
