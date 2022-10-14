import axios from 'axios';
import { SignUpTypes, LocalLoginTypes } from '../interfaces';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  //   params: {
  //     api_key: 'b27db429981307f4f3823a8daed2c7c9',
  //     language: 'ko-KR',
  //     region: 'KR',
  //   },
});

export const userAPI = {
  signUp: (data: SignUpTypes) => request.post('/user/signup', data),
  localLogin: (data: LocalLoginTypes) => request.post('/user/login', data),
  getInfo: () => request.get('/user'),
  logout: () => request.post('/user/logout'),
};
