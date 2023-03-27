import { useAppStore } from '@/store/modules/app'
import { ThemeEnum, SiderColorEnum, HeaderColorEnum } from '@/enums/configEnum'
import { computed, unref } from 'vue'
import { addClass, hasClass, removeClass } from '@/hooks/dom/useClass'
import { setCssVar } from '../dom/useCssVar'
import { useColorSetting } from './useColorSetting'

// Dark模式设置
const DARK_COLOR_LIST = [
  { name: SiderColorEnum.SIDER_BG_COLOR, value: '#212121' },
  { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#2d2d2d' },
  { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#a4a4a4' },
  { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' },
  { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#151515' },
  { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#242424' },
  { name: '--el-color-primary', value: '#0960bd' },
  { name: '--el-color-primary-light-3', value: '#2a598a' },
  { name: '--el-color-primary-light-5', value: '#213d5b' },
  { name: '--el-color-primary-light-7', value: '#3375b9' },
  { name: '--el-color-primary-light-8', value: '#1d3043' },
  { name: '--el-color-primary-light-9', value: '#18222c' }
]

export function useThemeMode() {
  const appStore = useAppStore()

  const getThemeMode = computed(() => appStore.getThemeMode)

  function setThemeMode(theme: ThemeEnum) {
    appStore.setThemeMode(theme)
  }

  return {
    getThemeMode,
    setThemeMode
  }
}

export function updateHtmlTheme(theme: ThemeEnum) {
  const html = document.documentElement
  if (!html) {
    return
  }
  const htmlClass = hasClass(html, ThemeEnum.DARK)
  if (theme === ThemeEnum.DARK) {
    html?.setAttribute('data-theme', theme)
    // 添加css变量
    DARK_COLOR_LIST.forEach((item) => {
      setCssVar(item.name, item.value)
    })
    !htmlClass && addClass(html, ThemeEnum.DARK)
  } else {
    // 取出本地配置进行重置
    const { getSiderColor, getHeaderColor, getMainColor } = useColorSetting()
    const siderColor = unref(getSiderColor)
    const headerColor = unref(getHeaderColor)
    const mainColor = unref(getMainColor)
    siderColor.config.forEach((item) => {
      setCssVar(item.name, item.value)
    })
    headerColor.config.forEach((item) => {
      setCssVar(item.name, item.value)
    })
    mainColor.config.forEach((item) => {
      setCssVar(item.name, item.value)
    })
    html?.setAttribute('data-theme', theme)
    htmlClass && removeClass(html, ThemeEnum.DARK)
  }
}
