import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000',
  //   params: {
  //     api_key: 'b27db429981307f4f3823a8daed2c7c9',
  //     language: 'ko-KR',
  //     region: 'KR',
  //   },
});

export const userAPI = {
  signUp: (data) => request.post('/user', data),
};
