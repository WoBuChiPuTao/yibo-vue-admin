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
  config: T[]
}

export interface SiderColorSetting {
  name: SiderColorEnum
  value: string
}

export interface HeaderColorSetting {
  name: HeaderColorEnum
  value: string
}

export interface SiderSetting {
  show: boolean
  menuType: MenuTypeEnum
  collapsed: boolean
  // 收起时是否隐藏菜单
  siderHidden: boolean
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
    mainColor: ColorSetting<{ name: string; value: string }>
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
