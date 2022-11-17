import { atom } from 'recoil';
import { v1 } from 'uuid';

export const userInfo = atom({
  key: `userInfo/${v1()}`,
  default: {
    id: null,
    email: '',
    name: '',
    profileImage: '',
    blogName: '',
  },
});
