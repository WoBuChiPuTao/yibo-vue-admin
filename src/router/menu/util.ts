import { Menu } from '#/list'
import { isUrl } from '@/utils/is'
import { findPath, treeMap } from '@/hooks/tree'
import { cloneDeep } from 'lodash-es'
import { AddRouteRecordRaw } from '../types'
import { asyncRoutes } from '../routes'
import { deepMerge } from '@/utils'

/**
 * @description 得到父级菜单路径
 */
export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

// 拼接父级的路径
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // 判断是否为根路由或地址
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.path)
    }
  }
}

// 将路由转换为menu
export function routeToMenu(routes: AddRouteRecordRaw[]) {
  const cloneRouteList = cloneDeep(routes)
  const list = treeMap(cloneRouteList, {
    conversion: (node: AddRouteRecordRaw) => {
      const { meta: { title } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  joinParentPath(list as Menu[])
  list.forEach((item) => {
    // 单个不显示子菜单重定向
    if (
      item.children?.length === 1 &&
      item.children[0]?.meta.hideMenu === true &&
      typeof item.redirect === 'string'
    ) {
      item.path = item.redirect
    }
  })
  return cloneDeep(list) as Menu[]
}

/**
 * @description 根据菜单的路径过滤路由
 */
export function filterRoutesFromMenu(menu: Menu[], routes = asyncRoutes) {
  const cloneRoutes = cloneDeep(routes)
  const menus = flatMenu(cloneDeep(menu))
  const resRoutes = cloneRoutes.map((route) => {
    return deleteRoutesFromMenu(menus, route)
  })
  return resRoutes.filter((item) => item) as AddRouteRecordRaw[]
}

function deleteRoutesFromMenu(
  flatMenu: Omit<Menu[], 'children'>,
  route: AddRouteRecordRaw
): AddRouteRecordRaw | undefined {
  const { meta: { hideMenu = false } = {} } = route
  const index = flatMenu.findIndex((menu) => route.path === menu.path)
  if (index === -1 && !hideMenu) {
    return undefined
  }
  // 按钮权限赋值
  route.meta.rights = flatMenu[index].rights

  route.children = route.children
    ?.map((item) => deleteRoutesFromMenu(flatMenu, item))
    .filter((item) => item !== undefined) as AddRouteRecordRaw[]
  return route
}

/**
 * @description 扁平化菜单
 */
export function flatMenu(menus: Menu[]): Omit<Menu[], 'children'> {
  const cloneMenu = cloneDeep(menus)
  cloneMenu.forEach((menu) => {
    if (menu.children) {
      menu.children.forEach((childMenu) => {
        const index = cloneMenu.findIndex((val) => val.path === childMenu.path)
        if (index === -1) {
          cloneMenu.push(childMenu)
          return
        }
        cloneMenu[index] = deepMerge(cloneMenu[index], childMenu)
      })
      Reflect.deleteProperty(menu, 'children')
    }
  })
  return cloneMenu
}
