import axios from 'axios';
import { SignUpTypes, LocalLoginTypes, RegistTypes } from '../interfaces';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

const registConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const userAPI = {
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  getInfo: () => request.get('/user'),
  logout: () => request.post('/user/logout'),
};

export const postAPI = {
  regist: (data: RegistTypes) => request.post('/post/regist', data),
  getDetail: (data: string | string[]) => request.get(`/post/${data}`),
  getList: () => request.get('/posts'),
};
