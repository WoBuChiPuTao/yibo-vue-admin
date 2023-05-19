type BrowserWindowConstructorOptions = import('electron').BrowserWindowConstructorOptions
type BrowserWindow = import('electron').BrowserWindow
type WindowListEnum = import('../config/enum').WindowListEnum

declare interface WindowConfigOption extends BrowserWindowConstructorOptions {
  height: number
  width: number
  show: boolean
  fullscreenable: boolean
  resizable: boolean
  webPreferences: {
    nodeIntegration: boolean
    nodeIntegrationInWorker: boolean
    contextIsolation: boolean
    backgroundThrottling: boolean
    webSecurity?: boolean
  }
  vibrancy?: string | any
  frame?: boolean
  center?: boolean
  title?: string
  titleBarStyle?: string | any
  backgroundColor?: string
  autoHideMenuBar?: boolean
  transparent?: boolean
  icon?: string
  skipTaskbar?: boolean
  alwaysOnTop?: boolean
}

declare interface WindowManagerClass {
  create: (name: WindowListEnum) => BrowserWindow | null
  has: (name: WindowListEnum | string) => boolean
  get: (name: WindowListEnum | string) => BrowserWindow | null
  deleteById: (id: number) => boolean
  getAllWindowName: () => (WindowListEnum | string)[]
}

declare interface WindowConfig {
  disabled: boolean
  multiple: boolean
  options: BrowserWindowConstructorOptions
  callback: (window: BrowserWindow, windowManager: WindowManagerClass) => void
}
