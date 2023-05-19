import { WindowListEnum } from '@/electron/config/enum'
import { BrowserWindow } from 'electron'
import windowConfigMap from './windowConfig'

class WindowManager implements WindowManagerClass {
  private windowMap: Map<WindowListEnum | string, BrowserWindow> = new Map()
  private windowIdMap: Map<number, WindowListEnum | string> = new Map()
  create(name: WindowListEnum) {
    const windowConfig = windowConfigMap.get(name)!
    if (windowConfig.disabled) {
      return null
    } else {
      if (!windowConfig.multiple && this.windowMap.has(name)) {
        return this.windowMap.get(name) || null
      }
      const window = new BrowserWindow(windowConfig.options)
      if (windowConfig.multiple) {
        this.windowIdMap.set(window.id, `${name}_${window.id}`)
        this.windowMap.set(`${name}_${window.id}`, window)
      } else {
        this.windowIdMap.set(window.id, name)
        this.windowMap.set(name, window)
      }

      // 关闭时清除Map
      window.on('close', () => {
        this.deleteById(window.id)
      })
      windowConfig.callback(window, this)
      return window
    }
  }

  has(name: WindowListEnum | string) {
    return this.windowMap.has(name)
  }

  get(name: WindowListEnum | string) {
    return this.windowMap.get(name) || null
  }

  deleteById(id: number) {
    if (this.windowIdMap.has(id)) {
      const name = this.windowIdMap.get(id)!
      this.windowIdMap.delete(id)
      return this.windowMap.delete(name)
    } else {
      return false
    }
  }

  getAllWindowName() {
    const arr = []
    for (const [key] of this.windowMap) {
      arr.push(key)
    }
    return arr
  }
}

const windowManager = new WindowManager()

export default windowManager
