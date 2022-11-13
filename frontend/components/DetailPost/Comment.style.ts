import styled from 'styled-components';

export const Wrap = styled.div`
  h4 {
    font-weight: ${({ theme }) => theme.fontWeights.xl};
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    margin-top: 30px;
    margin-bottom: 20px;

    .count {
      color: ${({ theme }) => theme.colors.basic1};
    }
  }

  textarea {
    width: 100%;
    padding: 20px;
    height: 100px;
    border: 1px solid #eee;
    resize: none;
    overflow: hidden;
    line-height: 1.5;
    &:focus {
      outline: none;
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
      font-size: ${({ theme }) => theme.fontSizes.lg};
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

    .profile {
      margin-bottom: 30px;
      display: flex;
      align-items: center;

      a {
        width: 50px;
        margin-right: 10px;

        img {
          width: 100%;
          border-radius: 100%;
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
