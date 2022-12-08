import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../store/atom';
import * as Styled from './EditSubject.style';

interface Props {
  onClickUpdateSubject: () => void;
  isModifySubject: boolean;
  setIsModifySubject: Dispatch<SetStateAction<boolean>>;
  setSubject: Dispatch<SetStateAction<string>>;
}

const EditSubject = ({ onClickUpdateSubject, isModifySubject, setIsModifySubject, setSubject }: Props) => {
  const [user, setUser] = useRecoilState(userInfo);
  return (
    <Styled.SubInfo>
      <div className="info">
        <h3>Devlog 제목</h3>
        {isModifySubject ? (
          <>
            <input
              type="text"
              defaultValue={user?.blogName || user?.name}
              onChange={(e) => setSubject(e.target.value)}
            />
            <Styled.InfoButton type="button" color="blue" onClick={onClickUpdateSubject}>
              저장
            </Styled.InfoButton>
          </>
        ) : (
          <>
            <p>{user?.blogName || user?.name}</p>
            <Styled.InfoButton type="button" color="blue" onClick={() => setIsModifySubject(true)}>
              수정
            </Styled.InfoButton>
          </>
        )}
      </div>
      <div className="description">중앙 상단에 나타나는 제목 입니다.</div>
    </Styled.SubInfo>
  );
};

export default EditSubject;
