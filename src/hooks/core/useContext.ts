import { InjectionKey, provide, inject, UnwrapRef } from 'vue'

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

/**
 * 创建可以为子组件使用的内容
 */
export function createContext<T>(context: any, key: InjectionKey<T> = Symbol()) {
  provide(key, context)
  return {
    context
  }
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T

/**
 * 子组件使用父组件创建的内容
 */
export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
