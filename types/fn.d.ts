type TimeoutHandle = ReturnType<typeof setTimeout>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type Fn<Args = any, Return = Args> = (...args: Args) => Return

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare interface PromiseFn<Args extends any[] = any[], R = Args> {
  (...arg: Args[]): Promise<R>
}
