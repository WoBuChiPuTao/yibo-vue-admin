import { MenuButton } from './list'

export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    // title
    title: string

    icon?: string | IconifyIcon

    fixedTab?: boolean
    // Never show in menu
    hideMenu?: boolean

    rights?: MenuButton[]
  }
}
