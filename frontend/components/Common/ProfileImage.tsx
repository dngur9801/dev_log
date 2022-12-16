import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { defaultProfileImage } from '../../config';
import { userInfo } from '../../store/atom';

interface Props {
  width: number;
  height: number;
  src?: string;
}

const ProfileImage = ({ width, height, src }: Props) => {
  const [user] = useRecoilState(userInfo);

  const profileImage = () => {
    if (user?.profileImage) {
      return user?.profileImage;
    } else {
      return defaultProfileImage();
    }
  };

  return <Image src={src || profileImage()} alt="프로필이미지" width={width} height={height} />;
};

export default ProfileImage;
