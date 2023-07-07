import { AddAxiosRequestConfig } from './types'

export const BASEURL = process.env.VUE_APP_API_URL

export const TIME_OUT = 5000

export const Header = {}

export const defaultConfig: AddAxiosRequestConfig = {
  baseURL: BASEURL,
  timeout: TIME_OUT,
  headers: Header,
  requestOptions: {
    ignoreCancelToken: false
  }
  // withCredentials: true // 需配置为true，使请求体携带cookie，
}

// calcelToken白名单
// 格式：url
export const WHITE_CANCEL_URL: string[] = []
