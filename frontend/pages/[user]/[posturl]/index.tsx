import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { postAPI } from '../../../api';
import CommentBox from '../../../components/DetailPost/CommentBox';
import { PostTypes } from '../../../interfaces';
import { DETAIL_POST } from '../../../constant/queryKey';
import Header from '../../../components/DetailPost/Header';
import Content from '../../../components/DetailPost/Content';
import { GetServerSidePropsContext } from 'next';

const DetailPost = () => {
  const Viewer = dynamic(() => import('../../../components/Common/ViewerBox'), {
    ssr: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [storageId, setStorageId] = useState(null);
  const {
    data: postData,
    error,
    status,
    refetch,
  } = useQuery<PostTypes, AxiosError<ReactNode>>(DETAIL_POST, () => postAPI.detail(storageId), {
    refetchOnWindowFocus: false,
    enabled: !!storageId,
  });
  const [isLike, setIsLike] = useState(postData.isLike === 1 ? true : false);
  const likeRef = useRef<HTMLDivElement>(null);

  const { mutate: removePost } = useMutation((data: string | string[]) => postAPI.delete(data));
  const { mutate: addLike } = useMutation((data: string | string[]) => postAPI.addLike(data));
  const { mutate: removeLike } = useMutation((data: string | string[]) => postAPI.removeLike(data));

  console.log('Detail : ', postData);

  // 포스트 삭제 클릭 시
  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removePost(storageId, {
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

  // like 버튼 클릭 시
  const onClickSetLike = () => {
    if (!isLike) {
      addLike(storageId, {
        onSuccess: () => {
          setIsLike(!isLike);
          refetch();
        },
        onError: (error: any) => {
          alert(error.response.data);
        },
      });
    } else {
      removeLike(storageId, {
        onSuccess: () => {
          setIsLike(!isLike);
          refetch();
        },
        onError: (error: any) => {
          alert(error.response.data);
        },
      });
    }
  };

  // 사이드바 스크롤시 위치고정
  const handleScroll = () => {
    if (!likeRef.current) {
      return;
    }
    if (window.scrollY > 1300) {
      console.log(9999);
      likeRef.current.style.top = String(`${window.scrollY - 1260 + 'px'}`);
    } else {
      if (likeRef.current) likeRef.current.style.top = '40px';
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener('scroll', handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 게시물 id값 쿠키에 저장
  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id as string);
    }
    setStorageId(localStorage.getItem('id'));
  }, [id]);

  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  return (
    <>
      <Header data={postData} />
      <Styled.ContentWrap>
        <Content
          data={postData}
          storageId={storageId}
          onClickDelete={onClickDelete}
          Viewer={Viewer}
          onClickSetLike={onClickSetLike}
          isLike={isLike}
        />
        <CommentBox comments={postData?.comments} storageId={storageId} refetch={refetch} />
      </Styled.ContentWrap>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(DETAIL_POST, () => postAPI.detail(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default DetailPost;

const Styled = {
  ContentWrap: styled.div`
    max-width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;

    @media ${({ theme }) => theme.device.tablet} {
      width: calc(100% - 2rem);
    }
  `,
};
