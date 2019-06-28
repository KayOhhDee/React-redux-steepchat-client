import axios from 'axios';

export function apiCall(method, url, data) {
  return new Promise((resolve, reject) => {
    return axios[method](url, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      })
  })
}