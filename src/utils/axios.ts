// src/axios.ts
import axios from 'axios'
// const env = import.meta.env.VITE_API_BASE_URL
const ConfigBaseURL = 'http://10.0.0.23:8090' // 默认路径，这里也可以使用env来判断环境
// 使用create方法创建axios实例
const Axios = axios.create({
  timeout: 5000, // 请求超时时间
  baseURL: ConfigBaseURL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyYW5kb20iOiI4aDd2ZWIiLCJsb2dpbk5hbWUiOiJ0ZXN0MiJ9.LYTDwHjwzhFMs1bSDY4Ov_8LriOdJy-s6sxuZlZCwV4'
  }
})
// 添加请求拦截器
Axios.interceptors.request.use((config: object) => {
  console.log(config)
  return config
})
// 添加响应拦截器
Axios.interceptors.response.use(
  (response: any) => {
    console.log(response)
    return response.data
  },
  (error: any) => {
    console.log('Response: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    // alert(msg)
    return Promise.reject(error)
  }
)

export default Axios
