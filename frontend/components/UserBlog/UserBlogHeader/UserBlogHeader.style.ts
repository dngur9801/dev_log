import styled from 'styled-components';

export const Container = styled.div`
  width: ${({ theme }) => theme.deviceWrapSizes.tablet};
  margin: 0 auto;
  margin-top: 60px;
  padding-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};

  @media ${({ theme }) => theme.device.laptop} {
    width: calc(100% - 2rem);
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 30px;

    img {
      width: 130px;
      border-radius: 100%;
    }

    p {
      font-size: ${({ theme }) => theme.fontSizes.xxxl};
      font-weight: ${({ theme }) => theme.fontWeights.lg};
      margin-bottom: 15px;
    }
  }
`;
