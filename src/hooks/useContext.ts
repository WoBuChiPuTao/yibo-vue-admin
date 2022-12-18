import {
  InjectionKey,
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  UnwrapRef
} from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

/**
 * 创建可以为子组件使用的内容
 */
export function createContext<T>(
  context: any,
  // eslint-disable-next-line symbol-description
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  !createProvider && provide(key, native ? context : provideData)

  return {
    state
  }
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T

/**
 * 子组件使用父组件创建的内容
 */
export function useContext<T>(
  // eslint-disable-next-line symbol-description
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {})
}
