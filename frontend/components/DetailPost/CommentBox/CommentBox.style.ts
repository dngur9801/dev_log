import styled from 'styled-components';

export const Wrap = styled.div`
  margin-top: 200px;

  h4 {
    font-weight: ${({ theme }) => theme.fontWeights.xl};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin-top: 30px;
    margin-bottom: 20px;

    .count {
      color: ${({ theme }) => theme.colors.basic1};
      padding-right: 3px;
    }
  }

  textarea {
    width: 100%;
    padding: 20px;
    height: 100px;
    border: 1px solid ${({ theme }) => theme.colors.gray3};
    background-color: ${({ theme }) => theme.backgroundColors.white1};
    resize: none;
    overflow: hidden;
    line-height: 1.5;
    caret-color: ${({ theme }) => theme.colors.black1};
    color: ${({ theme }) => theme.colors.default};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.black1};
    }
  }

  .button_wrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    button {
      border-radius: 5px;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      color: white;
      padding: 8px 20px;
      font-size: ${({ theme }) => theme.fontSizes.small};

      @media ${({ theme }) => theme.device.tablet} {
        padding: 5px 10px;
      }
    }
  }
`;

export const Comments = styled.div`
  margin-top: 50px;
  .none_comment {
    height: 200px;
    line-height: 200px;
    text-align: center;

    span {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
      color: ${({ theme }) => theme.colors.basic2};
    }
  }
  .comment {
    padding: 40px 0;
    border-bottom: 1px solid #eee;

    .profile_info {
      display: flex;
      height: 54px;
      justify-content: space-between;
      align-items: center;

      .profile {
        display: flex;
        align-items: center;

        & > a {
          width: 50px;
          margin-right: 10px;

          img {
            width: 100%;
            border-radius: 100%;
          }
        }
      }

      .actions {
        button {
          font-size: ${({ theme }) => theme.fontSizes.small};
          color: ${({ theme }) => theme.colors.gray2};
          background: transparent;
        }
      }
    }

    .comment_info {
      .name {
        display: inline-block;
        font-weight: ${({ theme }) => theme.fontWeights.xl};
        margin-bottom: 5px;
      }

      .date {
        color: ${({ theme }) => theme.colors.gray2};
      }
    }

    .content {
      margin: 30px 0;
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    .reply {
      display: flex;
      background: transparent;
      font-size: ${({ theme }) => theme.fontSizes.base};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
      color: ${({ theme }) => theme.colors.basic1};

      span {
        padding-left: 5px;
      }
    }
  }
`;
