import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { postAPI } from '../../../api';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { apiAddress } from '../../../config';
import Comment from '../../../components/DetailPost/Comment';

const DetailPost = () => {
  const Viewer = dynamic(() => import('../../../components/common/ViewerBox'), {
    ssr: false,
  });

  const router = useRouter();
  const { user, posturl } = router.query;
  const { data, error, status } = useQuery('postDetail', () => postAPI.detail(posturl), {
    refetchOnWindowFocus: false,
    enabled: !!posturl,
  });
  const { mutate: remove }: any = useMutation((data) => postAPI.delete(data));

  if (status === 'error') {
    alert((error as any).message);
  }

  console.log('Detail:', data);

  // 포스트 삭제 클릭 시
  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      remove(posturl, {
        onSuccess: (data: any, variables: any, context: any) => {
          alert('삭제가 완료되었습니다.');
          router.replace('/');
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      });
    }
  };
  return (
    <>
      <Styled.Header image={data?.data?.image?.src}>
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
      <Styled.ContentWrap>
        <Styled.ContentBtn>
          <button type="button" onClick={() => router.push(`/${user}/${posturl}/edit`)}>
            포스트 수정
          </button>
          <button type="button" onClick={onClickDelete}>
            포스트 삭제
          </button>
        </Styled.ContentBtn>
        <Styled.Content>
          <Viewer content={data?.data?.content} />
        </Styled.Content>
        <Comment commentDatas={data?.data?.comments} />
      </Styled.ContentWrap>
    </>
  );
};

export default DetailPost;

const Styled = {
  Header: styled.div<{ image: string }>`
    posiiton: relative;
    margin-bottom: 5rem;
    .back_img {
      background-image: url(${({ image }) => (image ? `${apiAddress()}/${image}` : '/image/noimg.jpeg')});
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
  ContentWrap: styled.div`
    max-width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
  `,
  ContentBtn: styled.div`
    text-align: right;

    button {
      padding: 10px 20px;
      margin-right: 10px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      border-radius: 5px;
    }
  `,
  Content: styled.div``,
};
