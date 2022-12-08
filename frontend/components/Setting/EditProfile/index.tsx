import React, { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../store/atom';
import ProfileImage from '../../Common/ProfileImage';
import * as Styled from './EditProfile.style';

interface Props {
  onChangeForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickUpdateForm: () => void;
  onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileSrc: string;
  isModifyProfile: boolean;
  setIsModifyProfile: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const EditProfile = ({
  onChangeForm,
  onClickUpdateForm,
  onUploadImage,
  profileSrc,
  isModifyProfile,
  setIsModifyProfile,
  isLoading,
}: Props) => {
  const [user] = useRecoilState(userInfo);

  return (
    <Styled.Wrap>
      <div className="modify_img">
        <ProfileImage width={120} height={120} src={profileSrc} />
        <label htmlFor="file">{isLoading ? '이미지 업로드중...' : '이미지 업로드'}</label>
        <input type="file" accept="image/*" id="file" name="file" className="file" onChange={(e) => onUploadImage(e)} />
        <button type="button" className="remove">
          이미지 제거
        </button>
      </div>
      <div className="modify_info">
        {isModifyProfile ? (
          <form className="modify_info">
            <input type="text" defaultValue={user.nickName} name="nickName" onChange={onChangeForm} />
            <input type="text" defaultValue={user.introduce} name="introduce" onChange={onChangeForm} />
            <button type="button" onClick={onClickUpdateForm}>
              저장
            </button>
          </form>
        ) : (
          <>
            <p className="nickname">{user?.nickName}</p>
            <span className="introduce">{user?.introduce}</span>
            <button type="button" onClick={() => setIsModifyProfile(true)}>
              수정
            </button>
          </>
        )}
      </div>
    </Styled.Wrap>
  );
};

export default EditProfile;
