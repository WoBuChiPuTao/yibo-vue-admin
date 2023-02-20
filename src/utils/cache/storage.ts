import { StorageCache } from '@/types/storage'

export class WebStorage {
  private storage: Storage

  constructor(storage: Storage = sessionStorage) {
    this.storage = storage
  }

  set(key: string, value: any, expire?: number) {
    const data = JSON.stringify({
      value,
      time: Date.now(),
      expire: expire ? new Date().getTime() + expire * 1000 : null
    })
    this.storage.setItem(key, data)
  }

  get(key: string) {
    const stringData = this.storage.getItem(key)
    // 判断数据是否过期
    if (stringData && /expire/.test(stringData)) {
      const { expire, value } = JSON.parse(
        stringData
      ) as unknown as StorageCache
      if (expire && new Date().getTime() > expire) {
        this.remove(key)
        return null
      }
      return value
    }
    return stringData
  }

  remove(key: string) {
    return this.storage.removeItem(key)
  }

  clear() {
    return this.storage.clear()
  }
}
