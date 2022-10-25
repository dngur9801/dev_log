import { atom } from 'recoil';
import { UserInfoTypes } from '../interfaces';

export const userInfo = atom<UserInfoTypes>({
  key: 'userInfo',
  default: {
    email: '',
    name: '',
  },
});
