import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum
} from '@/types/enums/appEnum'
import { CacheTypeEnum } from '@/types/enums/cacheEnum'
import {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  TriggerEnum
} from '@/types/enums/menuEnum'

/**
 * @description: storage存储格式
 */
export interface StorageCache<T = any> {
  time: number
  expire: number
  value: T
}

/**
 * @description: 用户角色信息
 */
export interface RoleInfo {
  roleName: string
  value: string
}

// export interface AppState {
//   // 夜景模式
//   darkMode?: ThemeEnum
//   // 页面加载状态
//   pageLoading: boolean
//   // 项目配置
//   projectConfig: ProjectConfig | null
//   // 页面缩小前的状态
//   beforeMiniInfo: BeforeMiniState
// }

export interface BeforeMiniState {
  menuCollapsed?: boolean
  menuSplit?: boolean
  menuMode?: MenuModeEnum
  menuType?: MenuTypeEnum
}

// export interface ProjectConfig {
//   // 权限相关信息的存储位置
//   permissionCacheType: CacheTypeEnum
//   // 是否显示配置按钮
//   showSettingButton: boolean
//   // 是否显示主题切换按钮
//   showDarkModeToggle: boolean
//   // 配置按钮的显示位置
//   settingButtonPosition: SettingButtonPositionEnum
//   // 权限模式
//   permissionMode: PermissionModeEnum
//   // 会话超时处理
//   sessionTimeoutProcessing: SessionTimeoutProcessingEnum
//   // 网站灰色模式，为可能的哀悼日期打开
//   grayMode: boolean
//   // 是否打开弱色模式
//   colorWeak: boolean
//   // 主题颜色
//   themeColor: string
//   // 主界面全屏显示，菜单不显示，顶部
//   fullContent: boolean
//   // 内容宽度
//   contentMode: ContentEnum
//   // Whether to display the logo
//   showLogo: boolean
//   // 是否显示全局页脚
//   showFooter: boolean
//   // menuType: MenuTypeEnum;
//   headerSetting: HeaderSetting
//   // menuSetting
//   menuSetting: MenuSetting
//   // Multi-tab settings
//   multiTabsSetting: MultiTabsSetting
//   // Animation configuration
//   transitionSetting: TransitionSetting
//   // pageLayout whether to enable keep-alive
//   openKeepAlive: boolean
//   // Lock screen time
//   lockTime: number
//   // Show breadcrumbs
//   showBreadCrumb: boolean
//   // Show breadcrumb icon
//   showBreadCrumbIcon: boolean
//   // Use error-handler-plugin
//   useErrorHandle: boolean
//   // Whether to open back to top
//   useOpenBackTop: boolean
//   // 是否可以嵌入iframe页面
//   canEmbedIFramePage: boolean
//   // Whether to delete unclosed messages and notify when switching the interface
//   closeMessageOnSwitch: boolean
//   // Whether to cancel the http request that has been sent but not responded when switching the interface.
//   removeAllHttpPending: boolean
// }

export interface MenuSetting {
  bgColor: string
  fixed: boolean
  collapsed: boolean
  siderHidden: boolean
  canDrag: boolean
  show: boolean
  hidden: boolean
  split: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  theme: ThemeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  trigger: TriggerEnum
  accordion: boolean
  closeMixSidebarOnChange: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
}

export interface MultiTabsSetting {
  cache: boolean
  show: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
}

export interface HeaderSetting {
  bgColor: string
  fixed: boolean
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
  showSearch: boolean
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}
