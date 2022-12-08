import React from 'react';
import * as Styled from './OutMember.style';

interface Props {
  onClickOutMember: () => void;
}

const OutMember = ({ onClickOutMember }: Props) => {
  return (
    <Styled.SubInfo>
      <div className="info">
        <h3>회원탈퇴</h3>
        <Styled.InfoButton type="button" color="red" onClick={onClickOutMember}>
          회원 탈퇴
        </Styled.InfoButton>
      </div>
      <div className="description">삭제시 모든 정보가 삭제되며 복구되지 않습니다.</div>
    </Styled.SubInfo>
  );
};

export default OutMember;
