import { Tray, Menu } from 'electron'

// 保存在全局，防止组件注销
let tray: Tray
let contextMenu: Menu
/**
 * @description 创建系统托盘菜单
 */
function createContextMenu(): Menu {
  contextMenu = Menu.buildFromTemplate([
    {
      label: '关于',
      click() {
        console.log('about')
      }
    },
    {
      label: '退出',
      role: 'quit'
    }
  ])

  return contextMenu
}

/**
 * @description 获取系统托盘icon
 */
function getTrayIcon() {
  return `${__static}/logo.jpg`
}

/**
 * @description 创建系统托盘
 */
export function createTray() {
  tray = new Tray(getTrayIcon())

  createContextMenu()
  // click事件在Mac和Windows上可以触发（在Ubuntu上无法触发，Unity不支持）
  if (process.platform === 'darwin' || process.platform === 'win32') {
    tray.on('right-click', () => {
      tray.popUpContextMenu(contextMenu)
    })
  } else if (process.platform === 'linux') {
    tray.on('right-click', () => {
      tray.popUpContextMenu(contextMenu)
    })
  }
}
