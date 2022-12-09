import axios from 'axios';
import { apiAddress } from '../config';
import {
  SignUpTypes,
  LocalLoginTypes,
  RegistOrEditTypes,
  registCommentTypes,
  UserRegistTypes,
  ResponsePostsTypes,
  CommentEditTypes,
  ChangeProfileFormTypes,
  UserInfoTypes,
  PostTypes,
} from '../interfaces';

const request = axios.create({
  baseURL: apiAddress(),
  withCredentials: true,
});

export const userAPI = {
  info: (): Promise<UserInfoTypes> => request.get('/user').then((res) => res.data),
  posts: (data: string): Promise<ResponsePostsTypes> => request.get(`/user/posts?name=${data}`),
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  logout: () => request.post('/user/logout'),
  regist: (data: UserRegistTypes) => request.post('/user/regist', data),
  outMember: () => request.post('/user/out'),
  editProfile: (data: ChangeProfileFormTypes) => request.put('/user/edit/profile', data),
  editSubject: (data: { blogName: string }) => request.put('/user/edit/subject', data),
  uploadImage: (data: FormData) => request.put('/user/image', data),
};

export const postAPI = {
  detail: (data: string | string[]): Promise<PostTypes> => request.get(`/post/${data}`).then((res) => res.data),
  popular: (): Promise<PostTypes[]> => request.get('/posts?sort=popular').then((res) => res.data),
  latest: (): Promise<PostTypes[]> => request.get('/posts?sort=latest').then((res) => res.data),
  regist: (data: RegistOrEditTypes) => request.post('/post/regist', data),
  addLike: (data: string | string[]) => request.post(`/post/${data}/like`),
  edit: (data: RegistOrEditTypes) => request.put('/post', data),
  delete: (data: string | string[]) => request.delete(`/post/${data}`),
  removeLike: (data: string | string[]) => request.delete(`/post/${data}/like`),
};

export const commentAPI = {
  regist: (data: registCommentTypes) => request.post('/comment/regist', data),
  edit: (data: CommentEditTypes) => request.put('/comment', data),
  delete: (data: string) => request.delete(`/comment/${data}`),
};
