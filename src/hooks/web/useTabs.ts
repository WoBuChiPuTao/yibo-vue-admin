import type { RouteLocationNormalized, Router } from 'vue-router'

import { useRouter } from 'vue-router'
import { unref } from 'vue'

import { useTabStore } from '@/store/modules/tabs'
// import { useAppStore } from '/@/store/modules/app'

enum TableActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE
}

export function useTabs(_router?: Router) {
  const router = _router || useRouter()
  const tabStore = useTabStore()

  const { currentRoute } = router

  function getCurrentTab() {
    const route = unref(currentRoute)
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)!
  }

  async function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    const targetTab = tab || unref(currentRoute)
    await tabStore.updateTabPath(path, targetTab)
  }

  async function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const targetTab = tab || unref(currentRoute)
    await tabStore.setTabTitle(title, targetTab)
  }

  async function handleTabAction(
    action: TableActionEnum,
    tab?: RouteLocationNormalized
  ) {
    const currentTab = getCurrentTab()

    switch (action) {
      case TableActionEnum.REFRESH:
        await tabStore.refreshPage(router)
        break
      case TableActionEnum.CLOSE_ALL:
        await tabStore.removeAllTabs(router)
        break
      case TableActionEnum.CLOSE_LEFT:
        await tabStore.removeLeftTabs(currentTab, router)
        break
      case TableActionEnum.CLOSE_RIGHT:
        await tabStore.removeRightTabs(currentTab, router)
        break
      case TableActionEnum.CLOSE_OTHER:
        await tabStore.removeOtherTabs(currentTab, router)
        break
      case TableActionEnum.CLOSE_CURRENT:
      case TableActionEnum.CLOSE:
        await tabStore.removeTab(tab || currentTab, router)
        break
    }
  }

  return {
    refreshPage: () => handleTabAction(TableActionEnum.REFRESH),
    closeAll: () => handleTabAction(TableActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TableActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TableActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TableActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TableActionEnum.CLOSE_CURRENT),
    close: (tab?: RouteLocationNormalized) =>
      handleTabAction(TableActionEnum.CLOSE, tab),
    setTitle: (title: string, tab?: RouteLocationNormalized) =>
      updateTabTitle(title, tab),
    updatePath: (fullPath: string, tab?: RouteLocationNormalized) =>
      updateTabPath(fullPath, tab)
  }
}
