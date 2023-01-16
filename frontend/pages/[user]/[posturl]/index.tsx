import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { NextSeo } from 'next-seo';
import { postAPI } from '../../../apis';
import CommentBox from '../../../components/DetailPost/CommentBox';
import { PostTypes } from '../../../interfaces';
import { DETAIL_POST } from '../../../constant/queryKey';
import Header from '../../../components/DetailPost/Header';
import Content from '../../../components/DetailPost/Content';
import { GetServerSidePropsContext } from 'next';
import CustomAlert from '../../../components/Common/CustomAlert';
import { apiAddress } from '../../../config';

const Viewer = dynamic(() => import('../../../components/Common/ViewerBox'), {
  ssr: false,
});
let likeTop: number;
const DetailPost = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const router = useRouter();
  const { posturl } = router.query;
  const { data: postData, refetch } = useQuery<PostTypes, AxiosError<ReactNode>>(
    [DETAIL_POST, posturl],
    () => postAPI.detail(posturl),
    {
      refetchOnWindowFocus: false,
      enabled: !!posturl,
    },
  );

  const [isLike, setIsLike] = useState(postData?.isLike === 1 ? true : false);
  const likeRef = useRef<HTMLDivElement>(null);

  const { mutate: removePost } = useMutation((data: number) => postAPI.delete(data));
  const { mutate: addLike } = useMutation((data: number) => postAPI.addLike(data));
  const { mutate: removeLike } = useMutation((data: number) => postAPI.removeLike(data));

  // 포스트 삭제 클릭 시
  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removePost(postData.id, {
        onSuccess: () => {
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
    if (window.scrollY > likeTop) {
      likeRef.current.style.top = window.scrollY - likeTop + 111 + 'px';
    } else {
      likeRef.current.style.top = '111px';
    }
  };
  useEffect(() => {
    likeTop = likeRef.current.getBoundingClientRect().top + window.scrollY - (111 + 90);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <NextSeo
        title={postData?.title}
        description={`${postData?.title}`}
        canonical={`https://devlog.shop/@${postData?.user?.name}/${postData?.urlTitle}`}
        openGraph={{
          url: `https://devlog.shop/@${postData?.user?.name}/${postData?.urlTitle}`,
        }}
      />
      <Header data={postData} />
      <Styled.ContentWrap>
        <Content
          data={postData}
          posturl={posturl}
          onClickDelete={onClickDelete}
          Viewer={Viewer}
          onClickSetLike={onClickSetLike}
          isLike={isLike}
          likeRef={likeRef}
        />
        <CommentBox comments={postData?.comments} postId={postData?.id} refetch={refetch} />
      </Styled.ContentWrap>
      {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const postUrl = context.query?.posturl;
  const post = await axios.get(encodeURI(`${apiAddress()}/post/detail/${postUrl}`)).then((res) => res.data);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([DETAIL_POST, postUrl], () =>
    axios.get(encodeURI(`${apiAddress()}/post/detail/${postUrl}`)).then((res) => res.data),
  );

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
