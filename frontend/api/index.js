import axios from 'axios';

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
  signUp: (data) => request.post('/user/signup', data),
  localLogin: (data) => request.post('/user/login', data),
  googleLogin: () => request.get('/auth/google'),
  getInfo: () => request.get('/user'),
};
