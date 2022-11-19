import { NextPage } from 'next';
import UserBlogHeader from '../../components/UserBlog/UserBlogHeader';
import UserBlogContent from '../../components/UserBlog/UserBlogContent';
import Seo from '../../components/Seo';
import { userAPI } from '../../api';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { ResponsePostTypes } from '../../interfaces';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const UserBlog: NextPage = () => {
  const route = useRouter();
  const userName = (route.query.user as string)?.replace('@', '');
  const { data, error, status } = useQuery<ResponsePostTypes, AxiosError>(
    ['userPosts', userName],
    () => userAPI.posts(userName),
    {
      enabled: !!userName,
      refetchOnWindowFocus: false,
    },
  );
  console.log(data);
  if (status === 'error') {
    alert(error.response.data);
  }
  console.log(userName);

  return (
    <>
      <Seo>Devlog</Seo>
      <UserBlogHeader />
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

    .taps {
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizes.xl};

      span {
        display: inline-block;
        width: 120px;
        padding: 10px 0;
        border-bottom: 2px solid ${({ theme }) => theme.colors.blue1};
        color: ${({ theme }) => theme.colors.blue1};
      }
    }
  `,
};

export default UserBlog;
