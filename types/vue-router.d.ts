import { MenuButton } from './list'

export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    // title
    title: string
    // 图案
    icon?: string | IconifyIcon
    // 固定tab
    fixedTab?: boolean
    // 隐藏菜单
    hideMenu?: boolean
    // 按钮
    rights?: MenuButton[]
    /** 内嵌的`iframe`链接 `可选` */
    frameSrc?: string
  }
}
