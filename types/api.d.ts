/* 登录接口参数类型 */
export interface LoginParam {
  username: string
  password: string
}
/* 登录接口返回值类型 */
export interface LoginRes {
  token: string
  role: RoleInfo
}
