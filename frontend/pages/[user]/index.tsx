import { NextPage } from 'next';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import UserBlogHeader from '../../components/UserBlog/UserBlogHeader';
import UserBlogContent from '../../components/Common/UserBlogContent';
import { userAPI } from '../../apis';
import { UserBlogTypes } from '../../interfaces';
import { USER_POSTS } from '../../constant/queryKey';

const UserBlog: NextPage = () => {
  const route = useRouter();
  const userName = (route.query.user as string)?.replace('@', '');
  const { data, error, status } = useQuery<UserBlogTypes, AxiosError<ReactNode>>(
    [USER_POSTS, userName],
    () => userAPI.posts(userName),
    {
      enabled: !!userName,
      refetchOnWindowFocus: false,
    },
  );
  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  return (
    <>
      <NextSeo
        title={data?.nickName}
        description={`${data?.nickName} description`}
        canonical="https://example.com"
        openGraph={{
          url: 'https://example.com',
        }}
      />
      <UserBlogHeader nickName={data?.nickName} profileImage={data?.profileImage} introduce={data?.introduce} />
      <Styled.Wrap>
        <div className="taps">
          <span>글</span>
        </div>
        {data?.posts?.map((item) => (
          <UserBlogContent key={item.id} item={item} />
        ))}
      </Styled.Wrap>
    </>
  );
};

const Styled = {
  Wrap: styled.div`
    width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
    margin-top: 60px;

    @media ${({ theme }) => theme.device.tablet} {
      width: calc(100% - 2rem);
    }

    .taps {
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizes.xl};

      span {
        display: inline-block;
        width: 120px;
        padding: 10px 0;
        border-bottom: 2px solid ${({ theme }) => theme.colors.basic2};
        color: ${({ theme }) => theme.colors.basic2};
        font-weight: ${({ theme }) => theme.fontWeights.xl};
      }
    }
  `,
};

export default UserBlog;
