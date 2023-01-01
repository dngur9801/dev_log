import { FaHeart } from 'react-icons/fa';
import { PostTypes } from '../../interfaces';
import { apiAddress, defaultTitleImage } from '../../config';
import { reg } from '../../utils';
import Link from 'next/link';
import styled from 'styled-components';

interface UserBlogContentPropTypes {
  item: PostTypes;
}

const UserBlogContent = ({ item }: UserBlogContentPropTypes) => {
  return (
    <Styled.Content>
      <div className="my_content">
        <Link
          href={{
            pathname: '/[user]/[posturl]',
            query: {
              id: item.id,
            },
          }}
          as={`/@${item.user?.name}/${reg.changeHyphen(item.title)}`}
        >
          <a className="image_box">
            <img src={item.image?.src ? `${apiAddress()}/${item.image?.src}` : defaultTitleImage()} alt="" />
          </a>
        </Link>
        <Link
          href={{
            pathname: '/[user]/[posturl]',
            query: {
              id: item.id,
            },
          }}
          as={`/@${item.user?.name}/${reg.changeHyphen(item.title)}`}
        >
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
    </Styled.Content>
  );
};

const Styled = {
  Content: styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #ccc;

    @media ${({ theme }) => theme.device.tablet} {
      margin: 1rem;
    }

    .my_content {
      margin-top: 50px;

      a.image_box {
        display: block;
        padding-top: 56.125%;
        position: relative;

        img {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }

      .subject {
        padding: 10px 0;
        font-size: ${({ theme }) => theme.fontSizes.xxxl};
        font-weight: ${({ theme }) => theme.fontWeights.xl};
      }

      .content {
        padding: 10px 0;
        font-size: ${({ theme }) => theme.fontSizes.xl};
        font-weight: ${({ theme }) => theme.fontWeights.small};
      }
    }

    .subinfo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 30px;
      color: ${({ theme }) => theme.colors.gray2};

      .likes {
        display: flex;
        gap: 5px;
        align-items: center;

        svg {
          margin-bottom: -1px;
          color: red;
          vertical-align: 5px;
        }
      }
    }
  `,
};

export default UserBlogContent;
