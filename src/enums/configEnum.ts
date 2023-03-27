// 主题模式
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light'
}

export enum MenuTypeEnum {
  // left menu
  SIDE = 'side',
  // top menu
  TOP_MENU = 'top-menu'
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  // 角色权限
  ROLE = 'ROLE',
  // black
  // 后端
  BACK = 'BACK',
  // route mapping
  // 路由映射
  ROUTE_MAPPING = 'ROUTE_MAPPING'
}

/**
 * 会话是否超时枚举
 */
export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE
}

// 侧边栏颜色属性
export enum SiderColorEnum {
  SIDER_BG_COLOR = '--sider-bg-color',
  SIDER_TEXT_COLOR = '--sider-text-color',
  SIDER_TEXT_HOVER_COLOR = '--sider-text-hover-color',
  SIDER_CHILD_BG_COLOR = '--sider-child-bg-color'
}

// 顶部颜色属性
export enum HeaderColorEnum {
  HEADER_BG_COLOR = '--header-bg-color',
  HEADER_BG_HOVER_COLOR = '--header-bg-hover-color'
}
