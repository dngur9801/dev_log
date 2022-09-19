import React from 'react';
import Head from 'next/head';

type Props = {
  children: string;
};

const Seo = ({ children }: Props) => {
  return (
    <Head>
      <title>{children}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
