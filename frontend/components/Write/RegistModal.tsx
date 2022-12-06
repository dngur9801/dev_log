import React from 'react';
import * as Styled from './RegistModal.style';
import { FaLockOpen } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

interface RegistModalPropTypes {
  onSubmit: () => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPrivate: React.Dispatch<React.SetStateAction<'0' | '1'>>;
}

const RegistModal = ({ onSubmit, setIsModal, setIsPrivate }: RegistModalPropTypes) => {
  return (
    <Styled.Wrap>
      <div className="inner">
        <p>공개 범위 설정</p>
        <div className="selectbox">
          <div className="left">
            <input type="radio" id="public" name="scope" defaultChecked onClick={() => setIsPrivate('0')} />
            <label htmlFor="public">
              <FaLockOpen /> 전체 공개
            </label>
          </div>
          <div className="right">
            <input type="radio" id="private" name="scope" onClick={() => setIsPrivate('1')} />
            <label htmlFor="private">
              <FaLock /> 비공개
            </label>
          </div>
        </div>
        <div className="btns">
          <button type="button" onClick={onSubmit}>
            발행하기
          </button>
          <button type="button" onClick={() => setIsModal(false)}>
            취소
          </button>
        </div>
      </div>
    </Styled.Wrap>
  );
};

export default RegistModal;
