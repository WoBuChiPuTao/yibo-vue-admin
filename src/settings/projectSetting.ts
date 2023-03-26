import { ProjectConfig } from '#/config'
import { PermissionModeEnum, SessionTimeoutProcessingEnum } from '@/enums/appEnum'
import { MenuTypeEnum, ThemeEnum } from '@/enums/configEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

// 系统初始化的样式配置
const setting: ProjectConfig = {
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // Header configuration
  headerSetting: {
    // header bg color
    bgColor: '#fff',
    // Whether to show top
    show: true,
    // theme
    theme: ThemeEnum.LIGHT,
    // Whether to enable the lock screen function
    useLockPage: true,
    // Whether to show the full screen button
    showFullScreen: true,
    // Whether to show the document button
    showDoc: true,
    // Whether to show the notification button
    showNotice: true
  },

  // Menu configuration
  menuSetting: {
    show: true,
    type: MenuTypeEnum.SIDE,
    // Menu collapse
    collapsed: false,
    // When sider hide because of the responsive layout
    siderHidden: false,
    // Menu width
    menuWidth: 210,
    // Menu theme
    theme: ThemeEnum.DARK
  },

  // Multi-label
  tabsSetting: {
    cache: false,
    // Turn on
    show: true,
    // Is it possible to drag and drop sorting tabs
    canDrag: true
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

  // Whether to show breadcrumbs
  showBreadCrumb: true,

  // Use error-handler-plugin
  useErrorHandle: false,

  // Whether to open back to top
  useOpenBackTop: true,

  //  Is it possible to embed iframe pages
  canEmbedIFramePage: true,

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // If it is enabled, I want to overwrite a single interface. Can be set in a separate interface
  removeAllHttpPending: false
}

export default setting
