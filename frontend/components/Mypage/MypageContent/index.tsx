import * as S from './MypageContent.style';
import { FaHeart } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { userAPI } from '../../../api';
import { AxiosError } from 'axios';
import { PostTypes } from '../../../interfaces';

const MypageContent = () => {
  const { data, error, status } = useQuery<PostTypes, AxiosError>('mypage', userAPI.mypage);
  console.log(data);
  if (status === 'error') {
    alert(error.response.data);
  }
  return (
    <S.Container>
      <div className="taps">
        <span>글</span>
      </div>
      <div className="my_content">
        <img src="/image/test.jpeg" />
        <p className="subject">subject</p>
        <p className="content">aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
      </div>
      <div className="subinfo">
        <span>2022년 7월 11일</span> <span>|</span>
        <span>0개의 댓글</span> <span>|</span>
        <span>
          <FaHeart /> 3
        </span>
      </div>
    </S.Container>
  );
};

export default MypageContent;
