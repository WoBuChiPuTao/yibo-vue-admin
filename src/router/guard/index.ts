import { setRouteChange } from '@/hooks/mitt/routeChange'
import type { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { createStateGuard } from './stateGuard'
// 进度条
import NProgress from 'nprogress'
import { AxiosCancel } from '@/utils/axios/axiosCancel'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

export function setupRouterGuard(router: Router) {
  createStateGuard(router)
  createPageGuard(router)
  createHttpGuard(router)
  createPageLoading(router)
  createPageTransitionGuard(router)
  createPermissionGuard(router)
}

// 清除http请求
function createHttpGuard(router: Router) {
  router.beforeEach(() => {
    AxiosCancel.clearPending()
    return true
  })
}

// Hooks for handling page state
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
    return true
  })
}

// 使用过渡组件
function createPageTransitionGuard(router: Router) {
  router.beforeEach((to, from) => {
    if (!to.meta.loaded && from.name !== undefined) {
      NProgress.start()
    }
    return true
  })

  router.afterEach((to, from) => {
    // 进度条消失
    if (!to.meta.loaded && from.name !== undefined) {
      NProgress.done()
    }

    return true
  })
}

// 使用PageLoading
function createPageLoading(router: Router) {
  const userStore = useUserStore()
  const appStore = useAppStore()
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }
    // 将loading状态开启
    appStore.setPageLoadingSync(true)
    return true
  })
  router.afterEach(async () => {
    // 防止loading加载过快无法显示
    setTimeout(() => {
      appStore.setPageLoading(false)
    }, 220)
  })
}
