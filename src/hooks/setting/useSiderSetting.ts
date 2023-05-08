import { SiderSetting } from '#/config'
import { MenuTypeEnum } from '@/enums/configEnum'
import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'

export function useSiderSetting() {
  const appStore = useAppStore()

  const getShowSider = computed(() => appStore.getSiderSetting.show)
  const getMenuType = computed(() => appStore.getSiderSetting.menuType || MenuTypeEnum.SIDE)
  const getCollapsed = computed(() => appStore.getSiderSetting.collapsed)
  const getSiderWidth = computed(() => appStore.getSiderSetting.siderWidth)
  const getCollapsedWidth = computed(() => appStore.getSiderSetting.siderCollapsedWidth)

  // 菜单类型
  const getIsSideMenu = computed(() => unref(getMenuType) === MenuTypeEnum.SIDE)

  // 是否展现sideMenu
  const getShowSideMenu = computed(() => {
    return unref(getShowSider) && unref(getIsSideMenu)
  })

  // colllpase后的宽度
  const getSiderMiniWidth = computed(() => {
    return unref(getShowSider) ? unref(getCollapsedWidth) : 0
  })
  // sideMenu的宽度
  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getSiderMiniWidth) : unref(getSiderWidth)
  })

  function setSiderSetting(siderSetting: Partial<SiderSetting>): void {
    appStore.setProjectSetting({ siderSetting })
  }

  function toggleCollapsed() {
    setSiderSetting({ collapsed: !unref(getCollapsed) })
  }

  return {
    getMenuType,
    getShowSider,
    getCollapsed,
    getSiderWidth,
    getSiderMiniWidth,
    getRealWidth,
    getShowSideMenu,
    getIsSideMenu,
    setSiderSetting,
    toggleCollapsed
  }
}
