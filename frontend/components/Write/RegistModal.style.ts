import styled from 'styled-components';

export const Wrap = styled.div`
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;

  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background: white;

    p {
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      padding: 20px 15px;
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    .selectbox {
      display: flex;

      .left,
      .right {
        display: flex;
        align-items: center;
        padding: 20px;
        flex: 5;

        svg {
          margin-bottom: -2px;
        }

        input {
          margin-right: 10px;
        }

        label {
          cursor: pointer;
        }
      }
    }
  }

  .btns {
    button {
      background-color: ${({ theme }) => theme.backgroundColors.basic2};
      width: 50%;
      padding: 15px;
      font-size: ${({ theme }) => theme.fontSizes.base};
      color: white;

      &:nth-of-type(1) {
        border-right: 1px solid #ccc;
      }
    }
  }
`;
