import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash-es'
import { isObject, isArray } from './is'

/**
 * 将目标对象中的属性赋值给来源对象,返回一个新的来源对象
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  target: T,
  source: U
): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(objValue) || isArray(objValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        // 如果是数组，合并数组(去重)
        return isArray(prevValue) ? unionWith(prevValue, nextValue, isEqual) : undefined
      })
    }
  })
}

/**
 * @param url
 * @returns Object
 * @description 截取url参数
 */
export function cutUrlParams(url: string) {
  const obj: Record<string, string> = {}
  const paramsArr = url.replace(/.*\?/g, '').split('&')
  paramsArr.forEach((item) => {
    const temp = item.split('=')
    if (temp[1]) {
      obj[temp[0]] = temp[1]
    }
  })
  return obj
}

// type SFCWithInstall<T> = T & Plugin

// export type CustomComponent = Component & { displayName?: string }

// export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
//   (component as Record<string, unknown>).install = (app: App) => {
//     const compName = component.name || component.displayName
//     if (!compName) return
//     app.component(compName, component)
//     if (alias) {
//       app.config.globalProperties[alias] = component
//     }
//   }
//   return component as SFCWithInstall<T>
// }
