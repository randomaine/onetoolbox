import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: "//api.onetoolbox.cn/",
  withCredentials: false,
  timeout: 10000,
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => config, // 直接返回配置
  (error: AxiosError) => Promise.reject(error), // 直接返回错误
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    return res; // 否则返回响应数据
  },
  (error: AxiosError) => Promise.reject(error.message), // 直接返回错误信息
);

// 封装http方法
export const http = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => service.get<T>(url, config),
  post: <T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> =>
    service.post<T>(url, data, config),
  put: <T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> =>
    service.put<T>(url, data, config),
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => service.delete<T>(url, config),
};

export default service;
