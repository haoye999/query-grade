import axios from 'axios';

export function getToken(xh, pwd) {
  const options = {
    method: 'POST',
    url: '/api/token',
    data: {
      xh,
      pwd
    }
  };

  return axios(options).then(res => res.data);
}