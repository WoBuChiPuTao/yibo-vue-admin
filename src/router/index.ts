import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { basicRoutes } from './routes/index'
import type { App } from 'vue'

/**
 * @description 路由白名单
 */
const WHITE_ROUTE_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_ROUTE_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

// router配置
export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function resetRoutes() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_ROUTE_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// 创建router实例方法
export function setupRouter(app: App<Element>) {
  app.use(router)
}
