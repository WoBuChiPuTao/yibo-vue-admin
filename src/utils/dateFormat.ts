import dayjs from 'dayjs'

const FORMATTED_TIME = 'YYYY-MM-DD HH:mm:ss'
const FORMATTED_DATE = 'YYYY-MM-DD'

export function formatTime(date?: dayjs.ConfigType, format = FORMATTED_TIME) {
  return dayjs(date).format(format)
}

export function formatDate(date?: dayjs.ConfigType, format = FORMATTED_DATE) {
  return dayjs(date).format(format)
}
