import { cloneDeep } from 'lodash-es'
import { isObject } from './is'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  const res: any = cloneDeep(src)

  for (key in target) {
    res[key] = isObject(res[key])
    if (res[key]) {
      res[key] = deepMerge(src[key], target[key])
    } else {
      res[key] = target[key]
    }
  }
  return res
}
