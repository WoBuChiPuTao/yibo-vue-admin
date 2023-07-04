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
      theme: '#409eff',
      config: {
        '--el-color-primary': '#409eff',
        '--el-color-primary-light-3': '#79bbff',
        '--el-color-primary-light-5': '#a0cfff',
        '--el-color-primary-light-7': '#c6e2ff',
        '--el-color-primary-light-8': '#d9ecff',
        '--el-color-primary-light-9': '#ecf5ff',
        '--el-color-primary-dark-2': '#337ecc'
      }
    },
    siderColor: {
      theme: '#001529',
      config: {
        [SiderColorEnum.SIDER_BG_COLOR]: '#001529',
        [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
        [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
        [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
      }
    },
    headerColor: {
      theme: '#ffffff',
      config: {
        [HeaderColorEnum.HEADER_BG_COLOR]: '#ffffff',
        [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
      }
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
    // 高度
    headerHeight: 64,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知
    showNotice: true,
    // 是否显示面包屑
    showBreadCrumb: true,
    // 是否显示多国语言
    showMultLang: true,
    // 是否显示设置
    showSettingButton: true
  },

  // 侧边栏设置
  siderSetting: {
    // 是否显示
    show: true,
    // 菜单类型
    menuType: MenuTypeEnum.SIDE,
    // 菜单折叠
    collapsed: false,
    // 侧边栏折叠后的宽度
    siderCollapsedWidth: 48,
    // 侧边栏宽度
    siderWidth: 210
  },

  // tabs
  tabsSetting: {
    // 是否缓存数据
    cache: true,
    // 是否显示
    show: true,
    // 是否可以拖动
    canDrag: true,
    // tabs高度
    tabsHeight: 40
  },

  // Whether to enable KeepAlive cache is best to close during development, otherwise the cache needs to be cleared every time
  openKeepAlive: true,

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
