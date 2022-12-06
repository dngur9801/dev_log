import { NextPage } from 'next';
import UserBlogHeader from '../../components/UserBlog/UserBlogHeader';
import UserBlogContent from '../../components/UserBlog/UserBlogContent';
import Seo from '../../components/Seo';
import { userAPI } from '../../api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ResponsePostsTypes } from '../../interfaces';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { USER_POSTS } from '../../constant/queryKey';
import { ReactNode } from 'react';

const UserBlog: NextPage = () => {
  const route = useRouter();
  const userName = (route.query.user as string)?.replace('@', '');
  const { data, error, status } = useQuery<ResponsePostsTypes, AxiosError<ReactNode>>(
    [USER_POSTS, userName],
    () => userAPI.posts(userName),
    {
      enabled: !!userName,
      refetchOnWindowFocus: false,
    },
  );
  console.log(data);
  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  return (
    <>
      <Seo>Devlog</Seo>
      <UserBlogHeader
        nickName={data?.data[0]?.user.nickName}
        profileImage={data?.data[0]?.user.profileImage}
        introduce={data?.data[0]?.user.introduce}
      />
      <Styled.Wrap>
        <div className="taps">
          <span>글</span>
        </div>
        {data?.data.map((item) => (
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
