import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { asyncRoutes } from '../routes/modules'
import { flatMultiRoutes } from '@/hooks/route'

export function createPermissionGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    const userStore = useUserStore()
    const token = userStore.getToken
    // 判断登录页
    if (to.path === '/login') {
      next()
      return
    }

    if (!token) {
      const redirectData: {
        path: string
        replace: boolean
        query?: Record<string, string>
      } = {
        path: '/login',
        replace: true
      }
      redirectData.query = {
        ...redirectData.query,
        redirect: to.path
      }
      next(redirectData)
      return
    }

    // 页面刷新重新添加动态路由
    const routes = flatMultiRoutes(asyncRoutes as RouteRecordRaw[])
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    if (to.name === 'PageNotFound') {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
      return
    }
    next()
  })
}
