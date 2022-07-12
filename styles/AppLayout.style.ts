import styled from 'styled-components';

export const HeaderWrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f8f9fa;
  font-size: ${({ theme }) => theme.fontSizes.fontSizeL};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1800px;
  height: 100%;
  margin: 0 auto;

  @media ${({ theme }) => theme.device.laptopL} {
    width: 1390px;
  }
`;

export const WriteBtn = styled.span`
  display: inline-block;
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: ${({ theme }) => theme.fontSizes.fontSizeM};
`;

export const MyPageWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  img {
    border-radius: 100%;
  }
`;
