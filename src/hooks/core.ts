/**
 * 防抖函数
 */
export function useDebounceFn<T extends Fn>(handle: T, time: number) {
  let timeout: TimeoutHandle
  return function (...args: any[]) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => handle(...args), time)
  } as any as T
}

/**
 * 节流函数
 */
export function useThrottleFn<T extends Fn>(handle: T, time: number) {
  let toWait = false
  return function (...args: any[]) {
    if (!toWait) {
      toWait = true
      handle(...args)
      setTimeout(() => {
        toWait = false
      }, time)
    }
  } as any as T
}
