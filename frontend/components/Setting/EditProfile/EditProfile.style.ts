import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  .modify_img {
    width: 190px;
    border-right: 2px solid ${({ theme }) => theme.colors.gray3};
    padding-right: 40px;
    img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: 100%;
      margin-bottom: 20px;
    }

    label,
    button {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      width: 100%;
      color: white;
      background-color: ${({ theme }) => theme.backgroundColors.basic1};
      font-size: ${({ theme }) => theme.fontSizes.small};
      padding: 5px 0;
      border-radius: 5px;
      margin-bottom: 5px;
    }

    label {
      margin-top: 15px;
    }

    button.remove {
      background: transparent;
      color: ${({ theme }) => theme.colors.basic1};
    }

    .file {
      display: none;
    }
  }

  .modify_info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-left: 30px;

    .nickname {
      font-size: ${({ theme }) => theme.fontSizes.title};
      font-weight: ${({ theme }) => theme.fontWeights.xl};
    }

    button {
      width: 60px;
      padding: 5px 0;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.backgroundColors.basic2};
      color: white;
    }

    input {
      width: 100%;
      height: 40px;
    }
  }
`;
