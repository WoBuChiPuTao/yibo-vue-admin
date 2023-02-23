import { useAppStore } from '@/store/modules/app'
import { useLocaleStore } from '@/store/modules/locale'
import { ProjectConfig } from '@/types/appSetting'
import { deepMerge } from '@/utils'
import { WebCache } from '@/utils/cache'
import projectSetting from './projectSetting'

export function initConfigStore() {
  const localeStore = useLocaleStore()
  const appStore = useAppStore()

  let projCfg: ProjectConfig = WebCache.getLocal(
    'PROJECT_SETTING'
  ) as ProjectConfig

  projCfg = deepMerge(projectSetting, projCfg || {})

  appStore.setProjectSetting(projCfg)
  localeStore.initLocale()
}