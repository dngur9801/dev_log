import "../styles/globals-styles.ts";
import type { AppProps } from "next/app";
import GlobalStyle from "../styles/globals-styles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
