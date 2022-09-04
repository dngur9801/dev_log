import styled from 'styled-components';

export const Container = styled.div`
  width: ${({ theme }) => theme.deviceWrapSizes.default};
  margin: 0 auto;
  margin-top: 30px;

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

export const ContentWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -1rem;
`;
