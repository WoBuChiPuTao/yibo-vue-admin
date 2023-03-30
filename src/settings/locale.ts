import { DropMenu } from '#/list'
import { LocaleSetting, LocaleType } from '#/store'

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh-CN',
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
  // 是否显示多国语言按钮
  showPicker: true,
  // 当前语言
  locale: LOCALE.ZH_CN,
  // 默认语言
  fallback: LOCALE.ZH_CN,
  // 可用语言
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US]
}
