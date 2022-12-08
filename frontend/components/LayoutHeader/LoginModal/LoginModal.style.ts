import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .content_wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 0 10px;
    background-color: ${({ theme }) => theme.backgroundColors.default};

    .close {
      text-align: right;
      margin-bottom: 15px;

      svg {
        font-size: 30px;
        cursor: pointer;

        &:active {
          background-color: ${({ theme }) => theme.backgroundColors.blue1};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  .left_content {
    flex: 5;
  }

  .right_content {
    flex: 5;

    a,
    button {
      display: block;
      width: 100%;
      margin-bottom: 15px;
      border-radius: 5px;
      padding: 17px 0;
      color: white;
      font-size: ${({ theme }) => theme.fontSizes.lg};
      font-weight: ${({ theme }) => theme.fontWeights.lg};
      text-align: center;

      &.purple {
        background-color: ${({ theme }) => theme.backgroundColors.purple1};
      }
      &.blue {
        background-color: ${({ theme }) => theme.backgroundColors.basic1};
      }
      &.black {
        background-color: ${({ theme }) => theme.backgroundColors.basic2};
      }
    }
    .line_wrap {
      text-align: center;
      margin-bottom: 15px;

      .line {
        display: block;
        background: ${({ theme }) => theme.backgroundColors.basic2};
        height: 1px;
        width: 100%;
        transform: translateY(10px);
      }

      span {
        position: relative;
        color: ${({ theme }) => theme.colors.gray2};
        padding: 0 8px;
        background: ${({ theme }) => theme.backgroundColors.default};
      }
    }

    input {
      width: 100%;
      padding: 20px;
      margin-bottom: 15px;
      border: 0;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.backgroundColors.gray1};
    }

    .not_member_text {
      text-align: center;
      margin-top: 15px;

      span {
        color: ${({ theme }) => theme.colors.gray1};
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
