import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';
const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing : border-box;
  }

  html {
    @media ${({ theme }) => theme.device.tabletL} {
      font-size:14px;
    }
    @media ${({ theme }) => theme.device.tablet} {
      font-size:12px;
    }
  }

  body{
    margin:0;
    padding:0;
    font-family: ‘Noto Sans’, sans-serif;
    color: ${({ theme }) => theme.colors.black1};
    background-color:${({ theme }) => theme.backgroundColors.body}
  }

  a {
    text-decoration:none;
    color:inherit;
  }

  button {
    cursor:pointer;
    border: 0;
  }
`;

export default GlobalStyle;
