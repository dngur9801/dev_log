import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { NextSeo } from 'next-seo';
import { postAPI } from '../../../apis';
import CommentBox from '../../../components/DetailPost/CommentBox';
import { PostTypes } from '../../../interfaces';
import { DETAIL_POST } from '../../../constant/queryKey';
import Header from '../../../components/DetailPost/Header';
import Content from '../../../components/DetailPost/Content';
import { GetServerSidePropsContext } from 'next';
import { useCookies } from 'react-cookie';
import CustomAlert from '../../../components/Common/CustomAlert';

const Viewer = dynamic(() => import('../../../components/Common/ViewerBox'), {
  ssr: false,
});
const DetailPost = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [cookies, setCookies, deleteCookies] = useCookies(['postId']);

  const router = useRouter();
  const { id } = router.query;
  const {
    data: postData,
    error,
    status,
    refetch,
  } = useQuery<PostTypes, AxiosError<ReactNode>>(DETAIL_POST, () => postAPI.detail(cookies.postId), {
    refetchOnWindowFocus: false,
    enabled: !!cookies.postId,
  });
  const [isLike, setIsLike] = useState(postData.isLike === 1 ? true : false);
  const likeRef = useRef<HTMLDivElement>(null);

  const { mutate: removePost } = useMutation((data: number) => postAPI.delete(data));
  const { mutate: addLike } = useMutation((data: number) => postAPI.addLike(data));
  const { mutate: removeLike } = useMutation((data: number) => postAPI.removeLike(data));

  // 포스트 삭제 클릭 시
  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removePost(postData.id, {
        onSuccess: () => {
          setIsAlert(true);
          setAlertText('😁 삭제가 완료되었습니다.');
          router.replace('/');
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
        },
      });
    }
  };

  // like 버튼 클릭 시
  const onClickSetLike = () => {
    if (!isLike) {
      addLike(postData.id, {
        onSuccess: () => {
          setIsLike(!isLike);
          refetch();
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
        },
      });
    } else {
      removeLike(postData.id, {
        onSuccess: () => {
          setIsLike(!isLike);
          refetch();
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
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

  useEffect(() => {
    setCookies('postId', id || postData.id);

    return () => deleteCookies('postId');
  }, []);
  if (status === 'error') {
    return <span>{error?.response?.data}</span>;
  }

  return (
    <>
      <NextSeo
        title={postData.title}
        description={`${postData.title} description`}
        canonical="https://devlog.shop"
        openGraph={{
          url: 'https://devlog.shop',
        }}
      />
      <Header data={postData} />
      <Styled.ContentWrap>
        <Content
          data={postData}
          postId={postData.id}
          onClickDelete={onClickDelete}
          Viewer={Viewer}
          onClickSetLike={onClickSetLike}
          isLike={isLike}
        />
        <CommentBox comments={postData?.comments} postId={postData.id} refetch={refetch} />
      </Styled.ContentWrap>
      {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.query?.id;
  const cookie = context.req.cookies;

  const postId = id || cookie.postId;

  if (!id && !postId) {
    return {
      notFound: true,
    };
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(DETAIL_POST, () => postAPI.detail(postId));

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
