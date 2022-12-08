import styled from 'styled-components';

export const LikeBox = styled.div`
  position: absolute;
  left: -7rem;
  top: 40px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.backgroundColors.white1};
  padding: 10px;
  cursor: pointer;

  .inner {
    div {
      margin-top: 10px;
      text-align: center;
      font-size: ${({ theme }) => theme.fontSizes.xl};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
    }
  }

  @media ${({ theme }) => theme.device.tabletL} {
    display: inline-block;
    position: relative;
    top: 0 !important;
    left: 0;
    margin-top: 50px;
    background-color: ${({ theme }) => theme.backgroundColors.basic2};
    border-radius: 0;

    .inner {
      display: flex;
      align-items: center;
      gap: 5px;
      color: black;

      svg {
        width: 24px;
        height: 24px;
      }

      div {
        margin: 0;
      }
    }
  }
`;
