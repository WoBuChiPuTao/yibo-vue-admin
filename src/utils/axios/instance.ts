import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { omit } from 'lodash-es'
import { AxiosCancel } from './axiosCancel'
import {
  CreateAxiosOptions,
  RequestOptions,
  AddAxiosRequestConfig,
  AxiosInterceptorsConfig,
  Result
} from './types'

export class YAxios {
  private instance: AxiosInstance
  private readonly options: AddAxiosRequestConfig
  private readonly interceptors?: AxiosInterceptorsConfig

  constructor(options: CreateAxiosOptions) {
    this.instance = axios.create(options)
    this.options = omit(options, 'interceptors')
    this.interceptors = options.interceptors
    this.setupInterceptors()
  }

  /**
   * @description: 拦截器配置
   */
  private setupInterceptors() {
    if (!this.interceptors) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = this.interceptors

    this.instance.interceptors.request.use(requestInterceptors, requestInterceptorsCatch)
    this.instance.interceptors.response.use(responseInterceptors, responseInterceptorsCatch)

    // cancelToken
    this.instance.interceptors.request.use((config: AddAxiosRequestConfig) => {
      const { ignoreCancelToken } = config.requestOptions || {}
      ignoreCancelToken && AxiosCancel.addPending(config)
      return config
    }, undefined)

    this.instance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && AxiosCancel.removePending(res.config)
      return res
    }, undefined)
  }

  get<T = unknown>(url: string, options?: RequestOptions, config?: AxiosRequestConfig): Promise<T> {
    return this.request({ ...config, url, method: 'GET' }, options)
  }

  post<T = unknown>(
    url: string,
    data?: object,
    options?: RequestOptions,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request({ ...config, url, data, method: 'POST' }, options)
  }

  put<T = unknown>(
    url: string,
    data?: object,
    options?: RequestOptions,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request({ ...config, url, data, method: 'PUT' }, options)
  }

  delete<T = unknown>(
    url: string,
    options?: RequestOptions,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request({ ...config, url, method: 'DELETE' }, options)
  }

  request<T = unknown>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    const conf: AddAxiosRequestConfig = config
    conf.requestOptions = opt
    // FormData(conf)
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  }
}
