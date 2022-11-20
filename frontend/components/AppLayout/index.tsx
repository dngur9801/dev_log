import { FaSearch, FaSun, FaListUl } from 'react-icons/fa';
import Image from 'next/image';
import * as S from './AppLayout.style';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../store/atom';
import { userAPI } from '../../api';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { defaultProfileImage } from '../../config';
import { initUserInfoData } from '../../utils';
import { AxiosError } from 'axios';
import { ResponseUserInfoTypes, UserInfoTypes } from '../../interfaces';
type Props = {
  children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useRecoilState(userInfo);

  const { mutate }: any = useMutation(() => userAPI.logout());
  const { data, error, status } = useQuery<ResponseUserInfoTypes, AxiosError<ReactNode>>('userInfo', userAPI.info, {
    refetchOnWindowFocus: false,
  });
  const router = useRouter();

  // 로그아웃
  const onClickLogout = () => {
    mutate('', {
      onSuccess: () => {
        router.replace('/');
        setUser(initUserInfoData());
      },
      onError: (error: any, variables: any, context: any) => {
        router.replace('/');
        setUser(initUserInfoData());
      },
    });
  };

  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }

  // 유저 정보 요청
  useEffect(() => {
    setUser(data?.data);
  }, [data]);
  console.log('AppLayout:', user);

  return (
    <>
      <S.HeaderWrap>
        <S.Header>
          <div className="blog_name">
            <Link href="/">
              <a>Devlog</a>
            </Link>
          </div>
          <S.MyTitle>
            {user?.email && (
              <Link href="/[user]" as={`/@${user.name}`}>
                <a>{user?.name}.log</a>
              </Link>
            )}
          </S.MyTitle>
          <S.HeaderRight>
            <FaSun size="24px" cursor="pointer" />
            <FaSearch size="24px" cursor="pointer" />
            {user?.email ? (
              <>
                <S.WriteBtn>
                  <Link href="/write">
                    <a>새 글 작성</a>
                  </Link>
                </S.WriteBtn>
                <S.MyPageWrap onClick={() => setToggle(!toggle)}>
                  <Image
                    src={user?.profileImage ? user?.profileImage : defaultProfileImage()}
                    alt="profile_img"
                    width={50}
                    height={50}
                  />
                  <FaListUl size="24px" />
                  {toggle && (
                    <div className="my_list">
                      <div>
                        <Link href="/[user]" as={`/@${user.name}`}>
                          <a>마이페이지</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/write">
                          <a>새 글 작성</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/setting">
                          <a>설정</a>
                        </Link>
                      </div>
                      <div>
                        <a onClick={onClickLogout}>로그아웃</a>
                      </div>
                    </div>
                  )}
                </S.MyPageWrap>
              </>
            ) : (
              <>
                <button className="login" onClick={() => setLoginModal(true)}>
                  로그인
                </button>
                {loginModal && <LoginModal setLoginModal={setLoginModal} />}
              </>
            )}
          </S.HeaderRight>
        </S.Header>
      </S.HeaderWrap>
      {children}
    </>
  );
};
export default AppLayout;
