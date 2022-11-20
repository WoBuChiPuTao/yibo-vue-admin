import { http } from '@/utils/axios/index'

import type { UserInfoRes, LoginParam, LoginRes } from '@/types/user'

/**
 * 登录
 */
export function login(data: LoginParam) {
  return http.post<LoginRes>('/user/login', data)
}

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
  return http.get<UserInfoRes>('/user/info')
}

/**
 * @description 获取权限代码列表
 */
export function getPermCodeList() {
  return http.get<string[]>('/user/permLsit')
}
