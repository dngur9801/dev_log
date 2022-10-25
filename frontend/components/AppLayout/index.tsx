import { FaSearch, FaSun, FaListUl } from 'react-icons/fa';
import Image from 'next/image';
import * as S from './AppLayout.style';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../store/atom';
import { userAPI } from '../../api';
import { UserInfoTypes } from '../../interfaces';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
type Props = {
  children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useRecoilState(userInfo);

  const { mutate }: any = useMutation(() => userAPI.logout());

  const router = useRouter();

  // 로그아웃
  const onClickLogout = () => {
    mutate('', {
      onSuccess: () => {
        router.replace('/');
        setUser({ email: '', name: '' });
      },
    });
  };

  useEffect(() => {
    // 유저 정보 요청
    (async () => {
      const { data } = await userAPI.getInfo();
      // const data: UserInfoTypes = response.data;
      setUser(data);
    })();
  }, []);
  console.log(user);

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
              <Link href="/mypage">
                <a>{user?.name ? user?.name : 'member'}.log</a>
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
                  <Image src="/image/default_profile_img.png" alt="profile_img" width={50} height={50} />
                  <FaListUl size="24px" />
                  {toggle && (
                    <div className="my_list">
                      <div>
                        <Link href="/mypage">
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
