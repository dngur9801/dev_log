import axios from 'axios';
import { apiAddress } from '../config';
import {
  SignUpTypes,
  LocalLoginTypes,
  RegistOrEditTypes,
  registCommentTypes,
  UserRegistTypes,
  ResponsePostTypes,
} from '../interfaces';

const request = axios.create({
  baseURL: apiAddress(),
  withCredentials: true,
});

export const userAPI = {
  info: () => request.get('/user'),
  posts: (data: string): Promise<ResponsePostTypes> => request.get(`/user/posts?name=${data}`),
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  logout: () => request.post('/user/logout'),
  regist: (data: UserRegistTypes) => request.post('/user/regist', data),
};

export const postAPI = {
  detail: (data: string | string[]) => request.get(`/post/${data}`),
  lists: () => request.get('/posts'),
  regist: (data: RegistOrEditTypes) => request.post('/post/regist', data),
  addLike: (data: any) => request.post(`/post/${data}/like`),
  edit: (data: RegistOrEditTypes) => request.put('/post', data),
  delete: (data: any) => request.delete(`/post/${data}`),
  removeLike: (data: any) => request.delete(`/post/${data}/like`),
};

export const commentAPI = {
  regist: (data: registCommentTypes) => request.post('/comment/regist', data),
  edit: (data: string) => request.put('/comment', data),
  delete: (data: any) => request.delete(`/comment/${data}`),
};
