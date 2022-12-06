import { FaHeart } from 'react-icons/fa';
import * as S from './UserBlogContent.style';
import { PostTypes } from '../../../interfaces';
import { apiAddress, defaultTitleImage } from '../../../config';
import { reg } from '../../../utils';
import Link from 'next/link';

interface UserBlogContentPropTypes {
  item: PostTypes;
}

const UserBlogContent = ({ item }: UserBlogContentPropTypes) => {
  return (
    <S.Content>
      <div className="my_content">
        <Link href={`/@${item.user?.name}/${item.id}`}>
          <a className="image_box">
            <img src={item.image?.src ? `${apiAddress()}/${item.image?.src}` : defaultTitleImage()} alt="" />
          </a>
        </Link>
        <Link href={`/@${item.user?.name}/${item.id}`}>
          <a>
            <p className="subject">{item.title}</p>
          </a>
        </Link>
        <p className="content">{reg.removeTag(item.content)}</p>
      </div>
      <div className="subinfo">
        <span>{item.createdAt}</span> <span>|</span>
        <span>{item.comments.length}개의 댓글</span> <span>|</span>
        <span className="likes">
          <FaHeart size={'16px'} /> {item.Likers.length}
        </span>
      </div>
    </S.Content>
  );
};

export default UserBlogContent;
