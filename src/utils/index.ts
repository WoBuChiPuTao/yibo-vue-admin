import { cloneDeep } from 'lodash-es'
import { isObject, isArray } from './is'

/**
 * 将目标对象中的属性赋值给来源对象,返回一个新的来源对象
 */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)

  for (key in target) {
    res[key] =
      isObject(res[key]) || isArray(res[key]) ? deepMerge(res[key], target[key]) : target[key]
  }
  return res
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
