import axios from 'axios';

export function getGrade(xh, token) {
  const options = {
    method: 'POST',
    url: '/api/grade',
    data: {
      xh
    },
    headers: {
      token
    }
  };

  return axios(options).then(res => res.data);
}
