import { defaultConfig } from './config'
import { YAxios } from './instance'
import { axiosInterceptors } from './interceptors'

export const http = new YAxios({ ...defaultConfig, interceptors: axiosInterceptors })
