import { AddAxiosRequestConfig } from './types'

export const BASEURL = process.env.VUE_APP_BASE_URL
// export const BASEURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
export const TIME_OUT = 5000

export const Header = {
  auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb20iOiI4aDd2ZWIiLCJsb2dpbk5hbWUiOiJ0ZXN0MiJ9.LYTDwHjwzhFMs1bSDY4Ov_8LriOdJy-s6sxuZlZCwV4'
}

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
