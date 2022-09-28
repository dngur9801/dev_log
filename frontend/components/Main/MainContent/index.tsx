import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import * as S from './MainContent.style';

const MainContent = () => {
  return (
    <>
      <S.Content>
        <S.ContentTop>
          <Link href="/">
            <a>
              <div className="content_img">
                <img src="/image/test.jpeg" alt="test" />
              </div>
            </a>
          </Link>
        </S.ContentTop>
        <S.ContentMiddle>
          <Link href="/">
            <a>
              <h4 className="title">제목</h4>
              <p className="write">
                글글글그륽ㄹ읾ㄴ일밍ㄴㄹㅁ이ㅣㅁㄴㅇ리글글글그륽ㄹ읾ㄴ일밍ㄴㄹㅁ이ㅣㅁㄴㅇ리글글글그륽ㄹ읾ㄴ일밍ㄴㄹㅁ이ㅣㅁㄴㅇ리ㅁ이ㅣㅁㄴㅇ리글글글그륽ㄹ읾ㄴ일밍ㄴㄹㅁ이ㅣㅁㄴㅇ리글글글그륽ㄹ읾ㄴ일밍ㄴㄹㅁ이ㅣㅁㄴㅇ리
              </p>
            </a>
          </Link>
          <div className="sub_info">7일전 | 0개의 댓글</div>
        </S.ContentMiddle>
        <S.ContentBottom>
          <Link href="/">
            <a className="profile">
              <img src="/image/test.jpeg" alt="test" />
              <span>이름</span>
            </a>
          </Link>
          <span className="like">
            <FaHeart color="red" />
            <span>3</span>
          </span>
        </S.ContentBottom>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
      <S.Content>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
        <div>s21</div>
      </S.Content>
    </>
  );
};

export default MainContent;
