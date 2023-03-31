import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = unknown> {
  code: number
  message: string
  data: T
}

// 自定义请求参数
export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  // errorMessageMode?: ErrorMessageMode;
  // Success message prompt type
  // successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // Whether to send token in header
  withToken?: boolean
  // 请求重试机制
  // retryRequest?: RetryRequest;
}

export interface AddAxiosRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions
}

export abstract class AxiosInterceptorsConfig {
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (config: AddAxiosRequestConfig) => AddAxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: AxiosError) => Promise<unknown>

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: AxiosError) => Promise<unknown>
}
