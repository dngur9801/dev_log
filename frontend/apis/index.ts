import axios from 'axios';
import { apiAddress } from '../config';
import {
  SignUpTypes,
  LocalLoginTypes,
  RegistOrEditTypes,
  registCommentTypes,
  UserRegistTypes,
  CommentEditTypes,
  ChangeProfileFormTypes,
  UserInfoTypes,
  PostTypes,
  UserBlogTypes,
} from '../interfaces';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_CLIENT_ADDRESS}/api`
      : 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-store',
    Pragma: 'no-store',
    Expires: '0',
  },
});

export const userAPI = {
  info: (): Promise<UserInfoTypes> => request.get('/user').then((res) => res.data),
  posts: (data: string): Promise<UserBlogTypes> => request.get(`/user/posts?name=${data}`).then((res) => res.data),
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
  popular: (): Promise<PostTypes[]> => request.get('/posts?sort=popular').then((res) => res.data),
  latest: (): Promise<PostTypes[]> => request.get('/posts?sort=latest').then((res) => res.data),
  liked: (): Promise<PostTypes[]> => request.get('/posts/liked').then((res) => res.data),
  detail: (data: string | string[]): Promise<PostTypes> =>
    request.get(encodeURI(`/post/detail/${data}`)).then((res) => res.data),
  search: (data: string | string[]): Promise<PostTypes[]> =>
    request.get(`/post/search?searchWord=${data}`).then((res) => res.data),
  regist: (data: RegistOrEditTypes) => request.post('/post/regist', data),
  addLike: (data: number) => request.post(`/post/${data}/like`),
  edit: (data: RegistOrEditTypes) => request.put('/post', data),
  delete: (data: number) => request.delete(`/post/${data}`),
  removeLike: (data: number) => request.delete(`/post/${data}/like`),
};

export const commentAPI = {
  regist: (data: registCommentTypes) => request.post('/comment/regist', data),
  edit: (data: CommentEditTypes) => request.put('/comment', data),
  delete: (data: string) => request.delete(`/comment/${data}`),
};
