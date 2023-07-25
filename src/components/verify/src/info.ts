import { PropType } from 'vue'

export const basicDargProps = {
  status: {
    type: String as PropType<'success' | 'fail' | 'default'>,
    default: 'default'
  },
  height: {
    type: Number,
    default: 40
  },
  text: {
    type: String,
    default: '拖动以进行校验'
  },
  failedText: {
    type: String,
    default: '验证失败'
  },
  successText: {
    type: String,
    default: '验证成功'
  },
  operateLimit: {
    type: Number,
    default: 5
  }
}
