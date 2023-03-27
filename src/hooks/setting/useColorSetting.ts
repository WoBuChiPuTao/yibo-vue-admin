import { ColorSetting, HeaderColorSetting, SiderColorSetting } from '#/config'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useColorSetting() {
  const appStore = useAppStore()
  const getMainColor = computed(() => {
    return appStore.getProjectSetting.themeColor.mainColor
  })
  const getSiderColor = computed(() => {
    return appStore.getProjectSetting.themeColor.siderColor
  })
  const getHeaderColor = computed(() => {
    return appStore.getProjectSetting.themeColor.headerColor
  })

  function setMainColor(mainColor: Partial<ColorSetting<{ name: string; value: string }>>): void {
    appStore.setProjectSetting({ themeColor: { mainColor } })
  }

  function setSiderColor(siderColor: Partial<ColorSetting<SiderColorSetting>>): void {
    appStore.setProjectSetting({ themeColor: { siderColor } })
  }

  function setHeaderColor(headerColor: Partial<ColorSetting<HeaderColorSetting>>): void {
    appStore.setProjectSetting({ themeColor: { headerColor } })
  }
  return {
    getMainColor,
    getSiderColor,
    getHeaderColor,
    setMainColor,
    setSiderColor,
    setHeaderColor
  }
}
