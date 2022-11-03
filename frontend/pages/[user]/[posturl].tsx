import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { postAPI } from '../../api';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

const Viewer = dynamic(() => import('../../components/common/ViewerBox'), {
  ssr: false,
});

const DetailPost = () => {
  const router = useRouter();
  const posturl = router.query.posturl;
  const { data, error, status } = useQuery('postDetail', () => postAPI.getDetail(posturl), {
    refetchOnWindowFocus: false,
    enabled: !!posturl,
  });

  console.log(data);
  return (
    <>
      <Styled.Header>
        <div className="back_img"></div>
        <div className="bg"></div>
        <Styled.Title>
          <p>{data?.data?.title}</p>
          <span>
            {data?.data?.writer} | {data?.data?.createdAt?.split('T')[0]}
          </span>
          <span>조회 수 : {data?.data?.viewCnt}</span>
        </Styled.Title>
      </Styled.Header>
      <Styled.Content>
        <Viewer content={data?.data?.content} />
      </Styled.Content>
    </>
  );
};

export default DetailPost;

const Styled = {
  Header: styled.div`
    posiiton: relative;
    margin-bottom: 5rem;
    .back_img {
      background-image: url('/image/test.jpeg');
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: cover;
      width: 100%;
      height: 100vh;
    }

    .bg {
      background-color: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 80px;
    }
  `,
  Title: styled.div`
    position:absolute;
    top:500px;
    left:200px;
    color:white;
    p {
      font-size: ${({ theme }) => theme.fontSizes.titleXXL};
      font-weight ${({ theme }) => theme.fontWeights.xl};
      margin-bottom:2rem;
      }
    span {
      display:block;
      font-size: ${({ theme }) => theme.fontSizes.lg};
      margin-bottom:1.5rem;
    }
  `,
  Content: styled.div`
    max-width: ${({ theme }) => theme.deviceWrapSizes.laptop};
    margin: 0 auto;
  `,
};
