import styled from 'styled-components';

export const HeaderWrap = styled.div`
  width: 100%;
  height: 100px;
  background-color: #f8f9fa;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1800px;
  height: 100%;
  margin: 0 auto;
`;

export const WriteBtn = styled.span`
  display: inline-block;
  padding: 10px;
  border: 1px solid black;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
