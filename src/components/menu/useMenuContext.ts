import type { InjectionKey, Ref } from 'vue'
import type { Emitter } from '@/utils/mitt'
import { createContext, useContext } from '@/hooks/useContext'

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Emitter
}

// eslint-disable-next-line symbol-description
const key: InjectionKey<SimpleRootMenuContextProps> = Symbol()

export function createRootMenuContext(
  context: SimpleRootMenuContextProps
) {
  return createContext<SimpleRootMenuContextProps>(context, key, {
    readonly: false,
    native: true
  })
}

export function useRootMenuContext() {
  return useContext<SimpleRootMenuContextProps>(key)
}
