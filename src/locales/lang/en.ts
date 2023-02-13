import elLocale from 'element-plus/es/locale/lang/en'
import { spliceMessage } from '../helper'

const files = require.context('./en', true, /\.ts$/, 'sync')

const messages = spliceMessage(files)

export default {
  message: {
    ...messages,
    elLocale
  }
}
