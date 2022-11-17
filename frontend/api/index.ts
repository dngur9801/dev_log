import axios from 'axios';
import { apiAddress } from '../config';
import {
  SignUpTypes,
  LocalLoginTypes,
  RegistOrEditTypes,
  registCommentTypes,
  PostTypes,
  UserRegistTypes,
} from '../interfaces';

const request = axios.create({
  baseURL: apiAddress(),
  withCredentials: true,
});

export const userAPI = {
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  info: () => request.get('/user'),
  logout: () => request.post('/user/logout'),
  mypage: (): Promise<PostTypes> => request.get('/user/mypage'),
  regist: (data: UserRegistTypes) => request.post('/user/regist', data),
};

export const postAPI = {
  regist: (data: RegistOrEditTypes) => request.post('/post/regist', data),
  detail: (data: string | string[]) => request.get(`/post/${data}`),
  edit: (data: RegistOrEditTypes) => request.put('/post', data),
  delete: (data: any) => request.delete(`/post/${data}`),
  lists: () => request.get('/posts'),
  addLike: (data: any) => request.post(`/post/${data}/like`),
  removeLike: (data: any) => request.delete(`/post/${data}/like`),
};

export const commentAPI = {
  regist: (data: registCommentTypes) => request.post('/comment/regist', data),
  edit: (data: string) => request.put('/comment', data),
  delete: (data: any) => request.delete(`/comment/${data}`),
};
