import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import UserBlogHeader from '../../components/UserBlog/UserBlogHeader';
import UserBlogContent from '../../components/Common/UserBlogContent';
import { userAPI } from '../../apis';
import { UserBlogTypes } from '../../interfaces';
import { USER_POSTS } from '../../constant/queryKey';
import { apiAddress } from '../../config';

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
  return (
    <>
      <NextSeo
        title={data?.nickName}
        description={`${data?.nickName}`}
        canonical={`https://devlog.shop/@${data?.name}`}
        openGraph={{
          url: `https://devlog.shop/@${data?.name}`,
        }}
      />
      <UserBlogHeader nickName={data?.nickName} profileImage={data?.profileImage} introduce={data?.introduce} />
      <Styled.Wrap>
        <div className="taps">
          <span>글</span>
        </div>
        {data?.posts.length === 0 ? (
          <div className="none_post">
            <span>작성된 글이 없습니다.</span>
          </div>
        ) : (
          data?.posts?.map((item) => <UserBlogContent key={item.id} item={item} />)
        )}
      </Styled.Wrap>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const userName = (context.query.user as string)?.replace('@', '');
  console.log(userName);
  const user = await axios.get(`${apiAddress()}/user/posts?name=${userName}`).then((res) => res.data);
  console.log(user);
  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
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

    .none_post {
      height: 200px;
      line-height: 200px;
      text-align: center;

      span {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        font-weight: ${({ theme }) => theme.fontWeights.xl};
        color: ${({ theme }) => theme.colors.basic2};
      }
    }
  `,
};

export default UserBlog;
