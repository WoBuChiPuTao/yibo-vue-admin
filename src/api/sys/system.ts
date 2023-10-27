import { Menu } from '#/list'
import { http } from '@/utils/axios/index'

/**
 * 得到所有的菜单
 */
export function getAllMenu() {
  return http.get<Menu[]>('/system/menu')
}
