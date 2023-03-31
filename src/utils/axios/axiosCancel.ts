import axios, { AxiosRequestConfig, Canceler } from 'axios'

export class AxiosCancel {
  // 声明一个对象来保存请求的标识和cancel实例
  private static pending: Map<string, Canceler> = new Map()

  /**
   *拼接地址和请求类型得到请求的唯一标识
   * @param {AxiosRequestConfig} config
   * @returns {string} request&url
   */
  private static getUrl(config: AxiosRequestConfig) {
    return [config.method, config.url].join('&')
  }

  /**
   *添加等待取消的cancel实例
   * @param {AxiosRequestConfig} config
   * @description 在请求拦截器使用
   */
  private static addPending(config: AxiosRequestConfig) {
    const key = this.getUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancal) => {
        if (!this.pending.has(key)) {
          // 将cancel实例添加到pending
          this.pending.set(key, cancal)
        }
      })
  }

  /**
   *执行等待cancel实例
   * @param {AxiosRequestConfig} config
   * @description 在响应拦截器使用
   */
  private static removePending(config: AxiosRequestConfig) {
    const key = this.getUrl(config)
    if (this.pending.has(key)) {
      const cancel = this.pending.get(key)
      cancel && cancel(key)
      this.pending.delete(key)
    }
  }

  /**
   * 执行所有的cancel实例并清空pending
   * @description 在路由守卫使用
   */
  private static clearPending() {
    for (const [key, cancal] of this.pending) {
      cancal && cancal(key)
    }
    this.pending.clear()
  }
}
