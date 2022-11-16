import { atom } from 'recoil';

export const userInfo = atom({
  key: 'userInfo',
  default: {
    id: null,
    email: '',
    name: '',
    profileImage: '',
    blogName: '',
  },
});
