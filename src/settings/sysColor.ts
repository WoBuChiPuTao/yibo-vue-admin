import { SiderColorEnum, HeaderColorEnum } from '@/enums/configEnum'
import { ColorSetting, SiderColorSetting, HeaderColorSetting } from '#/config'

// 侧边栏颜色
export const SIDE_COLOR_LIST: ColorSetting<SiderColorSetting>[] = [
  {
    theme: '#001529',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#001529',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#ec0000',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#ec0000',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#ec7e00',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#272727',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#212121',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#212121',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#2d2d2d',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#273352',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#273352',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#ffffff',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#ffffff',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#d1d0d0',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#616161',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#000'
    }
  },
  {
    theme: '#191b24',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#191b24',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#304156',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#304156',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  },
  {
    theme: '#001628',
    config: {
      [SiderColorEnum.SIDER_BG_COLOR]: '#001628',
      [SiderColorEnum.SIDER_CHILD_BG_COLOR]: '#0c2135',
      [SiderColorEnum.SIDER_TEXT_COLOR]: '#a4a4a4',
      [SiderColorEnum.SIDER_TEXT_HOVER_COLOR]: '#fff'
    }
  }
]

export const HEADER_BG_COLOR_LIST: ColorSetting<HeaderColorSetting>[] = [
  {
    theme: '#ffffff',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#ffffff',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#151515',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#151515',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#009688',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#009688',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#5172DC',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#5172DC',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#018ffb',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#018ffb',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#409eff',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#409eff',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#e74c3c',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#e74c3c',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  },
  {
    theme: '#24292e',
    config: {
      [HeaderColorEnum.HEADER_BG_COLOR]: '#24292e',
      [HeaderColorEnum.HEADER_BG_HOVER_COLOR]: '#f6f6f6'
    }
  }
]

// 系统主题颜色
// 通过element的css变量修改全局主题
export const SYS_COLOR_LIST: ColorSetting<Record<string, string>>[] = [
  {
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
  {
    theme: '#0084f4',
    config: {
      '--el-color-primary': '#0084f4',
      '--el-color-primary-light-3': '',
      '--el-color-primary-light-5': '',
      '--el-color-primary-light-7': '',
      '--el-color-primary-light-8': '',
      '--el-color-primary-light-9': '',
      '--el-color-primary-dark-2': ''
    }
  },
  {
    theme: '#67c23a',
    config: {
      '--el-color-primary': '#67c23a',
      '--el-color-primary-light-3': '#95d475',
      '--el-color-primary-light-5': '#b3e19d',
      '--el-color-primary-light-7': '#d1edc4',
      '--el-color-primary-light-8': '#e1f3d8',
      '--el-color-primary-light-9': '#f0f9eb',
      '--el-color-primary-dark-2': '#529b2e'
    }
  },
  {
    theme: '#e6a23c',
    config: {
      '--el-color-primary': '#e6a23c',
      '--el-color-primary-light-3': '#eebe77',
      '--el-color-primary-light-5': '#f3d19e',
      '--el-color-primary-light-7': '#f8e3c5',
      '--el-color-primary-light-8': '#faecd8',
      '--el-color-primary-light-9': '#fdf6ec',
      '--el-color-primary-dark-2': '#b88230'
    }
  },
  {
    theme: '#ff5c93',
    config: {
      '--el-color-primary': '#ff5c93',
      '--el-color-primary-light-3': '',
      '--el-color-primary-light-5': '',
      '--el-color-primary-light-7': '',
      '--el-color-primary-light-8': '',
      '--el-color-primary-light-9': '',
      '--el-color-primary-dark-2': ''
    }
  },
  {
    theme: '#f56c6c',
    config: {
      '--el-color-primary': '#f56c6c',
      '--el-color-primary-light-3': '#f89898',
      '--el-color-primary-light-5': '#fab6b6',
      '--el-color-primary-light-7': '#fcd3d3',
      '--el-color-primary-light-8': '#fde2e2',
      '--el-color-primary-light-9': '#fef0f0',
      '--el-color-primary-dark-2': '#c45656'
    }
  },
  {
    theme: '#9c27b0',
    config: {
      '--el-color-primary': '#9c27b0',
      '--el-color-primary-light-3': '',
      '--el-color-primary-light-5': '',
      '--el-color-primary-light-7': '',
      '--el-color-primary-light-8': '',
      '--el-color-primary-light-9': '',
      '--el-color-primary-dark-2': ''
    }
  },
  {
    theme: '#909399',
    config: {
      '--el-color-primary': '#909399',
      '--el-color-primary-light-3': '#b1b3b8',
      '--el-color-primary-light-5': '#c8c9cc',
      '--el-color-primary-light-7': '#dedfe0',
      '--el-color-primary-light-8': '#e9e9eb',
      '--el-color-primary-light-9': '#f4f4f5',
      '--el-color-primary-dark-2': '#73767a'
    }
  }
]

/**
 *   '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800'
 */
