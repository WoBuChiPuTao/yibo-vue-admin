import { Component } from 'vue'

export interface DropMenu {
  to?: string
  icon?: Component
  event: string | number
  text: string
  disabled?: boolean
  divided?: boolean
}

export enum MenuEventEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL
}
