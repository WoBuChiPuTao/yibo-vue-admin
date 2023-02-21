import { defineStore } from 'pinia'
import { initLocaleSetting } from '@/hooks/config/locale'
import { WebCache } from '@/utils/cache'
import { LocaleSetting, LocaleType } from '@/types/locale'

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: WebCache.getLocal('LOCAL') || initLocaleSetting
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo.locale ?? 'zh_CN'
    }
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      WebCache.setLocal('LOCAL', this.localInfo)
    },
    initLocale() {
      this.setLocaleInfo({
        ...initLocaleSetting,
        ...this.localInfo
      })
    }
  }
})
