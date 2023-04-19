import type { InjectionKey, Ref } from 'vue'
import type { Emitter } from '@/utils/mitt'
import { createContext, useContext } from '@/hooks/core/useContext'

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Emitter<Record<string, any>>
  selectedName: Ref<string>
}

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol()

export function createRootMenuContext(context: SimpleRootMenuContextProps) {
  return createContext<SimpleRootMenuContextProps>(context, key, {
    readonly: false,
    native: true
  })
}

export function useRootMenuContext() {
  return useContext<SimpleRootMenuContextProps>(key)
}
