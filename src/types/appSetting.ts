import { PermissionModeEnum, SessionTimeoutProcessingEnum, ThemeEnum } from './enums/appEnum'
import { CacheTypeEnum } from './enums/cacheEnum'

export interface MenuSetting {
  collapsed: boolean
  // 收起时是否隐藏菜单
  siderHidden: boolean
  menuWidth: number
  theme: ThemeEnum
}

export interface TabsSetting {
  cache: boolean
  show: boolean
  canDrag: boolean
}

export interface HeaderSetting {
  bgColor: string
  show: boolean
  theme: ThemeEnum
  // Turn on full screen
  showFullScreen: boolean
  // Whether to show the lock screen
  useLockPage: boolean
  // Show document button
  showDoc: boolean
  // Show message center button
  showNotice: boolean
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Whether to show the configuration button
  showSettingButton: boolean
  // Whether to show the theme switch button
  showDarkModeToggle: boolean
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Theme color
  themeColor: string

  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting
  // menuSetting
  menuSetting: MenuSetting
  // Multi-tab settings
  tabsSetting: TabsSetting
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Lock screen time
  lockTime: number
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
