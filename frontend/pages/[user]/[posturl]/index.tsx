import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { postAPI } from '../../../api';
import { apiAddress } from '../../../config';
import CommentBox from '../../../components/DetailPost/CommentBox';
import { userInfo } from '../../../store/atom';
import { CommentTypes } from '../../../interfaces';

interface DataTypes {
  data: {
    Likers: {
      id: number;
      Like: {
        userId: number;
      };
    }[];
    id: number;
    comments: CommentTypes[];
    content: string;
    createdAt: string;
    image: null | {
      src: string;
    };
    title: string;
    user: {
      name: string;
    };
    viewCnt: string;
  };
}

const DetailPost = () => {
  const Viewer = dynamic(() => import('../../../components/common/ViewerBox'), {
    ssr: false,
  });
  const [isLike, setIsLike] = useState(false);
  const [me] = useRecoilState(userInfo);

  const queryClient = useQueryClient();

  const likeBox = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, posturl } = router.query;
  const {
    data: postData,
    error,
    status,
  } = useQuery<DataTypes, AxiosError>('postDetail', () => postAPI.detail(posturl), {
    refetchOnWindowFocus: false,
    enabled: !!posturl,
  });
  const { mutate: removePost }: any = useMutation((data) => postAPI.delete(data));
  const { mutate: addLike }: any = useMutation((data) => postAPI.addLike(data));
  const { mutate: removeLike }: any = useMutation((data) => postAPI.removeLike(data));

  if (status === 'error') {
    alert((error as any).message);
  }

  // 포스트 삭제 클릭 시
  const onClickDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      removePost(posturl, {
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
      addLike(posturl, {
        onSuccess: (data: any, variables: any, context: any) => {
          setIsLike(!isLike);
          queryClient.invalidateQueries('postDetail');
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      });
    } else {
      removeLike(posturl, {
        onSuccess: (data: any, variables: any, context: any) => {
          setIsLike(!isLike);
          queryClient.invalidateQueries('postDetail');
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      });
    }
  };

  // 사이드바 스크롤시 위치고정
  const handleScroll = () => {
    if (window.scrollY > 1300) {
      likeBox.current.style.top = String(`${window.scrollY - 1260 + 'px'}`);
    } else {
      likeBox.current.style.top = '40px';
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
    const findLiker = postData?.data?.Likers?.some((item) => item.Like.userId === me?.id);
    if (!findLiker) {
      setIsLike(false);
    } else {
      setIsLike(true);
    }
  }, [postData]);
  return (
    <>
      <Styled.Header image={postData?.data?.image?.src}>
        <div className="back_img"></div>
        <div className="bg"></div>
        <Styled.Title>
          <p>{postData?.data?.title}</p>
          <span>
            {postData?.data?.user?.name} | {postData?.data?.createdAt?.split('T')[0]}
          </span>
          <span>조회 수 : {postData?.data?.viewCnt}</span>
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
          <Viewer content={postData?.data?.content} />
          <Styled.LikeBox ref={likeBox}>
            <div className="inner">
              {isLike ? (
                <FaHeart size={'36px'} onClick={onClickSetLike} color={'red'} />
              ) : (
                <FaRegHeart size={'36px'} onClick={onClickSetLike} />
              )}
              <div>{postData?.data?.Likers?.length}</div>
            </div>
          </Styled.LikeBox>
        </Styled.Content>
        <CommentBox comments={postData?.data?.comments} />
      </Styled.ContentWrap>
    </>
  );
};

export default DetailPost;

const Styled = {
  Header: styled.div<{ image: string }>`
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
    position: absolute;
    top: 500px;
    left: 200px;
    color: white;
    p {
      font-size: ${({ theme }) => theme.fontSizes.titleXXL};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
      margin-bottom: 2rem;
    }
    span {
      display: block;
      font-size: ${({ theme }) => theme.fontSizes.lg};
      margin-bottom: 1.5rem;
    }
  `,
  ContentWrap: styled.div`
    max-width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
  `,
  ContentBtn: styled.div`
    margin-bottom: 40px;
    text-align: right;

    button {
      padding: 10px 20px;
      margin-right: 10px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      border-radius: 5px;
    }
  `,
  Content: styled.div`
    position: relative;
  `,
  LikeBox: styled.div`
    position: absolute;
    left: -7rem;
    top: 40px;
    border-radius: 20px;
    background-color: #eee;
    padding: 10px;

    .inner {
      svg {
        cursor: pointer;
      }
      div {
        margin-top: 10px;
        text-align: center;
        font-size: ${({ theme }) => theme.fontSizes.xl};
        font-weight: ${({ theme }) => theme.fontWeights.xl};
      }
    }
  `,
};
