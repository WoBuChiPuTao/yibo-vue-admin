import type { Router, RouteRecordRaw } from 'vue-router'
import { useUserStoreOther } from '@/store/modules/user'
import { asyncRoutes } from '../routes/modules'
import { flatMultiRoutes } from '@/hooks/route'
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic'

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreOther()

  router.beforeEach((to, from, next) => {
    console.log('11111')
    console.log(
      'init' +
        '----' +
        from.fullPath +
        '---' +
        (from.name as string) +
        '---' +
        to.fullPath +
        '---' +
        (to.name as string)
    )
    const token = userStore.getToken
    // 判断登录页
    if (to.path === '/login') {
      // 阻止地址栏跳转登录页
      if (token) {
        next((to.query?.redirect as string) || '/')
        return
      }
      next()
      return
    }

    // token不存在重定向
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

    // // Jump to the 404 page after processing the login
    // if (
    //   from.path === '/login' &&
    //   to.name === 'PageNotFound' &&
    //   to.fullPath !== '/home'
    // ) {
    //   console.log('PageNotFound to' + to.fullPath)
    //   next('/home')
    //   return
    // }

    if (userStore.getIsDynamicAddedRoute) {
      console.log(
        'getIsDynamicAddedRoute --- true---' +
          from.fullPath +
          '-----' +
          to.fullPath
      )
      next()
      return
    }

    // 页面刷新重新添加动态路由
    const routes = flatMultiRoutes(asyncRoutes as RouteRecordRaw[])
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
    userStore.setIsDynamicAddedRoute(true)

    if (to.name === 'PageNotFound') {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      console.log(
        'PageNotFound---' +
          from.fullPath +
          '----' +
          to.fullPath +
          '---' +
          to.name,
        to.query
      )
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      console.log('aaaaaaPageNotFound')
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
    console.log('22222')
  })
}
