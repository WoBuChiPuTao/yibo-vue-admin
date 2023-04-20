// export type FnArge<Args extends any[] = any[], Return = any> = (...args: Args) => Return

// type ArgsType<T> = T extends (...args: infer U) => any ? U : never

// export type PromisifyFn<T extends FnArge> = (...args: ArgsType<T>) => Promise<ReturnType<T>>

// export type EventFilter<Invoke extends FnArge = FnArge> = (
//   invoke: Invoke
// ) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>

// export function useDebounceFn<T extends FnArge>(fn: T, duration: number): T {
//   return createPackageFn(fn, duration)
// }

// function createPackageFn<T extends FnArge>(fn: T, duration: number) {
//   let timer: ReturnType<typeof setTimeout> | undefined | null
//   function debounceFn(this: any, ...args: ArgsType<T>) {
//     // eslint-disable-next-line promise/param-names
//     return new Promise<ReturnType<T>>((reslove, reject) => {
//       Promise.resolve(debounceFilter(fn.call(this, ...args)))
//         .then(reslove)
//         .catch(reject)
//     })
//   }

//   const debounceFilter: EventFilter = (invoke) => {
//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     let rejector: FnArge = () => {}
//     const clearTimer = (time: ReturnType<typeof setTimeout>) => {
//       clearTimeout(time)
//       rejector()
//       // eslint-disable-next-line @typescript-eslint/no-empty-function
//       rejector = () => {}
//     }

//     // eslint-disable-next-line promise/param-names
//     return new Promise((reslove) => {
//       rejector = reslove
//       timer && clearTimer(timer)
//       timer = setTimeout(() => {
//         timer = null
//         reslove(invoke())
//       }, duration)
//     })
//   }
//   return debounceFn
// }

type FnArgs<T> = T extends (...args: infer U) => any ? U : never

export function useDebounceFn<T extends Fn>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: FnArgs<T>) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.call(this, ...args)
    }, wait)
  } as (...args: FnArgs<T>) => void
}

export function useThrottleFn<T extends Fn>(fn: T, wait: number) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return function (this: any, ...args: FnArgs<T>) {
    if (!timer) {
      fn.call(this, ...args)
      timer = setTimeout(() => {
        timer = null
      }, wait)
    }
  } as (...args: FnArgs<T>) => void
}
