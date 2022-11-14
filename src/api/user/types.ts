/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T = any> {
  code: number
  message: string
  data: T
}

/* 登录接口参数类型 */
export interface LoginData {
  username: string
  password: string
}
/* 登录接口返回值类型 */
export interface LoginRes {
  token: string
}
/* 用户信息接口返回值类型 */
export interface UserInfoRes {
  id: string
  username: string
  avatar: string
  description: string
}
