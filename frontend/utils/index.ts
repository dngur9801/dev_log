/* eslint-disable no-useless-escape */
import { UserInfoTypes } from '../interfaces';

export const reg = {
  removeTag(string: string) {
    const regExp = /<[^>]*>?/g;
    return string.replace(regExp, '');
  },

  isId(string: string) {
    const regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
    return regExp.test(string);
  },

  changeHyphen(string: string) {
    // 공백과 특수문자를 "-"로 치환
    const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
    const regex2 = string.replace(regex, '-');
    const title = regex2.replace(/-$/, '');
    return title;
  },
};

export const initUserInfoData = (): UserInfoTypes => ({
  id: null,
  email: '',
  name: '',
  blogName: '',
  profileImage: '',
  nickName: '',
  introduce: '',
});

export const throttle = (callback: () => void, waitTime: number) => {
  let timerId: NodeJS.Timeout = null;
  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this);
      timerId = null;
    }, waitTime);
  };
};

export const debounce = (callback: React.Dispatch<React.SetStateAction<string>>, duration: number) => {
  let timer: any;
  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(value), duration);
  };
};
