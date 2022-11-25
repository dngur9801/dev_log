import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { userAPI } from '../../api';
import { apiAddress, defaultProfileImage } from '../../config';
import { ChangeProfileFormTypes } from '../../interfaces';
import { userInfo } from '../../store/atom';
import ProfileImage from '../common/ProfileImage';
import * as S from './Setting.style';

const Setting = () => {
  const [file, setFile] = useState(null);
  const [profileSrc, setProfileSrc] = useState(null);
  const [isModifyProfile, setIsModifyProfile] = useState(false);
  const [isModifySubject, setIsModifySubject] = useState(false);
  const [changeForm, setChangeForm] = useState<ChangeProfileFormTypes>(null);
  const [subject, setSubject] = useState('');
  const [user, setUser] = useRecoilState(userInfo);

  const route = useRouter();
  const queryClient = useQueryClient();

  const { mutate: editProfile } = useMutation((data: ChangeProfileFormTypes) => userAPI.editProfile(data));
  const { mutate: editSubject } = useMutation((data: { blogName: string }) => userAPI.editSubject(data));
  const { mutate: outMember } = useMutation(() => userAPI.outMember());
  const { mutate: upload, isLoading } = useMutation((data: FormData) => userAPI.uploadImage(data));

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 이미지 이름 출력
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const createFile = URL.createObjectURL(e.target.files[0]);
    setProfileSrc(createFile);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    upload(formData, {
      onSuccess: (data: any, variables: any, context: any) => {
        setUser((prev) => ({
          ...prev,
          profileImage: `${apiAddress()}/${data.data}`,
        }));
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };

  // 프로필 수정 시
  const onClickUpdateForm = () => {
    setUser((prev) => ({
      ...prev,
      nickName: changeForm?.nickName || user.nickName,
      introduce: changeForm?.introduce ?? user.introduce,
    }));
    editProfile(changeForm, {
      onSuccess: (data: any, variables: any, context: any) => {
        setIsModifyProfile(false);
      },
      onError: (error: any, variables: any, context: any) => {
        alert(error.response.data);
      },
    });
  };

  // 블로그제목 변경 클릭 시
  const onClickUpdateSubject = () => {
    setUser((prev) => ({
      ...prev,
      blogName: subject || user.blogName,
    }));
    editSubject(
      { blogName: subject },
      {
        onSuccess: (data: any, variables: any, context: any) => {
          setIsModifySubject(false);
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      },
    );
  };

  // 회원 탈퇴
  const onClickOutMember = () => {
    if (window.confirm('탈퇴 시 모든 데이터가 초기화되며 복구할 수 없습니다.\n탈퇴하시겠습니까?'))
      outMember(null, {
        onSuccess: (data: any, variables: any, context: any) => {
          route.push('/');
          queryClient.invalidateQueries('userInfo');
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      });
  };
  return (
    <S.Container>
      <div className="modify_profile">
        <div className="modify_img">
          <ProfileImage width={120} height={120} src={profileSrc} />
          <label htmlFor="file">{isLoading ? '이미지 업로드중...' : '이미지 업로드'}</label>
          <input
            type="file"
            accept="image/*"
            id="file"
            name="file"
            className="file"
            onChange={(e) => onUploadImage(e)}
          />
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
      </div>
      <div className="modify_subinfo_wrap">
        <div className="modify_subinfo">
          <div className="info">
            <h3>Devlog 제목</h3>
            {isModifySubject ? (
              <>
                <input
                  type="text"
                  defaultValue={user?.blogName || user?.name}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <S.InfoButton type="button" color="blue" onClick={onClickUpdateSubject}>
                  저장
                </S.InfoButton>
              </>
            ) : (
              <>
                <p>{user?.blogName || user?.name}</p>
                <S.InfoButton type="button" color="blue" onClick={() => setIsModifySubject(true)}>
                  수정
                </S.InfoButton>
              </>
            )}
          </div>
          <div className="description">중앙 상단에 나타나는 제목 입니다.</div>
        </div>
        <div className="modify_subinfo">
          <div className="info">
            <h3>회원탈퇴</h3>
            <S.InfoButton type="button" color="red" onClick={onClickOutMember}>
              회원 탈퇴
            </S.InfoButton>
          </div>
          <div className="description">삭제시 모든 정보가 삭제되며 복구되지 않습니다.</div>
        </div>
      </div>
    </S.Container>
  );
};

export default Setting;
