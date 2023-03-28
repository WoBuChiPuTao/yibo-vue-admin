import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getShowHeader = computed(() => appStore.getHeaderSetting.show)
  const getHeaderHeight = computed(() => appStore.getHeaderSetting.headerHeight)
  const getShowBreadCrumb = computed(() => appStore.getHeaderSetting.showBreadCrumb)
  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen)
  const getShowMultLang = computed(() => appStore.getHeaderSetting.showMultLang)
  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice)
  const getShowSetting = computed(() => appStore.getHeaderSetting.showSettingButton)

  return {
    getShowHeader,
    getHeaderHeight,
    getShowBreadCrumb,
    getShowFullScreen,
    getShowMultLang,
    getShowNotice,
    getShowSetting
  }
}
