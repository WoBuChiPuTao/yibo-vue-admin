import elLocale from 'element-plus/es/locale/lang/zh-cn'
import { spliceMessage } from '../helper'

const files = require.context('./zh_cn', true, /\.ts$/, 'sync')

const messages = spliceMessage(files)

export default {
  message: {
    ...messages,
    elLocale
  }
}
