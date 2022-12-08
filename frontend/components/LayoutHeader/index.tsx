import { FaSearch, FaSun, FaMoon, FaListUl } from 'react-icons/fa';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import LoginModal from './LoginModal';
import * as Styled from './LayoutHeader.style';
import { darkMode, userInfo } from '../../store/atom';
import { userAPI } from '../../api';
import { initUserInfoData } from '../../utils';
import { UserInfoTypes } from '../../interfaces';
import ProfileImage from '../Common/ProfileImage';
import { USER_INFO } from '../../constant/queryKey';
import useScroll from '../../hooks/useScroll';
import { useCookies } from 'react-cookie';

const LayoutHeader = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useRecoilState(userInfo);
  const [darkmode, setDarkmode] = useRecoilState(darkMode);
  const { hide, pageY, throttleScroll } = useScroll(50);
  const [cookies, setCookie] = useCookies(['theme']);

  const { mutate }: any = useMutation(() => userAPI.logout());
  const {
    data: userData,
    error,
    status,
  } = useQuery<UserInfoTypes, AxiosError<ReactNode>>(USER_INFO, userAPI.info, {
    refetchOnWindowFocus: false,
    // enabled: false,
  });
  const router = useRouter();
  const queryClient = useQueryClient();

  // 로그아웃
  const onClickLogout = () => {
    mutate('', {
      onSuccess: () => {
        router.replace('/');
        setUser(initUserInfoData());
      },
      onError: (error: any, variables: any, context: any) => {
        router.replace('/');
        queryClient.removeQueries(USER_INFO);
        setUser(initUserInfoData());
      },
    });
  };

  // darkMode or lightMode toggle
  const onClickSetMode = () => {
    cookies.theme === 'dark' ? setCookie('theme', 'light') : setCookie('theme', 'dark');
    setDarkmode(!darkmode);
  };

  // 유저 정보 요청
  useEffect(() => {
    setUser(userData);
    userData || queryClient.removeQueries(USER_INFO);
  }, []);
  console.log('userData:', userData);

  // 스크롤시 헤더 감지
  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => window.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }
  return (
    <>
      <Styled.Wrap>
        <Styled.HeaderBox hide={hide}>
          <Styled.Header>
            <div className="blog_name">
              <Link href="/">
                <a>Devlog</a>
              </Link>
            </div>
            <Styled.MyTitle>
              {userData?.email && (
                <Link href="/[user]" as={`/@${userData?.name}`}>
                  <a>{userData?.blogName || userData?.name}.log</a>
                </Link>
              )}
            </Styled.MyTitle>
            <Styled.HeaderRight>
              {darkmode ? (
                <FaMoon size="24px" onClick={onClickSetMode} />
              ) : (
                <FaSun size="24px" onClick={onClickSetMode} />
              )}
              <FaSearch size="24px" />
              {userData?.email ? (
                <>
                  <Styled.WriteBtn>
                    <Link href="/write">
                      <a>새 글 작성</a>
                    </Link>
                  </Styled.WriteBtn>
                  <Styled.MyPageWrap onClick={() => setMenuToggle(!menuToggle)}>
                    <ProfileImage width={50} height={50} src={userData?.profileImage} />
                    <FaListUl size="24px" />
                    {menuToggle && (
                      <div className="my_list">
                        <div>
                          <Link href="/[user]" as={`/@${userData?.name}`}>
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
                  </Styled.MyPageWrap>
                </>
              ) : (
                <Styled.HeaderRight>
                  <button className="login" onClick={() => setLoginModal(true)}>
                    로그인
                  </button>
                  {loginModal && <LoginModal setLoginModal={setLoginModal} />}
                </Styled.HeaderRight>
              )}
            </Styled.HeaderRight>
          </Styled.Header>
        </Styled.HeaderBox>
      </Styled.Wrap>
    </>
  );
};
export default LayoutHeader;
