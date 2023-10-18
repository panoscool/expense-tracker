import axios, { AxiosRequestHeaders } from 'axios';
import { storeGetAccessToken } from './store';
import { env } from './env';

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  headers: {},
  responseType: 'json',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = storeGetAccessToken();

    if (accessToken) {
      config.headers = { Authorization: `Bearer ${accessToken}` } as AxiosRequestHeaders;
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
