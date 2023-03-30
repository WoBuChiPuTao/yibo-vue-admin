import { defineStore } from 'pinia'
import { initLocaleSetting, LOCALE } from '@/settings/locale'
import { WebCache } from '@/utils/cache'
import { LocaleSetting, LocaleType } from '#/store'

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: WebCache.getLocal('LOCALE') || initLocaleSetting
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo.locale ?? LOCALE.ZH_CN
    }
  },
  actions: {
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      WebCache.setLocal('LOCALE', this.localInfo)
    },
    initLocale() {
      this.setLocaleInfo({
        ...initLocaleSetting,
        ...this.localInfo
      })
    }
  }
})
