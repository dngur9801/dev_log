import styled from 'styled-components';

export const Content = styled.div`
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
        margin-bottom: 4px;
        color: red;
        vertical-align: 1px;
      }
    }
  }
`;
