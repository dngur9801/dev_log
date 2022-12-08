import styled from 'styled-components';

export const ContentBtn = styled.div`
  margin-bottom: 40px;
  text-align: right;

  button {
    padding: 10px 20px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.backgroundColors.basic1};
    color: white;
    border-radius: 5px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    button {
      padding: 5px 10px;
    }
  }
`;

export const Content = styled.div`
  position: relative;
`;
