import styled, { css } from 'styled-components';

export const SubInfo = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 20px;

  .info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
      flex: 1 1 20%;
    }

    p,
    input {
      flex: 2 1 0%;
    }

    input {
      margin-right: 20px;
      height: 30px;
    }
  }

  .description {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

export const InfoButton = styled.button`
  padding: 5px 5px;
  border-radius: 5px;
  background-color: ${({ color, theme }) =>
    color === 'red'
      ? css`
          ${theme.backgroundColors.red1}
        `
      : css`
          ${theme.backgroundColors.basic2}
        `};
  color: white;
`;
