import { DropMenu } from '#/list'
import { LocaleSetting, LocaleType } from '#/store'

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh_CN',
  EN_US: 'en'
}

// locale list
export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN
  },
  {
    text: 'English',
    event: LOCALE.EN_US
  }
]

export const initLocaleSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}
