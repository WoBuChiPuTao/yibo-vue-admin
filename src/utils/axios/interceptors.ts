import { useI18n } from '@/hooks/web/useI18n'
import { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { AxiosInterceptorsConfig, Result } from './types'

const { t } = useI18n()

export const axiosInterceptors: AxiosInterceptorsConfig = {
  requestInterceptors: (config) => {
    // 添加请求头
    // const conf = config as Recordable
    return config
  },
  responseInterceptors: (response: AxiosResponse<Result>) => {
    const { code, message, data } = response.data // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return data
    } else {
      // 处理业务错误。
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  requestInterceptorsCatch: (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
  responseInterceptorsCatch: (error) => {
    // 处理 HTTP 网络错误
    let errMessage = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        errMessage = t('sys.api.errMsg401')
        // 这里可以触发退出的 action
        break
      case 403:
        errMessage = t('sys.api.errMsg403')
        break
      case 404:
        errMessage = t('sys.api.errMsg404')
        break
      case 405:
        errMessage = t('sys.api.errMsg405')
        break
      case 408:
        errMessage = t('sys.api.errMsg408')
        break
      case 500:
        errMessage = t('sys.api.errMsg500')
        break
      case 501:
        errMessage = t('sys.api.errMsg501')
        break
      case 502:
        errMessage = t('sys.api.errMsg502')
        break
      case 503:
        errMessage = t('sys.api.errMsg503')
        break
      case 504:
        errMessage = t('sys.api.errMsg504')
        break
      case 505:
        errMessage = t('sys.api.errMsg505')
        break
      default:
        errMessage = 'Error Status:' + status
    }
    ElMessage.error(errMessage)
    return Promise.reject(error)
  }
}
