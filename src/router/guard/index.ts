import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

export function setupRouteGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router) {
  router.beforeEach((to, _, next) => {
    const userStore = useUserStore()
    const token = userStore.getToken
    console.log('token', token)
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
    next()
  })
}
