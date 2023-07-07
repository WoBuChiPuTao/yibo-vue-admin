type UserInfo = import('./store').UserInfo

/* 登录接口参数类型 */
export interface LoginParam {
  userName: string
  password: string
}
/* 登录接口返回值类型 */
export interface LoginRes extends UserInfo {
  token: string
  roles: string[]
}
