import axios from 'axios';
import { SignUpTypes, LocalLoginTypes } from '../interfaces';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const userAPI = {
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  getInfo: () => request.get('/user'),
  logout: () => request.post('/user/logout'),
};

export const postAPI = {
  regist: (data) => request.post('/post/regist', data),
};
