type TimeoutHandle = ReturnType<typeof setTimeout>

declare type Fn<Args extends any[] = any[], Return = any> = (...args: Args) => Return
// declare interface Fn<T = any, R = T> {
//   (...arg: T[]): R
// }

declare interface PromiseFn<Args extends any[] = any[], R = Args> {
  (...arg: Args[]): Promise<R>
}
