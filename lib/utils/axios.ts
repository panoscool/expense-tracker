import axios, { AxiosError, AxiosResponse } from 'axios';

const HTTP = axios.create({
  timeout: 30000,
  responseType: 'json',
  validateStatus: (status) => status >= 200,
});

const HTTPOK = (res: AxiosResponse) => {
  if (res.data?.error) {
    return Promise.reject(res.data?.error);
  }

  return Promise.resolve(res.data);
};

const HTTPERROR = (err: AxiosError) => Promise.reject(err);

HTTP.interceptors.response.use(HTTPOK, HTTPERROR);

const apiRequest = (method: any, path: string, params?: any): Promise<any> => {
  const headers = {};

  return HTTP({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    method,
    headers,
    url: path,
    data: method !== 'GET' ? params : undefined,
    params: method === 'GET' ? params : undefined,
  });
};

export default apiRequest;
