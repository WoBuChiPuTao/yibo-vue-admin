import { MenuSetting } from '#/config'
import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getSiderHidden = computed(() => appStore.getMenuSetting.siderHidden)
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  const getMenuMiniWidth = computed(() => {
    return unref(getSiderHidden) ? 0 : 48
  })
  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMenuMiniWidth) : unref(getMenuWidth)
  })

  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectSetting({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({ collapsed: !unref(getCollapsed) })
  }

  return {
    getCollapsed,
    getMenuTheme,
    getMenuWidth,
    getMenuMiniWidth,
    getRealWidth,
    setMenuSetting,
    toggleCollapsed
  }
}
