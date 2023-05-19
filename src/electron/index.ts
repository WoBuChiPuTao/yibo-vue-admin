import { app as electron, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { createTray } from '@/electron/main/system'
import { isDevelopment, CUSTOM_PROTOCOL } from '@/electron/config/'
import windowManager from './main/window/windowManager'
import { WindowListEnum } from './config/enum'

class ElectronApp {
  private berforeReady() {
    // Scheme must be registered before the app is ready
    protocol.registerSchemesAsPrivileged([
      { scheme: CUSTOM_PROTOCOL, privileges: { secure: true, standard: true } }
    ])
  }

  private onReady() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron.on('ready', async () => {
      if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
          await installExtension(VUEJS_DEVTOOLS)
        } catch (e: any) {
          console.error('Vue Devtools failed to install:', e.toString())
        }
      }
      this.createWindow()
      createTray()
    })
  }

  private onRunning() {
    electron.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) this.createWindow()
    })
  }

  private onQuit() {
    // Quit when all windows are closed.
    electron.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        electron.quit()
      }
    })

    // Exit cleanly on request from parent process in development mode.
    if (isDevelopment) {
      if (process.platform === 'win32') {
        process.on('message', (data) => {
          if (data === 'graceful-exit') {
            electron.quit()
          }
        })
      } else {
        process.on('SIGTERM', () => {
          electron.quit()
        })
      }
    }
  }

  private async createWindow() {
    createProtocol(CUSTOM_PROTOCOL)
    // Create the browser window.
    let window: BrowserWindow | null = null
    if (!windowManager.has(WindowListEnum.MAIN_WINDOW)) {
      window = windowManager.create(WindowListEnum.MAIN_WINDOW)
    }

    if (isDevelopment && !process.env.IS_TEST) {
      window && window.webContents.openDevTools()
    }
  }

  async launchApp() {
    this.berforeReady()
    this.onReady()
    this.onRunning()
    this.onQuit()
  }
}

const app = new ElectronApp()

export default app
