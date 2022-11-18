import { RoleInfo } from './sys'
/**
 * @description: 用户信息
 */
export interface UserInfo {
  userId: string | number
  username: string
  realName: string
  avatar: string
  desc?: string
  homePath?: string
  roles: RoleInfo[]
}

/**
 * @description: 用户状态信息
 *
 */
export interface UserState {
  userInfo: Nullabel<UserInfo>
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
