import { Menu } from './menu'

export interface PermissionState {
  // 权限代码列表
  permList: string[] | number[]
  // 路由是否动态添加
  isDynamicAddedRoute: boolean
  // 菜单更新时间
  lastBuildMenuTime: number
  // 后台菜单列表
  backMenuList: Menu[]
  // 菜单列表
  frontMenuList: Menu[]
}
