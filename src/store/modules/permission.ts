import { Menu } from '#/list'
import { getMenuFromRole } from '@/api/sys/user'
import { filterRoutesFromMenu } from '@/router/menu/util'
import { deepMerge } from '@/utils'
import { defineStore } from 'pinia'
import { useUserStore } from './user'

interface permissionState {
  // 菜单列表
  menuList: Menu[]
  // 菜单最后更新事件
  updateMenuLastTime: number
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): permissionState => ({
    menuList: [],
    updateMenuLastTime: 0
  }),
  getters: {
    getMenuList(): Menu[] {
      return this.menuList || []
    }
  },
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list
      this.updateMenuLastTime = new Date().getTime()
    },
    async buildRoutes() {
      const { getRoleList } = useUserStore()
      const menuArr = await Promise.all(getRoleList.map((role) => getMenuFromRole(role)))
      const menu = menuArr.reduce((pre, now) => {
        now.forEach((nowItem) => {
          const index = pre.findIndex((preItem) => preItem.path === nowItem.path)
          if (index === -1) {
            pre.push(nowItem)
          } else {
            pre[index] = deepMerge(pre[index], nowItem)
          }
        })
        return pre
      }, [])
      console.log('menu', menu)
      const routes = filterRoutesFromMenu(menu)
      // this.setMenuList(routeToMenu(routes))
      this.setMenuList(menu)
      return routes
    }
  }
})
