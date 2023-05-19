import { MAIN_WINDOW_URL } from '@/electron/config'
import { WindowListEnum } from '@/electron/config/enum'

const windowConfigMap: Map<WindowListEnum, WindowConfig> = new Map()

windowConfigMap.set(WindowListEnum.MAIN_WINDOW, {
  disabled: false,
  multiple: false,
  options: {
    width: 900,
    height: 600,
    minWidth: 700,
    minHeight: 600,
    center: true,
    frame: true,
    webPreferences: {
      nodeIntegration: !!process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      webSecurity: false
    }
  },
  callback(window) {
    window.loadURL(MAIN_WINDOW_URL)
    // 隐藏菜单栏
    window.setMenuBarVisibility(false)
  }
})

export default windowConfigMap
