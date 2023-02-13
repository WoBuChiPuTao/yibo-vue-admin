import axios from 'axios'
import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { ElMessage } from 'element-plus'
import { Header, TIME_OUT, BASEURL } from './config'

const service: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: TIME_OUT,
  headers: Header
  // withCredentials: true // 需配置为true，使请求体携带cookie
})

/* 请求拦截器 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data // 根据自定义错误码判断请求是否成功
    console.log('response.data', response.data)
    if (code === 200) {
      // 将组件用的数据返回
      return data
    } else {
      // 处理业务错误。
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token 失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '拒绝访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器故障'
        break
      default:
        message = '网络连接故障'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

/* 导出封装的请求方法 */
export const http = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },
  post<T = unknown>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config)
  },
  put<T = unknown>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config)
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}
