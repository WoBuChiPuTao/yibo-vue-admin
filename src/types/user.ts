import { RoleEnum } from '@/types/enums/roleEnm'

/**
 * @description: 用户角色信息
 */
export interface RoleInfo {
  roleName: string
  value: string
}

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
  isDynamicAddedRoute: boolean
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
