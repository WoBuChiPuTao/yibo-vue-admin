import { setRouteChange } from '@/hooks/mitt/routeChange'
import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useTabStore } from '@/store/modules/tabs'

export function setupRouteGuard(router: Router) {
  createPageTransitionGuard(router)
  createPageGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page transition status
function createPageTransitionGuard(router: Router) {
  router.beforeEach((to) => {
    // 根据tab缓存来决定是否出现进度条
    const tabStore = useTabStore()
    if (!tabStore.getCacheList.includes(to.name as string)) {
      NProgress.start()
    }
    return true
  })

  router.afterEach(() => {
    // 进度条消失
    NProgress.done()
  })
}
