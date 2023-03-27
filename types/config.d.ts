import {
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SiderColorEnum,
  HeaderColorEnum,
  MenuTypeEnum
} from '@/enums/configEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

export interface ColorSetting<T> {
  key: string | symbol
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
  showMenu: boolean
  menuType: MenuTypeEnum
  collapsed: boolean
  // 收起时是否隐藏菜单
  siderHidden: boolean
  siderWidth: number
}

export interface TabsSetting {
  cache: boolean
  show: boolean
  canDrag: boolean
}

export interface HeaderSetting {
  show: boolean
  showFullScreen: boolean
  showNotice: boolean
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

  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  siderSetting: SiderSetting
  // Multi-tab settings
  tabsSetting: TabsSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Show breadcrumbs
  showBreadCrumb: boolean
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
