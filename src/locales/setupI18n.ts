import { App } from 'vue'
import { useLocaleStore } from '@/store/modules/locale'
import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocale } from './helper'
import { initLocaleSetting } from '@/settings/locale'
import { LocaleType } from '#/store'

const { fallback, availableLocales } = initLocaleSetting

export let i18n: ReturnType<typeof createI18n>

async function createI18nOptoins(): Promise<I18nOptions> {
  const localeStore = useLocaleStore()
  const locale: LocaleType = localeStore.getLocale
  const defaultLocale = await import(`./lang/${locale}.ts`)
  const message = defaultLocale.default.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocale((loadLocale) => {
    loadLocale.push(locale)
  })
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
