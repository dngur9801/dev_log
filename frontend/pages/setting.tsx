import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userAPI } from '../apis';
import CustomAlert from '../components/Common/CustomAlert';
import EditProfile from '../components/Setting/EditProfile';
import EditSubject from '../components/Setting/EditSubject';
import OutMember from '../components/Setting/OutMember';
import { USER_INFO } from '../constant/queryKey';
import { ChangeProfileFormTypes } from '../interfaces';
import { userInfo } from '../store/atom';
import axios from 'axios';
import { apiAddress } from '../config';

const Setting: NextPage = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
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
    editProfile(changeForm, {
      onSuccess: () => {
        setUser((prev) => ({
          ...prev,
          nickName: changeForm?.nickName || user.nickName,
          introduce: changeForm?.introduce ?? user.introduce,
        }));
        queryClient.invalidateQueries(USER_INFO);
        setIsModifyProfile(false);
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  // 프로필 이미지 변경
  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const createFile = URL.createObjectURL(e.target.files[0]);
    setProfileSrc(createFile);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    upload(formData, {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(USER_INFO);
      },
      onError: (error: any) => {
        setIsAlert(true);
        setAlertText(`😂 ${error.response.data}`);
      },
    });
  };

  // 블로그제목 변경 클릭 시
  const onClickUpdateSubject = () => {
    editSubject(
      { blogName: subject },
      {
        onSuccess: () => {
          setUser((prev) => ({
            ...prev,
            blogName: subject || user.blogName,
          }));
          queryClient.invalidateQueries(USER_INFO);
          setIsModifySubject(false);
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
        },
      },
    );
  };

  // 회원 탈퇴
  const onClickOutMember = () => {
    if (window.confirm('탈퇴 시 모든 데이터가 초기화되며 복구할 수 없습니다.\n탈퇴하시겠습니까?'))
      outMember(null, {
        onSuccess: () => {
          route.push('/');
          queryClient.invalidateQueries(USER_INFO);
        },
        onError: (error: any) => {
          setIsAlert(true);
          setAlertText(`😂 ${error.response.data}`);
        },
      });
  };
  return (
    <>
      <NextSeo
        title="설정"
        description="설정"
        canonical="https://devlog.shop"
        openGraph={{
          url: 'https://devlog.shop',
        }}
      />
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
      {isAlert && <CustomAlert text={alertText} setIsAlert={setIsAlert} />}
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const data = await userAPI.info();

  if (!data) {
    return {
      redirect: {
        destination: '/notlogin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
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
