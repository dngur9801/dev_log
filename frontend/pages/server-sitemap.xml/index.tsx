/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { postAPI } from '../../apis';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const posts = await postAPI.popular();
  const newsSitemaps = posts.map((item) => ({
    loc: `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}${item.id.toString()}`,
    lastmod: new Date().toISOString(),
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
