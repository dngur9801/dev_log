import { atom } from 'recoil';
import { v1 } from 'uuid';
import { initUserInfoData } from '../utils';

export const userInfo = atom({
  key: `userInfo/${v1()}`,
  default: initUserInfoData(),
});

export const darkMode = atom({
  key: `themeMode/${v1()}`,
  default: false,
});
