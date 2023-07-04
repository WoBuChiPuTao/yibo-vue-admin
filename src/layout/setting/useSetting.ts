import { ColorSetting, SiderColorSetting, HeaderColorSetting } from '#/config'
import { setCssVar } from '@/hooks/dom/useCssVar'
import { useColorSetting } from '@/hooks/setting/useColorSetting'
import { unref } from 'vue'

export function useSiderSetting() {
  const {
    getSiderColor,
    setSiderColor: setSiderColorStorage,
    getHeaderColor,
    setHeaderColor: setHeaderColorStorage,
    getMainColor,
    setMainColor: setMainColorStorage
  } = useColorSetting()

  function setSiderColor(color: ColorSetting<SiderColorSetting>) {
    const oldSiderColor = unref(getSiderColor)
    if (color && oldSiderColor.theme === color.theme) {
      return
    }
    setSiderColorStorage(color)
    Object.keys(color?.config).forEach((key) => {
      setCssVar(key, color?.config[key])
    })
  }

  function setHeaderColor(color: ColorSetting<HeaderColorSetting>) {
    const oldHeaderColor = unref(getHeaderColor)
    if (color && oldHeaderColor.theme === color.theme) {
      return
    }
    setHeaderColorStorage(color)
    Object.keys(color?.config).forEach((key) => {
      setCssVar(key, color?.config[key])
    })
  }

  function setMainColor(color: ColorSetting<{ name: string; value: string }>) {
    const oldMainColor = unref(getMainColor)
    if (color && oldMainColor.theme === color.theme) {
      return
    }
    setMainColorStorage(color)
    Object.keys(color?.config).forEach((key) => {
      setCssVar(key, color?.config[key])
    })
  }

  return {
    getSiderColor,
    getHeaderColor,
    getMainColor,
    setSiderColor,
    setHeaderColor,
    setMainColor
  }
}
