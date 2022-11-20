import { defineStore } from 'pinia'
import { Menu } from '@/types/menu'
import { PermissionState } from '@/types/permission'
import { getPermCodeList } from '@/api/sys/user'
import { AddRouteRecordRaw } from '@/router/types'
import { useUserStore } from './user'
import { toRaw } from 'vue'
import { RoleEnum } from '@/enums/roleEnm'

export const permissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: []
  }),
  getters: {
    getPermList(): string[] | number[] {
      return this.permList
    },

    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },

    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },

    getBackMenuList(): Menu[] {
      return this.backMenuList
    },

    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    }
  },
  actions: {
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    setPermList(list: string[] | number[]) {
      this.permList = list
    },
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },

    async changePermList() {
      const list = await getPermCodeList()
      this.setPermList(list)
    }

    // // 解构路由
    // async bulidRoutes(): Promise<AddRouteRecordRaw[]> {
    //   const userStore = useUserStore()
    //   let routes: AddRouteRecordRaw[] = []
    //   const roleList = toRaw(userStore.getRoleList) || []

    //   // 路由过滤函数
    //   const routeFilter = (route: AddRouteRecordRaw) => {
    //     const { meta } = route
    //     // 抽出角色
    //     const { roles } = meta || {}
    //     const roles2 = roles as RoleEnum[] | undefined
    //     if (!roles2) return true
    //     // 进行角色权限判断
    //     return roleList.some((role) => roles2.includes(role))
    //   }

    //   const routeRemoveIgnoreFilter = (route: AddRouteRecordRaw) => {
    //     const { meta } = route
    //     // ignoreRoute 为true 则路由仅用于菜单生成，不会在实际的路由表中出现
    //     const { ignoreRoute } = meta || {}
    //     // arr.filter 返回 true 表示该元素通过测试
    //     return !ignoreRoute
    //   }

    //   /**
    //    * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
    //    * */
    //   const patchHomeAffix = (routes: AddRouteRecordRaw[]) => {
    //     if (!routes || routes.length === 0) return
    //     let homePath: string = userStore.getUserInfo.homePath || '/home'

    //     function patcher(routes: AddRouteRecordRaw[], parentPath = '') {
    //       if (parentPath) parentPath = parentPath + '/'
    //       routes.forEach((route: AddRouteRecordRaw) => {
    //         const { path, children, redirect } = route
    //         const currentPath = path.startsWith('/') ? path : parentPath + path
    //         if (currentPath === homePath) {
    //           if (redirect) {
    //             homePath = route.redirect! as string
    //           } else {
    //             route.meta = Object.assign({}, route.meta, { affix: true })
    //             throw new Error('end')
    //           }
    //         }
    //         children && children.length > 0 && patcher(children as unknown as AddRouteRecordRaw[], currentPath)
    //       })
    //     }

    //     try {
    //       patcher(routes)
    //     } catch (e) {
    //       // 已处理完毕跳出循环
    //     }
    //     return
    //   }

    //   switch (permissionMode) {
    //     // 角色权限
    //     case PermissionModeEnum.ROLE:
    //       // 对非一级路由进行过滤
    //       routes = filter(asyncRoutes, routeFilter)
    //       // 对一级路由根据角色权限过滤
    //       routes = routes.filter(routeFilter)
    //       // Convert multi-level routing to level 2 routing
    //       // 将多级路由转换为 2 级路由
    //       routes = flatMultiLevelRoutes(routes)
    //       break

    //     // 路由映射， 默认进入该case
    //     case PermissionModeEnum.ROUTE_MAPPING:
    //       // 对非一级路由进行过滤
    //       routes = filter(asyncRoutes, routeFilter)
    //       // 对一级路由再次根据角色权限过滤
    //       routes = routes.filter(routeFilter)
    //       // 将路由转换成菜单
    //       const menuList = transformRouteToMenu(routes, true)
    //       // 移除掉 ignoreRoute: true 的路由 非一级路由
    //       routes = filter(routes, routeRemoveIgnoreFilter)
    //       // 移除掉 ignoreRoute: true 的路由 一级路由；
    //       routes = routes.filter(routeRemoveIgnoreFilter)
    //       // 对菜单进行排序
    //       menuList.sort((a, b) => {
    //         return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
    //       })

    //       // 设置菜单列表
    //       this.setFrontMenuList(menuList)

    //       // Convert multi-level routing to level 2 routing
    //       // 将多级路由转换为 2 级路由
    //       routes = flatMultiLevelRoutes(routes)
    //       break

    //     //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
    //     //  如果确定不需要做后台动态权限，请在下方注释整个判断
    //     case PermissionModeEnum.BACK:
    //       const { createMessage } = useMessage()

    //       createMessage.loading({
    //         content: t('sys.app.menuLoading'),
    //         duration: 1
    //       })

    //       // !Simulate to obtain permission codes from the background,
    //       // 模拟从后台获取权限码，
    //       // this function may only need to be executed once, and the actual project can be put at the right time by itself
    //       // 这个功能可能只需要执行一次，实际项目可以自己放在合适的时间
    //       let routeList: AddRouteRecordRaw[] = []
    //       try {
    //         await this.changePermissionCode()
    //         routeList = (await getMenuList()) as AddRouteRecordRaw[]
    //       } catch (error) {
    //         console.error(error)
    //       }

    //       // Dynamically introduce components
    //       // 动态引入组件
    //       routeList = transformObjToRoute(routeList)

    //       //  Background routing to menu structure
    //       //  后台路由到菜单结构
    //       const backMenuList = transformRouteToMenu(routeList)
    //       this.setBackMenuList(backMenuList)

    //       // remove meta.ignoreRoute item
    //       // 删除 meta.ignoreRoute 项
    //       routeList = filter(routeList, routeRemoveIgnoreFilter)
    //       routeList = routeList.filter(routeRemoveIgnoreFilter)

    //       routeList = flatMultiLevelRoutes(routeList)
    //       routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
    //       break
    //   }

    //   routes.push(ERROR_LOG_ROUTE)
    //   patchHomeAffix(routes)
    //   return routes
    // }
  }
})
