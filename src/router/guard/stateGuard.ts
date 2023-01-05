import { removeTabChangeListener } from '@/hooks/mitt/routeChange'
import { Router } from 'vue-router'

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    if (to.path === '/login') {
      removeTabChangeListener()
    }
  })
}
