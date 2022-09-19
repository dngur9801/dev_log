import styled from 'styled-components';

export const Container = styled.div`
  width: ${({ theme }) => theme.deviceWrapSizes.tablet};
  margin: 0 auto;
  margin-top: 60px;

  .taps {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSizes.xl};

    span {
      display: inline-block;
      width: 120px;
      padding: 10px 0;
      border-bottom: 2px solid ${({ theme }) => theme.colors.blue1};
      color: ${({ theme }) => theme.colors.blue1};
    }
  }

  .my_content {
    margin-top: 50px;

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
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
    gap: 10px;
    margin-top: 30px;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
