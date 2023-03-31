import axios, { AxiosInstance } from 'axios'
import { axiosInterceptors } from './interceptors'
import { AddAxiosRequestConfig } from './types'

export class Axios {
  private instance: AxiosInstance
  private readonly options: AddAxiosRequestConfig

  constructor(options: AddAxiosRequestConfig) {
    this.options = options
    this.instance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = axiosInterceptors

    this.instance.interceptors.request.use(requestInterceptors, requestInterceptorsCatch)
    this.instance.interceptors.response.use(responseInterceptors, responseInterceptorsCatch)
  }

  get<T = unknown>(url: string, config?: AddAxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  post<T = unknown>(url: string, data?: object, config?: AddAxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  put<T = unknown>(url: string, data?: object, config?: AddAxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  delete<T = unknown>(url: string, config?: AddAxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}
