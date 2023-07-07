import { LoginParam, LoginRes } from '#/api'
import { Menu } from '#/list'
import { http } from '@/utils/axios/index'

/**
 * 登录
 */
export function login(data: LoginParam) {
  return http.post<LoginRes>('/user/login', data)
}

/**
 * @description 获取菜单列表
 */
export function getMenuFromRole(role: string) {
  return http.post<Menu[]>('/user/menu', { role })
}
