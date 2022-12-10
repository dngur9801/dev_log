import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import UserBlogContent from '../components/Common/UserBlogContent';
import { useQuery } from 'react-query';
import { PostTypes } from '../interfaces';
import { AxiosError } from 'axios';
import { postAPI } from '../api';
import { debounce } from '../utils';
import { SEARCH_POST } from '../constant/queryKey';
const Search = () => {
  const [keyword, setKeyword] = useState(null);
  const {
    data: searchData,
    error,
    status,
  } = useQuery<PostTypes[], AxiosError<ReactNode>>([SEARCH_POST, keyword], () => postAPI.search(keyword), {
    refetchOnWindowFocus: false,
    enabled: !!keyword,
    select: (data) => data.slice(0, 10),
  });
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => setKeyword(e.target.value), 500)();
  };

  if (status === 'error') {
    return <span>{error.response.data}</span>;
  }
  return (
    <Styled.Wrap>
      <div className="search_input">
        <FaSearch />
        <input type="text" placeholder="검색어를 입력하세요." onChange={onChangeInput} />
      </div>
      {searchData?.map((item) => (
        <UserBlogContent key={item.id} item={item} />
      ))}
    </Styled.Wrap>
  );
};

export default Search;

const Styled = {
  Wrap: styled.div`
    width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
    margin-top: 60px;

    .search_input {
      display: flex;
      align-items: center;
      padding: 0 20px;
      background-color: ${({ theme }) => theme.backgroundColors.default};
      border: 1px solid ${({ theme }) => theme.colors.default};
      svg {
        width: 24px;
        height: 24px;
        margin-right: 10px;
      }

      input {
        width: 90%;
        height: 50px;
        border: 0;
        background-color: ${({ theme }) => theme.backgroundColors.default};
        caret-color: ${({ theme }) => theme.colors.black1};
        color: ${({ theme }) => theme.colors.default};
        font-size: ${({ theme }) => theme.fontSizes.lg};
        &:focus {
          outline: none;
        }
        &::placeholder {
          color: ${({ theme }) => theme.colors.black1};
          font-size: ${({ theme }) => theme.fontSizes.lg};
        }
      }
    }

    @media ${({ theme }) => theme.device.tablet} {
      width: calc(100% - 2rem);
    }
  `,
};
