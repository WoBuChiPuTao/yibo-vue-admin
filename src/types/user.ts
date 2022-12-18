import { RoleEnum } from '@/types/enums/roleEnm'
import { RoleInfo } from './sys'
/**
 * @description: 用户信息
 */
export interface UserInfoRes {
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
  userInfo: Nullable<UserInfoRes>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
}

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
