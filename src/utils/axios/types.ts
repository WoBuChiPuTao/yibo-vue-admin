import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number
  message: string
  data: T
}

// 自定义请求参数
export interface RequestOptions {
  // 格式化提交参数时间
  formatDate?: boolean
  // 是否在合适时机取消请求：路由跳转时
  ignoreCancelToken?: boolean
  // 请求重试机制
  // retryRequest?: RetryRequest;
}

// 拓展后的axios配置参数类型
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

// 创建Axios类参数
export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions
  interceptors?: AxiosInterceptorsConfig
}
