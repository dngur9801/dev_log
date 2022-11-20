import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { apiAddress, defaultProfileImage, defaultTitleImage } from '../../../config';
import { PostTypes } from '../../../interfaces';
import { reg } from '../../../utils';
import * as S from './MainContent.style';

interface MainContentProps {
  data: PostTypes[];
}

const MainContent = ({ data }: MainContentProps) => {
  console.log('main:', data);
  return (
    <>
      {data?.map((item) => (
        <S.Content key={item.id}>
          <S.ContentTop>
            <Link href="/[user]/[posturl]" as={`/@${item.user?.name}/${item.id}`}>
              <a>
                <div className="content_img">
                  <img src={item.image?.src ? `${apiAddress()}/${item.image?.src}` : defaultTitleImage()} alt="test" />
                </div>
              </a>
            </Link>
          </S.ContentTop>
          <S.ContentMiddle>
            <Link href="/[user]/[posturl]" as={`/@${item.user?.name}/${item.id}`}>
              <a>
                <h4 className="title">{item.title}</h4>
                <p className="write">{reg.removeTag(item.content)}</p>
              </a>
            </Link>
            <div className="sub_info">
              {item.createdAt} | {item.comments.length}개의 댓글 | 조회수 : {item.viewCnt}
            </div>
          </S.ContentMiddle>
          <S.ContentBottom>
            <Link href="/[user]" as={`/@${item.user?.name}`}>
              <a className="profile">
                <img src={item.user.profileImage ? item.user.profileImage : defaultProfileImage()} alt="profileImage" />
                <span>{item.user?.name}</span>
              </a>
            </Link>
            <span className="like">
              <FaHeart color="red" />
              <span>{item.Likers.length}</span>
            </span>
          </S.ContentBottom>
        </S.Content>
      ))}
    </>
  );
};

export default MainContent;
