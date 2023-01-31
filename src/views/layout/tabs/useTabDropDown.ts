import { useTabs } from '@/hooks/web/useTabs'
import { useTabStore } from '@/store/modules/tabs'
import { computed, ComputedRef, reactive, unref } from 'vue'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { DropMenu, MenuEventEnum } from './types'
import { ArrowLeft, ArrowRight, Close, Minus, Refresh, RemoveFilled } from '@element-plus/icons-vue'

export function useTabDropdown(
  tabContent: RouteLocationNormalized,
  isTab: ComputedRef<boolean>
) {
  const {
    closeAll,
    closeOther,
    closeCurrent,
    closeLeft,
    closeRight,
    refreshPage
  } = useTabs()
  const tabStore = useTabStore()
  const { currentRoute } = useRouter()

  const state = reactive({
    presentTab: null as RouteLocationNormalized | null,
    presentTabIndex: 0
  })

  const getTargetTab = computed(() => {
    return unref(isTab) ? unref(state).presentTab : unref(currentRoute)
  })

  /**
   * @description: 下拉菜单
   */
  const getDropList = computed(() => {
    if (!unref(getTargetTab)) {
      return
    }

    const { path } = unref(currentRoute)

    const curItem = state.presentTab
    const curIndex = state.presentTabIndex
    const isCurrentTab = curItem ? curItem.path === path : false

    const refreshDisabled = !isCurrentTab
    const closeLeftDisabled = curIndex === 0 || !isCurrentTab
    const closeAllDisabled = tabStore.getTabList.length === 1
    const closeRightDisabled =
      !isCurrentTab ||
      (curIndex === tabStore.getTabList.length - 1 &&
        tabStore.getLastDragIndex >= 0)

    const dropList: DropMenu[] = [
      {
        icon: Refresh,
        event: MenuEventEnum.REFRESH_PAGE,
        text: '重新加载',
        disabled: refreshDisabled
      },
      {
        icon: Close,
        event: MenuEventEnum.CLOSE_CURRENT,
        text: '关闭标签页',
        disabled: closeAllDisabled,
        divided: true
      },
      {
        icon: ArrowLeft,
        event: MenuEventEnum.CLOSE_LEFT,
        text: '关闭左侧标签页',
        disabled: closeLeftDisabled,
        divided: true
      },
      {
        icon: ArrowRight,
        event: MenuEventEnum.CLOSE_RIGHT,
        text: '关闭右侧标签页',
        disabled: closeRightDisabled,
        divided: true
      },
      {
        icon: Minus,
        event: MenuEventEnum.CLOSE_OTHER,
        text: '关闭其它标签页',
        disabled: closeAllDisabled || !isCurrentTab,
        divided: true
      },
      {
        icon: RemoveFilled,
        event: MenuEventEnum.CLOSE_ALL,
        text: '关闭全部标签页',
        disabled: closeAllDisabled,
        divided: true
      }
    ]
    return dropList
  })

  function handleContextMenu(tabItem: RouteLocationNormalized) {
    return (e: Event) => {
      if (!tabItem) {
        return
      }
      e?.preventDefault()
      const index = tabStore.getTabList.findIndex(
        (tab) => tab.path === tabItem.path
      )
      state.presentTab = tabItem
      state.presentTabIndex = index
    }
  }

  function handleMenuEvent(event: string | number) {
    // const { event } = menu
    switch (event) {
      case MenuEventEnum.REFRESH_PAGE:
        refreshPage()
        break
      case MenuEventEnum.CLOSE_CURRENT:
        closeCurrent()
        break
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft()
        break
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight()
        break
      case MenuEventEnum.CLOSE_OTHER:
        closeOther()
        break
      case MenuEventEnum.CLOSE_ALL:
        closeAll()
        break
    }
  }

  return { getDropList, handleContextMenu, handleMenuEvent }
}
