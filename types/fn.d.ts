type TimeoutHandle = ReturnType<typeof setTimeout>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}
