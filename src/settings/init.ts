import { ProjectConfig } from '#/config'
import { useAppStore } from '@/store/modules/app'
import { useLocaleStore } from '@/store/modules/locale'
import { deepMerge } from '@/utils'
import { WebCache } from '@/utils/cache'
import { updateHtmlTheme } from '../hooks/setting/useTheme'
import projectSetting from './projectSetting'

export function initConfigStore() {
  const localeStore = useLocaleStore()
  const appStore = useAppStore()
  const theme = appStore.getThemeMode

  let projCfg: ProjectConfig = WebCache.getLocal('PROJECT_SETTING') as ProjectConfig

  projCfg = deepMerge(projectSetting, projCfg || {})

  appStore.setProjectSetting(projCfg)
  localeStore.initLocale()
  updateHtmlTheme(theme)
}
