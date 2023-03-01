import { useAppStore } from '@/store/modules/app'
import { ThemeEnum } from '@/types/enums/appEnum'
import { computed } from 'vue'

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
  document.querySelector('html')?.setAttribute('data-theme', theme)
}
