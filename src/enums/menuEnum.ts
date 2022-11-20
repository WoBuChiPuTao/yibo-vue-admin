/**
 * @description: menu type
 */
export enum MenuTypeEnum {
  // left menu
  SIDEBAR = 'sidebar',

  MIX_SIDEBAR = 'mix-sidebar',
  // mixin menu
  MIX = 'mix',
  // top menu
  TOP_MENU = 'top-menu'
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline'

// menu mode
export enum MenuModeEnum {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  VERTICAL_RIGHT = 'vertical-right',
  INLINE = 'inline'
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER'
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click'
}
