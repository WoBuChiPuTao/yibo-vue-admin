import { useLocaleStore } from '@/store/modules/locale'
import { LocaleType } from '@/types/locale'
import { computed, unref } from 'vue'
import { setHtmlPageLang, loadLocale } from './helper'
import { i18n } from './setupI18n'

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    (i18n.global.locale as any).value = locale
  }
  localeStore.setLocaleInfo({ locale })
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localeStore = useLocaleStore()
  const getLocale = computed(() => localeStore.getLocale)
  const getElLocale = computed((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale))?.elLocale ?? {}
  })
  const getShowPicker = computed(() => localeStore.getShowPicker)

  async function changeLocale(locale: LocaleType) {
    const i18nGlobal = i18n.global
    const currentLocale = unref(i18nGlobal.locale)
    if (currentLocale === locale) {
      return locale
    }
    if (loadLocale.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }
    const langModule = await import(`./lang/${locale}.ts`)
    const message = langModule.default.message
    i18nGlobal.setLocaleMessage(locale, message)
    loadLocale.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    getShowPicker,
    changeLocale,
    getElLocale
  }
}
