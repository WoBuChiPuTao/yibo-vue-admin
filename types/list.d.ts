import type { RouteMeta } from 'vue-router'
import { Component } from 'vue'
import { IconifyIcon } from '@iconify/vue/dist/offline'

export interface MenuButton {
  buttonId: string | number
  buttonName: string
}

export interface Menu {
  path: string

  name: string
  // 路由名称
  routeName: string
  // 父级路径
  parentPath?: string

  redirect?: string

  orderNo?: number

  icon?: string | IconifyIcon

  children?: Menu[]

  meta?: RouteMeta
  // 按钮权限
  rights?: MenuButton[]

  hideMenu?: boolean
}

export interface DropMenu {
  icon?: Component
  event: string | number
  text: string
  disabled?: boolean
  divided?: boolean
}
