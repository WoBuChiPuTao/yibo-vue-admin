import { WebStorage } from './storage'

const loaclStore = new WebStorage(localStorage)
const sessionStore = new WebStorage(sessionStorage)

export class WebCache {
  static getLocal(key: string) {
    return loaclStore.get(key)
  }

  static setLocal(key: string, value: any, expire?: number): void {
    loaclStore.set(key, value, expire)
  }

  static removeLocal(key: string) {
    loaclStore.remove(key)
  }

  static clearLocal() {
    loaclStore.clear()
  }

  static getSession(key: string) {
    return sessionStore.get(key)
  }

  static setSession(key: string, value: any, expire?: number): void {
    sessionStore.set(key, value, expire)
  }

  static removeSession(key: string) {
    sessionStore.remove(key)
  }

  static clearSession() {
    sessionStore.clear()
  }
}
