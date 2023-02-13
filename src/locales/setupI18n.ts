import { useLocaleStore } from '@/store/modules/locale'
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { LocaleType, initLocaleSetting } from './types'
import { setHtmlPageLang } from './helper'

const { fallback, availableLocales } = initLocaleSetting

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptoins() {
  const localeStore = useLocaleStore()
  const locale: LocaleType = localeStore.getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default.message ?? {}
  setHtmlPageLang(locale)
  return {
    legacy: false,
    locale,
    messages: {
      [locale]: message
    },
    fallbackLocale: fallback,
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptoins()
  i18n = createI18n(options)
  app.use(i18n)
}
