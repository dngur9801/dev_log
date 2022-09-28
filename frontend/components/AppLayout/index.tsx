import { FaSearch, FaSun, FaListUl } from 'react-icons/fa';
import Image from 'next/image';
import * as S from './AppLayout.style';
import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './LoginModal';

type Props = {
  children: JSX.Element;
};

const AppLayout = ({ children }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  return (
    <>
      <S.HeaderWrap>
        <S.Header>
          <div className="blog_name">
            <Link href="/">
              <a>Devlog</a>
            </Link>
          </div>
          <S.MyTitle>dngur9801.log</S.MyTitle>
          <S.HeaderRight>
            <FaSun size="24px" cursor="pointer" />
            <FaSearch size="24px" cursor="pointer" />
            {isLogin ? (
              <>
                <S.WriteBtn>새 글 작성</S.WriteBtn>
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
                        <Link href="/mypage">
                          <a>새 글 작성</a>
                        </Link>
                      </div>
                      <div>
                        <Link href="/setting">
                          <a>설정</a>
                        </Link>
                      </div>
                      <div>
                        <a>로그아웃</a>
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
