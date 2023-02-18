import type { LocaleType } from '@/types/locale'
import { set } from 'lodash-es'

export const loadLocale: LocaleType[] = []

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function setLoadLocale(cb: (loadLocale: LocaleType[]) => void) {
  cb(loadLocale)
}

export function spliceMessage(langs: ReturnType<typeof require.context>) {
  const obj: Record<string, any> = {}
  langs.keys().forEach((key) => {
    const fileData = langs(key).default
    const keyPath = key.replace(/(\.\/)|(\.ts)/g, '')
    const pathArray = keyPath.split('/')
    let modules = obj
    pathArray.forEach((path, index) => {
      index === pathArray.length - 1
        ? set(modules, path, fileData || {})
        : modules[path] === undefined && set(modules, path, {})
      modules = modules[path]
    })
  })
  return obj
}
