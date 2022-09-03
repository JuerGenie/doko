import Doko from "../../index.js";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiInterceptorBody<V, T = V> {
  onFulfilled?: (value: V) => T | Promise<T>;
  onRejected?: (error: any) => any;
}
export interface ApiInterceptor {
  request?: ApiInterceptorBody<AxiosRequestConfig>;
  response?: ApiInterceptorBody<AxiosResponse>;
}
export type ApiInterceptorFactor = (doko: Doko) => ApiInterceptor;

export const defineInterceptor = (
  factor: ApiInterceptorFactor
): typeof factor => factor;
