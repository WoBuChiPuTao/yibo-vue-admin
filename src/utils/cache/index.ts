import { WebStorage } from './storage'

const loaclStore = new WebStorage(localStorage)
const sessionStore = new WebStorage(sessionStorage)

export class WebCache {
  static getLocal(key: string) {
    return loaclStore.get(key)
  }

  static setLocal(key: string, value: string): void {
    loaclStore.set(key, value)
  }

  static removeLocal(key: string) {
    return loaclStore.remove(key)
  }

  static getSesssion(key: string) {
    return sessionStore.get(key)
  }

  static setSesssion(key: string, value: string): void {
    sessionStore.set(key, value)
  }

  static removeSesssion(key: string) {
    return sessionStore.remove(key)
  }
}
