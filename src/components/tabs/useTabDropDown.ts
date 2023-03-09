import { useTabs } from '@/hooks/web/useTabs'
import { useTabStore } from '@/store/modules/tabs'
import { computed, ComputedRef, reactive, unref } from 'vue'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { ArrowLeft, ArrowRight, Close, Minus, Refresh, RemoveFilled } from '@element-plus/icons-vue'
import { DropMenu } from '@/types/menu'
import { useI18n } from '@/hooks/web/useI18n'

enum MenuEventEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL
}

export function useTabDropdown(tabContent: RouteLocationNormalized, isTab: ComputedRef<boolean>) {
  const { closeAll, closeOther, closeCurrent, closeLeft, closeRight, refreshPage } = useTabs()
  const tabStore = useTabStore()
  const { currentRoute } = useRouter()
  const { t } = useI18n()

  const state = reactive({
    presentTab: null as RouteLocationNormalized | null,
    presentTabIndex: 0
  })

  const getTargetTab = computed(() => {
    return unref(isTab) ? tabContent : unref(currentRoute)
  })

  /**
   * @description: 下拉菜单
   */
  const getDropList = computed(() => {
    if (!unref(getTargetTab)) {
      return
    }

    const { meta } = unref(getTargetTab)
    const { path } = unref(currentRoute)

    const curItem = state.presentTab
    const curIndex = state.presentTabIndex
    const isCurrentTab = curItem ? curItem.path === path : false

    const refreshDisabled = !isCurrentTab
    const closeLeftDisabled = curIndex === 0 || !isCurrentTab
    const closeAllDisabled = tabStore.getTabList.length === 1
    const closeRightDisabled =
      !isCurrentTab ||
      (curIndex === tabStore.getTabList.length - 1 && tabStore.getLastDragIndex >= 0)

    const dropList: DropMenu[] = [
      {
        icon: Refresh,
        event: MenuEventEnum.REFRESH_PAGE,
        text: t('common.tabDropdown.reload'),
        disabled: refreshDisabled
      },
      {
        icon: Close,
        event: MenuEventEnum.CLOSE_CURRENT,
        text: t('common.tabDropdown.close'),
        disabled: !!meta.fixedTab || closeAllDisabled,
        divided: true
      },
      {
        icon: ArrowLeft,
        event: MenuEventEnum.CLOSE_LEFT,
        text: t('common.tabDropdown.closeLeft'),
        disabled: closeLeftDisabled,
        divided: true
      },
      {
        icon: ArrowRight,
        event: MenuEventEnum.CLOSE_RIGHT,
        text: t('common.tabDropdown.closeRight'),
        disabled: closeRightDisabled,
        divided: true
      },
      {
        icon: Minus,
        event: MenuEventEnum.CLOSE_OTHER,
        text: t('common.tabDropdown.closeOther'),
        disabled: closeAllDisabled || !isCurrentTab,
        divided: true
      },
      {
        icon: RemoveFilled,
        event: MenuEventEnum.CLOSE_ALL,
        text: t('common.tabDropdown.closeAll'),
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
      const index = tabStore.getTabList.findIndex((tab) => tab.path === tabItem.path)
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
