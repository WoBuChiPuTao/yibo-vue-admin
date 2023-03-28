import { SiderColorEnum, HeaderColorEnum } from '@/enums/configEnum'
import { ColorSetting, SiderColorSetting, HeaderColorSetting } from '#/config'

// 侧边栏颜色
export const SIDE_COLOR_LIST: ColorSetting<SiderColorSetting>[] = [
  {
    theme: '#001529',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#001529' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
      { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#a4a4a4' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#ec0000',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#ec0000' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#ec7e00' },
      { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#272727' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#212121',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#212121' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#2d2d2d' },
      { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#a4a4a4' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#273352',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#273352' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
      { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#a4a4a4' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#ffffff',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#ffffff' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#d1d0d0' },
      { name: SiderColorEnum.SIDER_TEXT_COLOR, value: '#616161' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#000' }
    ]
  },
  {
    theme: '#191b24',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#191b24' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#304156',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#304156' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  },
  {
    theme: '#001628',
    config: [
      { name: SiderColorEnum.SIDER_BG_COLOR, value: '#001628' },
      { name: SiderColorEnum.SIDER_CHILD_BG_COLOR, value: '#0c2135' },
      { name: SiderColorEnum.SIDER_TEXT_HOVER_COLOR, value: '#fff' }
    ]
  }
]

export const HEADER_BG_COLOR_LIST: ColorSetting<HeaderColorSetting>[] = [
  {
    theme: '#ffffff',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#ffffff' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#151515',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#151515' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#009688',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#009688' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#5172DC',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#5172DC' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#018ffb',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#018ffb' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#409eff',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#409eff' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#e74c3c',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#e74c3c' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  },
  {
    theme: '#24292e',
    config: [
      { name: HeaderColorEnum.HEADER_BG_COLOR, value: '#24292e' },
      { name: HeaderColorEnum.HEADER_BG_HOVER_COLOR, value: '#f6f6f6' }
    ]
  }
]

// 系统主题颜色
// 通过element的css变量修改全局主题
export const SYS_COLOR_LIST: ColorSetting<{ name: string; value: string }>[] = [
  {
    theme: '#409eff',
    config: [
      { name: '--el-color-primary', value: '#409eff' },
      { name: '--el-color-primary-light-3', value: '#79bbff' },
      { name: '--el-color-primary-light-5', value: '#a0cfff' },
      { name: '--el-color-primary-light-7', value: '#c6e2ff' },
      { name: '--el-color-primary-light-8', value: '#d9ecff' },
      { name: '--el-color-primary-light-9', value: '#ecf5ff' }
    ]
  },
  {
    theme: '#0084f4',
    config: [
      { name: '--el-color-primary', value: '#0084f4' },
      { name: '--el-color-primary-light-3', value: '' },
      { name: '--el-color-primary-light-5', value: '' },
      { name: '--el-color-primary-light-7', value: '' },
      { name: '--el-color-primary-light-8', value: '' },
      { name: '--el-color-primary-light-9', value: '' }
    ]
  },
  {
    theme: '#67c23a',
    config: [
      { name: '--el-color-primary', value: '#67c23a' },
      { name: '--el-color-primary-light-3', value: '#95d475' },
      { name: '--el-color-primary-light-5', value: '#b3e19d' },
      { name: '--el-color-primary-light-7', value: '#d1edc4' },
      { name: '--el-color-primary-light-8', value: '#e1f3d8' },
      { name: '--el-color-primary-light-9', value: '#f0f9eb' }
    ]
  },
  {
    theme: '#e6a23c',
    config: [
      { name: '--el-color-primary', value: '#e6a23c' },
      { name: '--el-color-primary-light-3', value: '#eebe77' },
      { name: '--el-color-primary-light-5', value: '#f3d19e' },
      { name: '--el-color-primary-light-7', value: '#f8e3c5' },
      { name: '--el-color-primary-light-8', value: '#faecd8' },
      { name: '--el-color-primary-light-9', value: '#fdf6ec' }
    ]
  },
  {
    theme: '#ff5c93',
    config: [
      { name: '--el-color-primary', value: '#ff5c93' },
      { name: '--el-color-primary-light-3', value: '' },
      { name: '--el-color-primary-light-5', value: '' },
      { name: '--el-color-primary-light-7', value: '' },
      { name: '--el-color-primary-light-8', value: '' },
      { name: '--el-color-primary-light-9', value: '' }
    ]
  },
  {
    theme: '#ee4f12',
    config: [
      { name: '--el-color-primary', value: '#ee4f12' },
      { name: '--el-color-primary-light-3', value: '' },
      { name: '--el-color-primary-light-5', value: '' },
      { name: '--el-color-primary-light-7', value: '' },
      { name: '--el-color-primary-light-8', value: '' },
      { name: '--el-color-primary-light-9', value: '' }
    ]
  },
  {
    theme: '#f56c6c',
    config: [
      { name: '--el-color-primary', value: '#f56c6c' },
      { name: '--el-color-primary-light-3', value: '#f89898' },
      { name: '--el-color-primary-light-5', value: '#fab6b6' },
      { name: '--el-color-primary-light-7', value: '#fcd3d3' },
      { name: '--el-color-primary-light-8', value: '#fde2e2' },
      { name: '--el-color-primary-light-9', value: '#fef0f0' }
    ]
  },
  {
    theme: '#9c27b0',
    config: [
      { name: '--el-color-primary', value: '#9c27b0' },
      { name: '--el-color-primary-light-3', value: '' },
      { name: '--el-color-primary-light-5', value: '' },
      { name: '--el-color-primary-light-7', value: '' },
      { name: '--el-color-primary-light-8', value: '' },
      { name: '--el-color-primary-light-9', value: '' }
    ]
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
