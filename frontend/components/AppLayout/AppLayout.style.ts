import styled from 'styled-components';

export const HeaderWrap = styled.div`
  width: 100%;
  height: 100px;
  font-size: ${({ theme }) => theme.fontSizes.xl};

  @media ${({ theme }) => theme.device.laptop} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ theme }) => theme.deviceWrapSizes.default};
  height: 100%;
  margin: 0 auto;

  .blog_name {
    font-weight: ${({ theme }) => theme.fontWeights.lg};
    font-size: ${({ theme }) => theme.fontSizes.title};
  }

  @media ${({ theme }) => theme.device.laptopL} {
    width: ${({ theme }) => theme.deviceWrapSizes.laptopL};
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: ${({ theme }) => theme.deviceWrapSizes.laptop};
  }
  @media ${({ theme }) => theme.device.tabletL} {
    width: ${({ theme }) => theme.deviceWrapSizes.tabletL};
  }
`;

export const MyTitle = styled.div`
  @media ${({ theme }) => theme.device.tabletL} {
    display: none;
  }
`;

export const WriteBtn = styled.button`
  font-size: 1rem;
  padding: 0 1rem;
  height: 2rem;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: black;
    color: white;
  }

  @media ${({ theme }) => theme.device.tabletL} {
    display: none;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: ${({ theme }) => theme.fontSizes.base};

  .login {
    padding: 8px 20px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    background-color: ${({ theme }) => theme.colors.black1};
    color: white;
    border-radius: 10px;
  }
`;

export const MyPageWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  img {
    border-radius: 100%;
  }

  .my_list {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 20px;
    z-index: 1000;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.58);
    font-size: ${({ theme }) => theme.fontSizes.lg};

    div {
      a {
        display: inline-block;
        width: 200px;
        padding: 1rem;
        background-color: white;

        &:hover {
          background-color: ${({ theme }) => theme.backgroundColors.gray1};
          color: ${({ theme }) => theme.colors.blue1};
        }
      }
    }
  }
`;
