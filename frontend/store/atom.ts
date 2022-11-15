import { atom } from 'recoil';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    email: '',
    name: '',
    profileImage: '',
    blogName: '',
  },
});
