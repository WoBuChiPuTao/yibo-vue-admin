/**
 * @description: storage存储格式
 */
export interface StorageCache<T = any> {
  time: number
  expire?: number
  value: T
}
