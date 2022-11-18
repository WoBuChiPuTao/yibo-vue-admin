import type { Router, RouteLocationNormalized } from 'vue-router'

export function setupRouteGuard(router: Router) {
  createScrollGuard(router)
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0)
    return true
  })
}
