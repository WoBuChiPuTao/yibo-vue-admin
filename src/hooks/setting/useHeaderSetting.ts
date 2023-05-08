import { HeaderSetting } from '#/config'
import { MenuTypeEnum } from '@/enums/configEnum'
import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getMenuType = computed(() => appStore.getSiderSetting.menuType || MenuTypeEnum.SIDE)
  const getShowHeader = computed(() => appStore.getHeaderSetting.show)
  const getHeaderHeight = computed(() => appStore.getHeaderSetting.headerHeight)
  const getShowBreadCrumb = computed(() => appStore.getHeaderSetting.showBreadCrumb)
  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)
  const getShowMultLang = computed(() => appStore.getHeaderSetting.showMultLang)
  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)
  const getShowSetting = computed(() => appStore.getHeaderSetting.showSettingButton)

  const getShowHeaderMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
    appStore.setProjectSetting({ headerSetting })
  }

  return {
    getShowHeader,
    getHeaderHeight,
    getShowBreadCrumb,
    getShowFullScreen,
    getShowMultLang,
    getShowNotice,
    getShowSetting,
    getShowHeaderMenu,
    setHeaderSetting
  }
}
