import { useAppStore } from '@/store/modules/app'
import { ThemeEnum } from '@/types/enums/appEnum'
import { computed } from 'vue'
import { addClass, hasClass, removeClass } from '../dom'

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
  const html = document.querySelector('html')
  if (!html) {
    return
  }
  const htmlClass = hasClass(html, ThemeEnum.DARK)
  if (theme === ThemeEnum.DARK) {
    html?.setAttribute('data-theme', theme)
    !htmlClass && addClass(html, ThemeEnum.DARK)
  } else {
    html?.setAttribute('data-theme', theme)
    htmlClass && removeClass(html, ThemeEnum.DARK)
  }
}
