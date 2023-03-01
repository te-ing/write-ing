import axios from 'axios';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`;

export const Axios = axios.create({
  baseURL: `${baseURL}/`,
  // validateStatus: (status) => status < 500,
  timeout: 10000,
});

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
