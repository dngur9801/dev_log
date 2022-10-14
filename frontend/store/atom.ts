import { atom } from 'recoil';
import { UserInfoTypes } from '../interfaces';

const userInfo = atom<UserInfoTypes>({
  key: 'userInfo',
  default: {
    email: '',
    name: '',
  },
});

export { userInfo };
