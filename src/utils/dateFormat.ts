import dayjs from 'dayjs'
import { isArray, isDate, isObject } from './is'

const FORMATTED_TIME = 'YYYY-MM-DD HH:mm:ss'
const FORMATTED_DATE = 'YYYY-MM-DD'

export function formatTime(date?: dayjs.ConfigType, format = FORMATTED_TIME) {
  return dayjs(date).format(format)
}

export function formatDate(date?: dayjs.ConfigType, format = FORMATTED_DATE) {
  return dayjs(date).format(format)
}

export function formatDateTime(date: dayjs.ConfigType, format: string) {
  return dayjs(date).format(format)
}

/**
 * @description 将对象或数组中的时间格式化
 */
export function formatDateOfObj(
  obj: Record<string, any> | Array<Record<string, any>>,
  format = 'YYYY-MM-DD'
) {
  if (isObject(obj) || isArray(obj)) {
    for (const key of Object.keys(obj)) {
      if (isObject(obj[key]) || isArray(obj[key])) {
        formatDateOfObj(obj[key], format)
        continue
      }
      if (isDate(obj[key])) {
        obj[key] = formatDateTime(obj[key], format)
      }
    }
  }
}
