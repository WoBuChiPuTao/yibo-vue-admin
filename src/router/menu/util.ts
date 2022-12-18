import { isUrl } from '@/hooks/is'
import { treeMap } from '@/hooks/tree'
import { Menu } from '@/types/menu'
import { cloneDeep } from 'lodash-es'
import { AddRouteRecordRaw } from '../types'

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
  const routeList: AddRouteRecordRaw[] = []
  cloneRouteList.forEach((item) => {
    // 判断子菜单是否显示
    if (item.meta?.hideChildrenMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }
    routeList.push(item)
  })
  // 提取树指定结构
  const list = treeMap(routeList, {
    conversion: (node: AddRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  joinParentPath(list as Menu[])
  return cloneDeep(list) as Menu[]
}
