import type { RouteMeta } from 'vue-router'
import { Component } from 'vue'

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  name: string

  icon?: string

  path: string

  // path contains param, auto assignment.
  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  hideMenu?: boolean

  meta?: RouteMeta
}

export interface DropMenu {
  icon?: Component
  event: string | number
  text: string
  disabled?: boolean
  divided?: boolean
}
