export const isDevelopment = process.env.NODE_ENV !== 'production'

export const CUSTOM_PROTOCOL = 'admin'

// url的数量与enum中的WindowList中的窗口一一对应
export const MAIN_WINDOW_URL = isDevelopment
  ? (process.env.WEBPACK_DEV_SERVER_URL as string)
  : `${CUSTOM_PROTOCOL}://./index.html`
