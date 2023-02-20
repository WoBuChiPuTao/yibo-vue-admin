import {
  BeforeMiniState,
  HeaderSetting,
  ProjectConfig
} from '@/types/appSetting'
import { ThemeEnum } from '@/types/enums/appEnum'
import { WebCache } from '@/utils/cache'
import { defineStore } from 'pinia'

interface AppAtate {
  darkMode?: ThemeEnum
  pageLoading: boolean
  projectSetting: ProjectConfig | null
  beforeMiniInfo: BeforeMiniState
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppAtate => ({
    darkMode: undefined,
    pageLoading: false,
    projectSetting: WebCache.getLocal('PROJECT_SETTING'),
    beforeMiniInfo: {}
  }),
  getters: {
    getDarkMode(): boolean {
      return (
        this.darkMode || WebCache.getLocal('APP__DARK__MODE') || ThemeEnum.LIGHT
      )
    },
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getProjectSetting(): ProjectConfig {
      return this.projectSetting || ({} as ProjectConfig)
    }
  }
})
