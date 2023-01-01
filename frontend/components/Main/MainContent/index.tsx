import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { apiAddress, defaultTitleImage } from '../../../config';
import { PostTypes } from '../../../interfaces';
import { reg } from '../../../utils';
import ProfileImage from '../../Common/ProfileImage';
import * as Styled from './MainContent.style';

interface MainContentProps {
  data: PostTypes[];
}

const MainContent = ({ data }: MainContentProps) => {
  return (
    <Styled.Container>
      <Styled.Wrap>
        {data?.map((item) => (
          <Styled.Content key={item.id}>
            <Styled.ContentTop>
              <Link
                href={{
                  pathname: '/[user]/[posturl]',
                }}
                as={`/@${item.user?.name}/${item.urlTitle}`}
              >
                <a>
                  <div className="content_img">
                    <img
                      src={item.image?.src ? `${apiAddress()}/${item.image?.src}` : defaultTitleImage()}
                      alt="test"
                    />
                  </div>
                </a>
              </Link>
            </Styled.ContentTop>
            <Styled.ContentMiddle>
              <Link
                href={{
                  pathname: '/[user]/[posturl]',
                }}
                as={`/@${item.user?.name}/${item.urlTitle}`}
              >
                <a>
                  <h4 className="title">{item.title}</h4>
                  <p className="write">{reg.removeTag(item.content)}</p>
                </a>
              </Link>
              <div className="sub_info">
                {item.createdAt} | {item.comments.length}개의 댓글
              </div>
            </Styled.ContentMiddle>
            <Styled.ContentBottom>
              <Link href="/[user]" as={`/@${item.user?.name}`}>
                <a className="profile">
                  <ProfileImage width={24} height={24} src={item.user.profileImage} />
                  <span>{item.user?.name}</span>
                </a>
              </Link>
              <span className="like">
                <FaHeart color="red" />
                <span>{item?.likeCount}</span>
              </span>
            </Styled.ContentBottom>
          </Styled.Content>
        ))}
      </Styled.Wrap>
    </Styled.Container>
  );
};

export default MainContent;
