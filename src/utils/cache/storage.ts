import { StorageCache } from './types'

/**
 * @description 创建storage，进行自定义操作
 */
export class WebStorage {
  private storage: Storage

  constructor(storage: Storage = sessionStorage) {
    this.storage = storage
  }

  set(key: string, value: any, expire?: number) {
    const data = JSON.stringify(
      expire
        ? {
            value,
            time: Date.now(),
            expire: new Date().getTime() + expire * 1000
          }
        : {
            value,
            time: Date.now()
          }
    )
    this.storage.setItem(key, data)
  }

  get(key: string) {
    const stringData = this.storage.getItem(key)
    if (!stringData) return null
    const { expire, value } = JSON.parse(stringData) as StorageCache
    // 判断数据是否过期
    if (expire) {
      if (expire && new Date().getTime() > expire) {
        this.remove(key)
        return null
      }
      return value
    }
    return value
  }

  remove(key: string) {
    return this.storage.removeItem(key)
  }

  clear() {
    return this.storage.clear()
  }
}
