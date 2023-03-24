import { MenuSetting } from '#/config'
import { MenuTypeEnum } from '@/enums/configEnum'
import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getShowMenu = computed(() => appStore.getMenuSetting.show)
  const getMenuType = computed(() => appStore.getMenuSetting.type || MenuTypeEnum.SIDE)
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getSiderHidden = computed(() => appStore.getMenuSetting.siderHidden)
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)

  // 菜单类型
  const getIsSideMenu = computed(() => unref(getMenuType) === MenuTypeEnum.SIDE)
  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  // 是否展现sideMenu
  const getShowSideMenu = computed(() => {
    return unref(getShowMenu) && unref(getIsSideMenu)
  })

  // colllpase后的宽度
  const getMenuMiniWidth = computed(() => {
    return unref(getSiderHidden) ? 0 : 48
  })
  // sideMenu的宽度
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
    getMenuType,
    getShowMenu,
    getCollapsed,
    getMenuTheme,
    getMenuWidth,
    getMenuMiniWidth,
    getRealWidth,
    getShowSideMenu,
    getIsSideMenu,
    getIsTopMenu,
    setMenuSetting,
    toggleCollapsed
  }
}
