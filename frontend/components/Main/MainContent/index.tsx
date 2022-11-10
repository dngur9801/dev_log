import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { apiAddress } from '../../../config';
import { reg } from '../../../utils';
import * as S from './MainContent.style';

interface MainContentProps {
  data: {
    id: number;
    title: string;
    content: string;
    writer: string;
    image: null | {
      src: string;
    };
  }[];
}

const MainContent = ({ data }: MainContentProps) => {
  console.log(data);
  return (
    <>
      {data?.map((item) => (
        <S.Content key={item.id}>
          <S.ContentTop>
            <Link href={`@${item.writer}/${item.id}`}>
              <a>
                <div className="content_img">
                  <img
                    src={item?.image?.src ? `${apiAddress()}/${item?.image?.src}` : '/image/noimg.jpeg'}
                    alt="test"
                  />
                </div>
              </a>
            </Link>
          </S.ContentTop>
          <S.ContentMiddle>
            <Link href="/">
              <a>
                <h4 className="title">{item.title}</h4>
                <p className="write">{reg.removeTag(item.content)}</p>
              </a>
            </Link>
            <div className="sub_info">7일전 | 0개의 댓글</div>
          </S.ContentMiddle>
          <S.ContentBottom>
            <Link href="/">
              <a className="profile">
                <img src="/image/test.jpeg" alt="test" />
                <span>{item.writer}</span>
              </a>
            </Link>
            <span className="like">
              <FaHeart color="red" />
              <span>3</span>
            </span>
          </S.ContentBottom>
        </S.Content>
      ))}
    </>
  );
};

export default MainContent;
