import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userAPI } from '../api';
import Seo from '../components/Seo';
import EditProfile from '../components/Setting/EditProfile';
import EditSubject from '../components/Setting/EditSubject';
import OutMember from '../components/Setting/OutMember';
import { apiAddress } from '../config';
import { USER_INFO } from '../constant/queryKey';
import { ChangeProfileFormTypes } from '../interfaces';
import { userInfo } from '../store/atom';

const Setting: NextPage = () => {
  const [changeForm, setChangeForm] = useState<ChangeProfileFormTypes>(null);
  const [isModifyProfile, setIsModifyProfile] = useState(false);
  const [isModifySubject, setIsModifySubject] = useState(false);
  const [profileSrc, setProfileSrc] = useState(null);
  const [subject, setSubject] = useState('');
  const [user, setUser] = useRecoilState(userInfo);

  const route = useRouter();
  const queryClient = useQueryClient();

  const { mutate: editProfile } = useMutation((data: ChangeProfileFormTypes) => userAPI.editProfile(data));
  const { mutate: upload, isLoading } = useMutation((data: FormData) => userAPI.uploadImage(data));
  const { mutate: editSubject } = useMutation((data: { blogName: string }) => userAPI.editSubject(data));
  const { mutate: outMember } = useMutation(() => userAPI.outMember());

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          queryClient.invalidateQueries(USER_INFO);
        },
        onError: (error: any, variables: any, context: any) => {
          alert(error.response.data);
        },
      });
  };
  return (
    <>
      <Seo>설정 - Devlog</Seo>
      <Styled.Container>
        <EditProfile
          onChangeForm={onChangeForm}
          onClickUpdateForm={onClickUpdateForm}
          onUploadImage={onUploadImage}
          profileSrc={profileSrc}
          isModifyProfile={isModifyProfile}
          setIsModifyProfile={setIsModifyProfile}
          isLoading={isLoading}
        />
        <Styled.SubInfoWrap>
          <EditSubject
            onClickUpdateSubject={onClickUpdateSubject}
            isModifySubject={isModifySubject}
            setIsModifySubject={setIsModifySubject}
            setSubject={setSubject}
          />
          <OutMember onClickOutMember={onClickOutMember} />
        </Styled.SubInfoWrap>
      </Styled.Container>
    </>
  );
};

const Styled = {
  Container: styled.div`
    width: ${({ theme }) => theme.deviceWrapSizes.tablet};
    margin: 0 auto;
    margin-top: 50px;

    @media ${({ theme }) => theme.device.tablet} {
      width: calc(100% - 2rem);
    }
  `,

  SubInfoWrap: styled.div`
    margin-top: 80px;
  `,
};
export default Setting;
