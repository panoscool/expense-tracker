import axios from 'axios';
import store from 'store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {},
  responseType: 'json',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = store.get('auth', null);

    if (accessToken) {
      config.headers = { Authorization: accessToken };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.data?.error) {
      return Promise.reject(response.data.error);
    }

    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error.response.data.error);
  },
);

const apiRequest = (method: string, url: string, data?: any) => {
  return axiosInstance(url, { method, data });
};

export default apiRequest;
