import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';
import { apiAddress, defaultProfileImage } from '../../config';
import { userInfo } from '../../store/atom';

interface ProfileImagePropTypes {
  width: number;
  height: number;
  src?: string;
}

const ProfileImage = ({ width, height, src }: ProfileImagePropTypes) => {
  const [user] = useRecoilState(userInfo);

  const profileImage = () => {
    if (user?.profileImage) {
      if (user?.profileImage.indexOf('http') === 0) {
        return user?.profileImage;
      } else {
        return `${apiAddress()}/${user?.profileImage}`;
      }
    } else {
      return defaultProfileImage();
    }
  };

  return <Image src={src || profileImage()} alt="profile_img" width={width} height={height} />;
};

export default ProfileImage;
