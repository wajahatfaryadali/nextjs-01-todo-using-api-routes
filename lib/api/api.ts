import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../axios/axios";

// export type ApiErrorType = { message: string; status?: number; data?: any };

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const res = await axiosInstance.get<T>(url, config);
    return res.data;
  } catch (error) {
    // throw error as ApiErrorType;
    throw error as any;
  }
};

export const post = async <T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const res = await axiosInstance.post<T>(url, data, config);
    return res.data;
  } catch (error) {
    throw error as any;
  }
};

export const put = async <T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const res = await axiosInstance.put<T>(url, data, config);
    return res.data;
  } catch (error) {
    throw error as any;
  }
};

export const del = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  try {
    const res = await axiosInstance.delete<T>(url, {
      ...config,
      data, // body goes here
    });
    return res.data;
  } catch (error) {
    throw error as any;
  }
};
