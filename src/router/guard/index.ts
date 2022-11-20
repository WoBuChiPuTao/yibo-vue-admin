import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

export function setupRouteGuard(router: Router) {
  createPageGuard(router)
 // createLoginGuard(router)
}

function createPageGuard(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    const token = userStore.getToken
    if (!token) {
      if (to.path !== '/login') {
        router.replace('/login')
      }
    }
    return true
  })
}

// function createLoginGuard(router: Router) {
//   router.beforeEach((to, from) => {
//     if (to.path !== '/login' && from.path === '/login') {
//       router.replace(to.path)
//     }
//     return true
//   })
// }

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
