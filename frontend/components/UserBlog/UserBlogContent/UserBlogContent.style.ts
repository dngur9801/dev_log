import styled from 'styled-components';

export const Content = styled.div`
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
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    color: ${({ theme }) => theme.colors.gray2};

    .likes {
      display: flex;
      gap: 5px;
      align-items: center;

      svg {
        margin-bottom: 4px;
        color: red;
        vertical-align: 1px;
      }
    }
  }
`;
