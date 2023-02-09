import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { LocaleType } from './types'

function setupI18nOptoins() {
  const locale: LocaleType = 'zh_CN'
  return {
    legacy: false
  }
}

function setupI18n(app: App) {
  const i18n = createI18n({})
  app.use(i18n)
}
