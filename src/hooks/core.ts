/**
 * 防抖函数
 */
export function useDebounceFn<T extends Fn>(handle: T, time: number) {
  let timeout: TimeoutHandle
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(handle, time)
  }
}

/**
 * 节流函数
 */
export function useThrottleFn<T extends Fn>(handle: T, time: number) {
  let toWait = false
  return function () {
    if (!toWait) {
      handle()
      toWait = true
      setTimeout(() => {
        toWait = false
      }, time)
    }
  }
}
