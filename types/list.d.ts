import type { RouteMeta } from 'vue-router'
import { Component } from 'vue'
import { IconifyIcon } from '@iconify/vue/dist/offline'

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  path: string

  name: string

  orderNo?: number

  icon?: { name: string; entity?: IconifyIcon }

  children?: Menu[]

  meta?: RouteMeta
  // 按钮权限
  rights?: string[] | number[]
}

export interface DropMenu {
  icon?: Component
  event: string | number
  text: string
  disabled?: boolean
  divided?: boolean
}
