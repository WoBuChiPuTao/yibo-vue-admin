import { RoleEnum } from '@/enums/roleEnm'
import type { RouteMeta } from 'vue-router'

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

  roles?: RoleEnum[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface SimpleMenu {
  path: string
  name: string
  icon?: string
  children?: SimpleMenu[]
}
