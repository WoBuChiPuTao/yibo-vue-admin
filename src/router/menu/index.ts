import { Menu } from '@/types/menu'
import { asyncRoutes } from '@/router/routes/modules'
import { routeToMenu } from './util'
import { treeMap } from '@/hooks/tree'

async function getAsyncMenus() {
  const menulist = routeToMenu(asyncRoutes)
  // 剔除隐藏菜单
  const filtermenu = treeMap(menulist, {
    conversion: (node: Menu) => {
      const { children = [] } = node
      for (let index = 0; index < children.length; index++) {
        const { meta: { hideMenu = false } = {} } = children[index]
        if (hideMenu) {
          children.splice(index, 1)
        }
      }
      return node
    }
  })
  // 菜单排序
  filtermenu.sort((a, b) => {
    return (a?.orderNo || 0) - (b?.orderNo || 0)
  })
  return filtermenu
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  return menus
}
