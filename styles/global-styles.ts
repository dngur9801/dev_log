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
    background-color:#f8f9fa;
    font-family: ‘Noto Sans’, sans-serif;
    color: ${({ theme }) => theme.colors.black1};
  }

  a {
    text-decoration:none;
    color:inherit;
  }
`;

export default GlobalStyle;
