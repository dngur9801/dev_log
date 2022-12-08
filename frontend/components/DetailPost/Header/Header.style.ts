import styled from 'styled-components';
import { apiAddress, defaultTitleImage } from '../../../config';

export const Header = styled.div<{ image: string }>`
  margin-bottom: 5rem;
  .back_img {
    background-image: url(${({ image }) => (image ? `${apiAddress()}/${image}` : defaultTitleImage())});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }

  .bg {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 80px;
  }
`;

export const Title = styled.div`
  position: absolute;
  top: 500px;
  left: 200px;
  color: white;
  p {
    font-size: ${({ theme }) => theme.fontSizes.titleXXL};
    font-weight: ${({ theme }) => theme.fontWeights.xl};
    margin-bottom: 2rem;
  }
  span {
    display: block;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: 1.5rem;
  }

  @media ${({ theme }) => theme.device.tablet} {
    left: 50%;
    transform: translateX(-50%);
  }
`;
