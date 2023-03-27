import { ProjectConfig } from '#/config'
import {
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SiderColorEnum,
  HeaderColorEnum,
  MenuTypeEnum
} from '@/enums/configEnum'
import { CacheTypeEnum } from '@/enums/cacheEnum'

// 系统初始化的样式配置
const setting: ProjectConfig = {
  themeColor: {
    mainColor: {
      key: 'default',
      theme: '#0960bd',
      config: [
        { name: '--el-color-primary', value: '#0960bd' },
        { name: '--el-color-primary-light-3', value: '#79bbff' },
        { name: '--el-color-primary-light-5', value: '#a0cfff' },
        { name: '--el-color-primary-light-7', value: '#c6e2ff' },
        { name: '--el-color-primary-light-8', value: '#d9ecff' },
        { name: '--el-color-primary-light-9', value: '#ecf5ff' }
      ]
    },
    siderColor: {
      key: 'default',
      theme: '#001529',
      config: [
        { name: SiderColorEnum.SIDER_BG_COLOR, value: '#001529' },
        { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
        { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' },
        { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#a4a4a4' }
      ]
    },
    headerColor: {
      key: 'default',
      theme: '#ffffff',
      config: [
        { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#ffffff' },
        { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
      ]
    }
  },
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  // 顶栏设置
  headerSetting: {
    // 是否显示
    show: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知
    showNotice: true
  },

  // 菜单设置
  siderSetting: {
    // 是否显示菜单
    showMenu: true,
    // 菜单类型
    menuType: MenuTypeEnum.SIDE,
    // 菜单折叠
    collapsed: false,
    // 隐藏侧边栏
    siderHidden: false,
    // 侧边栏宽度
    siderWidth: 210
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
