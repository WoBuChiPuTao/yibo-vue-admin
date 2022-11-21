import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

export function setupRouteGuard(router: Router) {
  createPageGuard(router)
}

function createPageGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = userStore.getToken
    console.log('token', token)
    if (!token) {
      if (to.path !== '/login') {
        next({ path: '/login', replace: true })
        return
      }
    }
    // next()

    if (from.path === '/login' && to.path !== '/login') {
      next({ path: to.path, replace: true })
    } else {
      next()
    }
  })
}

// // Routing switch back to the top
// function createScrollGuard(router: Router) {
//   const isHash = (href: string) => {
//     return /^#/.test(href)
//   }

//   const body = document.body

//   router.afterEach(async (to) => {
//     // scroll top
//     isHash((to as RouteLocationNormalized & { href: string })?.href) &&
//       body.scrollTo(0, 0)
//     return true
//   })
// }
