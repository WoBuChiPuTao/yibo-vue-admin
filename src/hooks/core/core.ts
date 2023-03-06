export function useDebounceFn<T extends Fn>(fn: T, timeout: number) {
  let timer: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, timeout)
  }
}
