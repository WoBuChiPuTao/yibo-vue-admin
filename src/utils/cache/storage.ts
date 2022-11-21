export class WebStorage {
  private storage: Storage

  constructor(storage: Storage = sessionStorage) {
    this.storage = storage
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value)
  }

  get(key: string) {
    this.storage.getItem(key)
  }
}
