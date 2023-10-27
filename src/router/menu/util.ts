import { Menu } from '#/list'
import { isUrl } from '@/utils/is'
import { findPath, treeMap } from '@/hooks/tree'
import { cloneDeep } from 'lodash-es'
import { AddRouteRecordRaw } from '../types'
import { asyncRoutes } from '../routes'

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
      // 父级菜单路径
      menu.parentPath = parentPath
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
      const { meta: { title, icon, orderNo, hideMenu = false } = {} } = node

      return {
        meta: node.meta,
        name: title,
        path: node.path,
        icon,
        orderNo,
        hideMenu,
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
      item.redirect = undefined
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
  const backRoutes = resRoutes.filter((item) => item) as AddRouteRecordRaw[]
  return backRoutes
}

function deleteRoutesFromMenu(
  flatMenu: Omit<Menu[], 'children'>,
  route: AddRouteRecordRaw,
  parentPath = ''
): AddRouteRecordRaw | undefined {
  const currentRoutePath = parentPath === '' ? route.path : parentPath + '/' + route.path
  const reg = new RegExp(`${currentRoutePath}`, 'g')
  const index = flatMenu.findIndex((menu) => reg.test(menu.path))
  if (index === -1) {
    return undefined
  }
  // meta赋值,包括按钮等等
  const { meta, name, rights, icon, hideMenu = false, orderNo, fixedTab = false } = flatMenu[index]
  route.meta = { ...meta, title: name, rights, icon, hideMenu, orderNo, fixedTab }

  route.children = route.children
    ?.map((item) => deleteRoutesFromMenu(flatMenu, item, currentRoutePath))
    .filter((item) => item !== undefined) as AddRouteRecordRaw[]
  return route
}

/**
 * @description 扁平化菜单
 */
export function flatMenu(menus: Menu[]): Omit<Menu[], 'children'> {
  const cloneMenu = cloneDeep(menus)
  const noChildMenus: Omit<Menu[], 'children'> = []
  treeMap(cloneMenu, {
    conversion: (menu: Menu) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children, ...noChild } = menu
      noChildMenus.push(noChild)
    }
  })
  return noChildMenus
}
