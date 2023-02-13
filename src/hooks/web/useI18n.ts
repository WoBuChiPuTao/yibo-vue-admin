import { i18n } from '@/locales/setupI18n'

type I18nGlobalTranslation = {
  (key: string): string
  (key: string, locale: string): string
  (key: string, locale: string, list: unknown[]): string
  (key: string, locale: string, named: Record<string, unknown>): string
  (key: string, list: unknown[]): string
  (key: string, named: Record<string, unknown>): string
}

export function useI18n(): { t: I18nGlobalTranslation } {
  if (!i18n) {
    return {
      t: (key: string) => key
    }
  }
  const { t, ...methods } = i18n.global

  return {
    ...methods,
    t
  }
}

// 主要用于配合vscode i18nn ally插件。此功能仅用于路由和菜单。请在其他地方使用useI18n
export const t = (key: string) => key
