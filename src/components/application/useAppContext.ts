import { createContext, useContext } from '@/hooks/core/useContext'
import { InjectionKey, Ref } from 'vue'

export interface AppProviderContext {
  isMobile: Ref<boolean>
}

// eslint-disable-next-line symbol-description
const key: InjectionKey<AppProviderContext> = Symbol()

export function createAppProvider(context: AppProviderContext) {
  return createContext<AppProviderContext>(context, key)
}

export function useAppProvider() {
  return useContext<AppProviderContext>(key)
}
