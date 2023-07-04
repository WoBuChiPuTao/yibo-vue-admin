import {
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SiderColorEnum,
  HeaderColorEnum,
  MenuTypeEnum
} from '@/enums/configEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

export interface ColorSetting<T> {
  theme: string
  config: T
}

export interface SiderColorSetting {
  [SiderColorEnum.SIDER_BG_COLOR]: string
  [SiderColorEnum.SIDER_CHILD_BG_COLOR]: string
  [SiderColorEnum.SIDER_TEXT_COLOR]: string
  [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: string
}

export interface HeaderColorSetting {
  [HeaderColorEnum.HEADER_BG_COLOR]: string
  [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: string
}

export interface SiderSetting {
  // 是否显示侧边栏
  show: boolean
  menuType: MenuTypeEnum
  collapsed: boolean
  siderCollapsedWidth: number
  siderWidth: number
}

export interface TabsSetting {
  cache: boolean
  show: boolean
  canDrag: boolean
  tabsHeight: number
}

export interface HeaderSetting {
  show: boolean
  headerHeight: number
  showFullScreen: boolean
  showNotice: boolean
  showBreadCrumb: boolean
  showMultLang: boolean
  showSettingButton: boolean
}

export interface ProjectConfig {
  // 主题颜色
  themeColor: {
    mainColor: ColorSetting<Record<string, string>>
    siderColor: ColorSetting<SiderColorSetting>
    headerColor: ColorSetting<HeaderColorSetting>
  }
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum

  // 顶栏设置
  headerSetting: HeaderSetting
  // 侧边栏设置
  siderSetting: SiderSetting
  // tabs
  tabsSetting: TabsSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Use error-handler-plugin
  useErrorHandle: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
}

// When the window shrinks, remember some states, and restore these states when the window is restored
export interface BeforeMiniState {
  menuCollapsed?: boolean
}
