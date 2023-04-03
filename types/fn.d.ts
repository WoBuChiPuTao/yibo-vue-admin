type TimeoutHandle = ReturnType<typeof setTimeout>

declare type Fn<Args = any, Return = Args> = (...args: Args[]) => Return
// declare interface Fn<T = any, R = T> {
//   (...arg: T[]): R
// }

declare interface PromiseFn<Args extends any[] = any[], R = Args> {
  (...arg: Args[]): Promise<R>
}
