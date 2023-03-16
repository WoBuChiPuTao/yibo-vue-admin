import { resetRoutes } from '@/router'
import { BeforeMiniState, HeaderSetting, MenuSetting, ProjectConfig, TabsSetting } from '#/config'
import { ThemeEnum } from '@/enums/appEnum'
import { deepMerge } from '@/utils'
import { WebCache } from '@/utils/cache'
import { defineStore } from 'pinia'

interface AppAtate {
  themeMode?: ThemeEnum
  pageLoading: boolean
  projectSetting: ProjectConfig | null
  beforeMiniInfo: BeforeMiniState
}

let timeoutId: ReturnType<typeof setTimeout>

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppAtate => ({
    themeMode: undefined,
    pageLoading: false,
    projectSetting: WebCache.getLocal('PROJECT_SETTING'),
    beforeMiniInfo: {}
  }),
  getters: {
    getThemeMode(): ThemeEnum {
      return this.themeMode || WebCache.getLocal('APP__DARK__MODE') || ThemeEnum.LIGHT
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo
    },
    getProjectSetting(): ProjectConfig {
      return this.projectSetting || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectSetting.headerSetting
    },
    getTabsSetting(): TabsSetting {
      return this.getProjectSetting.tabsSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectSetting.menuSetting
    }
  },
  actions: {
    setThemeMode(mode: ThemeEnum): void {
      this.themeMode = mode
      WebCache.setLocal('APP__DARK__MODE', mode)
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setBeforeMiniInfo(miniInfo: BeforeMiniState): void {
      this.beforeMiniInfo = miniInfo
    },
    setProjectSetting(setting: DeepPartial<ProjectConfig>): void {
      this.projectSetting = deepMerge(this.projectSetting || {}, setting)
      WebCache.setLocal('PROJECT_SETTING', this.projectSetting)
    },

    async resetAllStateSync() {
      resetRoutes()
      // WebCache.clearLocal()
      // WebCache.clearSession()
    },
    async setPageLoadingSync(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeoutId)
      }
    }
  }
})
