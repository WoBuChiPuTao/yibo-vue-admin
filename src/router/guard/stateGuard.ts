import { removeTabChangeListener } from '@/hooks/mitt/routeChange'
import { useAppStore } from '@/store/modules/app'
import { useTabStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import { Router } from 'vue-router'

export function createStateGuard(router: Router) {
  router.beforeEach((to) => {
    // 退出登录时重置所有状态
    if (to.path === '/login') {
      const tabStore = useTabStore()
      const userStore = useUserStore()
      const appStore = useAppStore()
      appStore.resetAllStateSync()
      userStore.resetState()
      tabStore.resetState()
      removeTabChangeListener()
    }
  })
}
